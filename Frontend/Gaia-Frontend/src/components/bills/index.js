import {
  Button,
  Container,
  IconButton,
  Link,
  TableCell,
  TableRow,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { Title, TitleContainer } from "../../styledComponent/crudPages";
import { Add, ArrowBackIosNew, Delete, Edit } from "@mui/icons-material";
import Table from "../../common/Table";
import { headers } from "./constant";
import AddEditModal from "./addEditModal";
import DeleteConfirmModal from "./deleteConfirmModal";
import { useNavigate, useParams } from "react-router-dom";
import { getQueryStringFromObject } from "../../utils/helper";
import { api } from "../../utils/api";
import toast from "react-hot-toast";
import { Actions, useBills } from "../../hooks/useBills";
import {
  Actions as LawMakersAction,
  useLawMakers,
} from "../../hooks/useLawMakers";
import dayjs from "dayjs";

const Bills = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [state, dispatch] = useBills();
  const [lawMakersState, LawMakersDispatch] = useLawMakers();

  const params = useParams();
  const navigate = useNavigate();

  const getBillList = async (data) => {
    try {
      if (!params.agenda_id) {
        throw new Error("Not a valid url");
      }
      dispatch({ type: Actions.TOGGLE_LOADING, payload: true });
      const queryParams = await getQueryStringFromObject(data);
      const url =
        "/politician/get-all-bill-by-agenda-id/" +
        params.agenda_id +
        (queryParams ? `?${queryParams}` : "");
      const response = await api(url, "GET");
      if (response.status === 200) {
        dispatch({
          type: Actions.SET_BILL_LIST,
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

  const getLawMakersList = async () => {
    if (!lawMakersState.lawMakersList?.length) {
      try {
        LawMakersDispatch({
          type: LawMakersAction.TOGGLE_LOADING,
          payload: true,
        });
        const response = await api(
          "/politician/get-all-sub-politician",
          "POST",
          { fromMobile: true }
        );
        if (response.status === 200) {
          LawMakersDispatch({
            type: LawMakersAction.SET_LAWMAKERS_LIST,
            payload: {
              content: response.data?.content,
              currentPage: 0,
              totalElements: response.data?.totalElements,
              pageSize: response.data?.pageSize,
            },
          });
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        toast.error(error.message || "Something Went Wrong.");
        dispatch({ type: LawMakersAction.TOGGLE_LOADING, payload: false });
      }
    }
  };

  useEffect(() => {
    getBillList();
    getLawMakersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fixed sx={{ marginY: "30px" }}>
      <TitleContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIosNew
            sx={{ mr: 2, cursor: "pointer" }}
            onClick={() => navigate("/agenda")}
          />
          <Title variant="h1">Bills</Title>
        </div>
        <Button
          variant="contained"
          startIcon={<Add />}
          size={matches ? "small" : "large"}
          disabled={lawMakersState.loading}
          onClick={() => {
            if (!lawMakersState.lawMakersList?.length) {
              dispatch({
                type: Actions.TOGGLE_ADD_EDIT_MODAL,
                payload: { open: true, detail: null },
              });
            } else {
              toast.error("Law makers are not added.");
            }
          }}
        >
          Add Bill
        </Button>
      </TitleContainer>
      <Table
        pagination={true}
        headers={headers}
        loading={state.loading}
        currentPage={state.billList?.currentPage}
        totalElements={state.billList?.totalElements}
        pageSize={state.billList?.pageSize}
        onPageChange={getBillList}
      >
        {state.billList?.content?.map((row) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.title}
            </TableCell>
            <TableCell align="left">
              <Link href={row.url} color="inherit" target="_blank">
                {row.url}
              </Link>
            </TableCell>
            <TableCell align="left">
              {dayjs(row.date).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell align="left">{row.poc}</TableCell>
            <TableCell align="right">
              <Tooltip title="Edit">
                <IconButton
                  onClick={() =>
                    dispatch({
                      type: Actions.TOGGLE_ADD_EDIT_MODAL,
                      payload: {
                        open: true,
                        detail: { ...row, date: dayjs(row.date) },
                      },
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
      {state.addEditModalDetails?.open && (
        <AddEditModal onConfirm={getBillList} agendaId={params.agenda_id} />
      )}
      {state.deleteModalDetails?.open && (
        <DeleteConfirmModal onConfirm={getBillList} />
      )}
    </Container>
  );
};

export default Bills;
