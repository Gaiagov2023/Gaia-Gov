import React, { useMemo, useReducer } from "react";

const agendaContext = React.createContext();

export const Actions = {
  TOGGLE_ADD_EDIT_MODAL: "toggle_add_edit_modal",
  TOGGLE_DELETE_MODAL: "toggle_delete_modal",
  TOGGLE_LOADING: "toggle_loading",
  SET_AGENDA_LIST: "set_agenda_list",
};

const initialState = {
  loading: false,
  agendaList: {
    content: [],
    totalElements: 0,
    currentPage: 0,
    pageSize: 10,
  },
  addEditModalDetails: {
    open: false,
    detail: null,
  },
  deleteModalDetails: {
    open: false,
    id: null,
  },
};

const agendaReducer = (state, action) => {
  switch (action.type) {
    case Actions.TOGGLE_ADD_EDIT_MODAL: {
      return {
        ...state,
        addEditModalDetails: {
          open: action.payload?.open,
          detail: action.payload?.detail,
        },
      };
    }
    case Actions.TOGGLE_DELETE_MODAL: {
      return {
        ...state,
        deleteModalDetails: {
          open: action.payload.open,
          id: action.payload.id,
        },
      };
    }
    case Actions.TOGGLE_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case Actions.SET_AGENDA_LIST: {
      return {
        ...state,
        agendaList: action.payload,
        loading: false,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const AgendaProvider = ({ children }) => {
  const [agendaState, dispatch] = useReducer(agendaReducer, initialState);
  const value = useMemo(() => [agendaState, dispatch], [agendaState]);
  return (
    <agendaContext.Provider value={value}>{children}</agendaContext.Provider>
  );
};

export function useAgenda() {
  return React.useContext(agendaContext);
}
