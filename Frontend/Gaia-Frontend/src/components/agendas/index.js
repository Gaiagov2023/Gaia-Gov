import {
  Button,
  Container,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { Title, TitleContainer } from "../../styledComponent/crudPages";
import { Add, Delete, Edit, Settings } from "@mui/icons-material";
import Table from "../../common/Table";
import { headers } from "./constant";
import { Actions, useAgenda } from "../../hooks/useAgenda";
import DeleteConfirmModal from "./deleteConfirmModal";
import AddEditModal from "./addEditModal";
import toast from "react-hot-toast";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Agendas = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [state, dispatch] = useAgenda();
  const navigate = useNavigate();

  const getAgendaList = async (data) => {
    try {
      dispatch({ type: Actions.TOGGLE_LOADING, payload: true });
      const url = "/politician/get-all-agenda";
      const response = await api(url, "GET");
      if (response.status === 200) {
        dispatch({
          type: Actions.SET_AGENDA_LIST,
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

  useEffect(() => {
    getAgendaList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fixed sx={{ marginY: "30px" }}>
      <TitleContainer>
        <Title variant="h1">Agendas</Title>
        <Button
          variant="contained"
          startIcon={<Add />}
          size={matches ? "small" : "large"}
          onClick={() =>
            dispatch({
              type: Actions.TOGGLE_ADD_EDIT_MODAL,
              payload: { open: true, detail: null },
            })
          }
        >
          Add Agenda
        </Button>
      </TitleContainer>
      <Table
        pagination={true}
        headers={headers}
        loading={state.loading}
        currentPage={state.agendaList?.currentPage}
        totalElements={state.agendaList?.totalElements}
        pageSize={state.agendaList?.pageSize}
        onPageChange={getAgendaList}
      >
        {state.agendaList?.content?.map((row) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Detail">
                <IconButton onClick={() => navigate("/agenda/" + row.id)}>
                  <Settings />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  onClick={() =>
                    dispatch({
                      type: Actions.TOGGLE_ADD_EDIT_MODAL,
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
      {state.addEditModalDetails?.open && (
        <AddEditModal onConfirm={getAgendaList} />
      )}
      {state.deleteModalDetails?.open && (
        <DeleteConfirmModal onConfirm={getAgendaList} />
      )}
    </Container>
  );
};

export default Agendas;
