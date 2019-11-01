import {
  ClienteState,
  ClienteActions,
  initialClienteState,
  ClienteActionTypes
} from "./types";
import { Reducer } from "redux";

const reducer: Reducer<ClienteState, ClienteActions> = (
  state = initialClienteState,
  action
) => {
  switch (action.type) {
    case ClienteActionTypes.SET_CLIENTE:
      return {
        ...state,
        cliente: action.payload
      };
    case ClienteActionTypes.SET_CLIENTE_LIST:
      return {
        ...state,
        list: action.payload
      };
    case ClienteActionTypes.SET_CLIENTE_SEARCH:
      return {
        ...state,
        searchResult: action.payload
      };
    case ClienteActionTypes.SET_CLIENTE_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case ClienteActionTypes.DELETE_CLIENTE:
      return {
        ...state,
        clienteRemoved: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
