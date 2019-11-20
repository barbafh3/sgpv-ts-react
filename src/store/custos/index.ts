import { Reducer } from "redux";
import {
  CustoActions,
  CustoState,
  initialCustoState,
  CustoActionTypes
} from "./types";

const reducer: Reducer<CustoState, CustoActions> = (
  state = initialCustoState,
  action
) => {
  switch (action.type) {
    case CustoActionTypes.SET_CUSTO:
      return {
        ...state,
        custo: action.payload
      };
    case CustoActionTypes.SET_CUSTO_LIST:
      return {
        ...state,
        list: action.payload
      };
    case CustoActionTypes.SET_CUSTO_SEARCH:
      return {
        ...state,
        searchResult: action.payload
      };
    case CustoActionTypes.SET_CUSTO_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case CustoActionTypes.SET_CUSTO_PRODUTO_LIST:
      return {
        ...state,
        produtoOptions: action.payload
      };
    case CustoActionTypes.SET_CUSTO_MATERIAL_LIST:
      return {
        ...state,
        materialOptions: action.payload
      };
    case CustoActionTypes.SET_VALOR_TOTAL:
      return {
        ...state,
        valorTotal: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
