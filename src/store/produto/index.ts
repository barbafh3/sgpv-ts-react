import { Reducer } from "redux";
import {
  ProdutoState,
  ProdutoActions,
  initialProdutoState,
  ProdutoActionTypes
} from "./types";

const reducer: Reducer<ProdutoState, ProdutoActions> = (
  state = initialProdutoState,
  action
) => {
  switch (action.type) {
    case ProdutoActionTypes.SET_PRODUTO:
      return {
        ...state,
        produto: action.payload
      };
    case ProdutoActionTypes.SET_PRODUTO_LIST:
      return {
        ...state,
        list: action.payload
      };

    case ProdutoActionTypes.SET_PRODUTO_SEARCH:
      return {
        ...state,
        searchResult: action.payload
      };

    case ProdutoActionTypes.SET_PRODUTO_QUERY:
      return {
        ...state,
        query: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
