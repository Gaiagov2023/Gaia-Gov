import React, { useMemo, useReducer } from "react";

const billContext = React.createContext();

export const Actions = {
  TOGGLE_ADD_EDIT_MODAL: "toggle_add_edit_modal",
  TOGGLE_DELETE_MODAL: "toggle_delete_modal",
  TOGGLE_LOADING: "toggle_loading",
  SET_BILL_LIST: "set_bill_list",
};

const initialState = {
  loading: false,
  billList: {
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

const billReducer = (state, action) => {
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
    case Actions.SET_BILL_LIST: {
      return {
        ...state,
        billList: action.payload,
        loading: false,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const BillProvider = ({ children }) => {
  const [billState, dispatch] = useReducer(billReducer, initialState);
  const value = useMemo(() => [billState, dispatch], [billState]);
  return <billContext.Provider value={value}>{children}</billContext.Provider>;
};

export function useBills() {
  return React.useContext(billContext);
}
