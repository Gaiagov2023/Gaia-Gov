import React, { useMemo, useReducer } from "react";

const lawMakersContext = React.createContext();

export const Actions = {
  TOGGLE_ADD_MODAL: "toggle_add_modal",
  TOGGLE_EDIT_MODAL: "toggle_edit_modal",
  TOGGLE_DELETE_MODAL: "toggle_delete_modal",
  TOGGLE_LOADING: "toggle_loading",
  TOGGLE_VOTER_MODAL: "toggle_voter_modal",
  SET_LAWMAKERS_LIST: "set_lawmakers_list",
  SET_VOTER_COUNT: "set_voter_count",
};

const initialState = {
  loading: false,
  lawMakersList: {
    content: [],
    totalElements: 0,
    currentPage: 0,
    pageSize: 10,
  },
  totalVoter: 0,
  totalVoterModalOpen: false,
  addModalOpen: false,
  editModalDetails: {
    open: false,
    detail: null,
  },
  deleteModalDetails: {
    open: false,
    id: null,
  },
};

const lawMakersReducer = (state, action) => {
  switch (action.type) {
    case Actions.TOGGLE_ADD_MODAL: {
      return {
        ...state,
        addModalOpen: !state.addModalOpen,
      };
    }
    case Actions.TOGGLE_EDIT_MODAL: {
      return {
        ...state,
        editModalDetails: {
          open: action.payload.open,
          detail: action.payload.detail,
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
    case Actions.TOGGLE_VOTER_MODAL: {
      return {
        ...state,
        totalVoterModalOpen: !state.totalVoterModalOpen,
      };
    }
    case Actions.SET_LAWMAKERS_LIST: {
      return {
        ...state,
        lawMakersList: action.payload,
        loading: false,
      };
    }
    case Actions.SET_VOTER_COUNT: {
      return {
        ...state,
        totalVoter: action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const LawMakersProvider = ({ children }) => {
  const [lawMakersState, dispatch] = useReducer(lawMakersReducer, initialState);
  const value = useMemo(() => [lawMakersState, dispatch], [lawMakersState]);
  return (
    <lawMakersContext.Provider value={value}>
      {children}
    </lawMakersContext.Provider>
  );
};

export function useLawMakers() {
  return React.useContext(lawMakersContext);
}
