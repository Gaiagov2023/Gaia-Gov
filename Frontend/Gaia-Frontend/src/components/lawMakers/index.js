import React, { useEffect } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  IconButton,
  ListItemButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import toast from "react-hot-toast";
import { Title, TitleContainer } from "../../styledComponent/crudPages";
import AddModal from "./addModal";
import Table from "../../common/Table";
import EditModal from "./editModal";
import DeleteConfirmModal from "./deleteConfirmModal";
import { api } from "../../utils/api";
import { Actions, useLawMakers } from "../../hooks/useLawMakers";
import { headers } from "./constant";
import { getQueryStringFromObject } from "../../utils/helper";
import TotalVoterAddEditModal from "./totalVoterAddEditModal";

const VoterBtn = ({ sx, count }) => {
  return (
    <ListItemButton
      sx={{
        gap: "8px",
        borderRadius: "4px",
        ...sx,
      }}
    >
      <Typography variant="button">{`Total Voters: ${count}`}</Typography>
      {/* <IconButton
        aria-label="edit"
        size="small"
        onClick={() =>
          dispatch({ type: Actions.TOGGLE_VOTER_MODAL, payload: true })
        }
      >
        <Edit fontSize="inherit" />
      </IconButton> */}
    </ListItemButton>
  );
};

const LawMakers = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [state, dispatch] = useLawMakers();

  const getLawMakerList = async (data) => {
    try {
      dispatch({ type: Actions.TOGGLE_LOADING, payload: true });
      const params = await getQueryStringFromObject(data);
      const url =
        "/politician/get-all-sub-politician" + (params ? `?${params}` : "");
      const response = await api(url, "POST", { fromMobile: false });
      if (response.status === 200) {
        dispatch({
          type: Actions.SET_LAWMAKERS_LIST,
          payload: {
            content: response.data?.content,
            currentPage: data?.page || 0,
            totalElements: response.data?.totalElements,
            pageSize: response.data?.pageSize,
          },
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Something Went Wrong.");
      dispatch({ type: Actions.TOGGLE_LOADING, payload: false });
    }
  };

  const getTotalVoterCount = async () => {
    try {
      dispatch({ type: Actions.TOGGLE_LOADING, payload: true });
      const response = await api("/politician/get-total-voter", "GET");
      if (response.status === 200) {
        if (response.data.totalVoter > 0) {
          dispatch({
            type: Actions.SET_VOTER_COUNT,
            payload: response.data.totalVoter,
          });
          getLawMakerList();
        } else {
          dispatch({ type: Actions.TOGGLE_VOTER_MODAL, payload: true });
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Something Went Wrong.");
      dispatch({ type: Actions.TOGGLE_LOADING, payload: false });
    }
  };

  useEffect(() => {
    getTotalVoterCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.totalVoter === 0) {
    return state.totalVoterModalOpen ? (
      <TotalVoterAddEditModal onConfirm={getLawMakerList} />
    ) : (
      <Backdrop
        open={true}
        sx={{ color: "#fff", display: "flex", flexDirection: "column" }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Container fixed sx={{ marginY: "30px" }}>
      <TitleContainer sx={{ mb: { xs: 1, md: 2 } }}>
        <Title variant="h1">Law Makers</Title>
        <div>
          {state.totalVoter > 0 && (
            <VoterBtn
              sx={{ mr: 2, display: { md: "inline-flex", xs: "none" } }}
              count={state?.totalVoter}
            />
          )}
          <Button
            variant="contained"
            startIcon={<Add />}
            size={matches ? "small" : "large"}
            onClick={() => dispatch({ type: Actions.TOGGLE_ADD_MODAL })}
          >
            Add Law Maker(s)
          </Button>
        </div>
      </TitleContainer>
      {state.totalVoter > 0 && (
        <VoterBtn
          count={state?.totalVoter}
          sx={{
            mr: 0,
            mb: 2,
            marginLeft: "auto",
            width: "fit-content",
            display: { xs: "block", md: "none" },
          }}
        />
      )}
      <Table
        pagination={true}
        headers={headers}
        loading={state.loading}
        currentPage={state.lawMakersList?.currentPage}
        totalElements={state.lawMakersList?.totalElements}
        pageSize={state.lawMakersList?.pageSize}
        onPageChange={(data) => getLawMakerList(data)}
      >
        {state.lawMakersList?.content?.map((row) => (
          <TableRow
            key={row.email}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.firstName + " " + row.lastName}
            </TableCell>
            <TableCell align="left">{row.email}</TableCell>
            <TableCell align="left">{row.title}</TableCell>
            <TableCell align="left">{row.noOfVotes}</TableCell>
            <TableCell align="right">
              <Tooltip title="Edit">
                <IconButton
                  onClick={() =>
                    dispatch({
                      type: Actions.TOGGLE_EDIT_MODAL,
                      payload: { open: true, detail: row },
                    })
                  }
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() =>
                    dispatch({
                      type: Actions.TOGGLE_DELETE_MODAL,
                      payload: { open: true, id: row.id },
                    })
                  }
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      {state.addModalOpen && <AddModal onConfirm={getLawMakerList} />}
      {state.editModalDetails.open && <EditModal onConfirm={getLawMakerList} />}
      {state.deleteModalDetails.open && (
        <DeleteConfirmModal onConfirm={getLawMakerList} />
      )}
    </Container>
  );
};

export default LawMakers;
