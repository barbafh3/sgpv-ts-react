import { ActionCreator, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  SetProduto,
  Produto,
  ProdutoActionTypes,
  SetProdutoQuery,
  SetProdutoSearch,
  ProdutoActions
} from "./types";
import fbDatabase from "../../services/firebaseConfig";
import { requestHandler } from "../../services/nodeDbApi";

// export const searchSpecific: ActionCreator<ThunkAction<
//   Promise<any>,
//   null,
//   null,
//   SetProdutoSearch
// >> = (id: string) => {
//   return async (dispatch: Dispatch) => {
//     fbDatabase
//       .ref("produtos/")
//       .orderByChild("nome")
//       .on("value", snapshot => {
//         const raw = snapshot.val();
//         // if (raw) {
//         return new Promise(() =>
//           dispatch({
//             type: ProdutoActionTypes.SET_PRODUTO_SEARCH,
//             payload: raw
//           })
//         );
//         // }
//       });
//   };
// };

export const searchProdutos: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetProdutoSearch
>> = (query: string) => {
  return async (dispatch: Dispatch) => {
    fbDatabase
      .ref("produtos")
      .orderByChild("nome")
      .equalTo(query)
      .on("value", snapshot => {
        const raw = snapshot.val();
        dispatch({
          type: ProdutoActionTypes.SET_PRODUTO_SEARCH,
          payload: raw
        });
      });
    try {
    } catch (e) {
      console.log(e);
    }
  };
};

export const setProdutoList = (list: Produto[]) => async (
  dispatch: Dispatch
) => {
  return {
    type: ProdutoActionTypes.SET_PRODUTO_LIST,
    payload: list
  };
};

export const findAllProdutos = (): ThunkAction<
  Promise<void>,
  {},
  {},
  ProdutoActions
> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, ProdutoActions>
  ): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await requestHandler.get("/produtos");
        dispatch({
          type: ProdutoActionTypes.SET_PRODUTO_SEARCH,
          payload: result.data
        });
        resolve();
      } catch (e) {
        console.log(e);
        reject();
      }
    });
  };
};

export const clearProdutoSearch: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetProduto
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ProdutoActionTypes.SET_PRODUTO_SEARCH,
      payload: null
    });
  };
};

export const setProduto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetProduto
>> = (produto: Produto) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ProdutoActionTypes.SET_PRODUTO,
      payload: produto
    });
  };
};

export const setProdutoQuery: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetProdutoQuery
>> = (query: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ProdutoActionTypes.SET_PRODUTO_QUERY,
      payload: query
    });
  };
};

export const clearProduto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetProduto
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ProdutoActionTypes.SET_PRODUTO,
      payload: null
    });
  };
};

export const saveProduto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetProduto
>> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const { nome, maoDeObra, descricao } = formValues;
    const produto: Produto = {
      nome,
      maoDeObra,
      descricao
    };
    try {
      const result = await requestHandler.post("/produtos", produto);
      dispatch({
        type: ProdutoActionTypes.SET_PRODUTO,
        payload: result.data
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteProduto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetProduto
>> = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await requestHandler.delete(`/produtos/${id}/remover`);
      dispatch({
        type: ProdutoActionTypes.DELETE_PRODUTO,
        payload: true
      });
    } catch (e) {
      dispatch({
        type: ProdutoActionTypes.DELETE_PRODUTO,
        payload: false
      });
    }
  };
};

export const updateProduto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetProduto
>> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const { id, nome, maoDeObra, descricao } = formValues;
    const produto: Produto = {
      id,
      nome,
      maoDeObra,
      descricao
    };
    try {
      await requestHandler.patch(`/produtos/${id}`, produto);
      dispatch({
        type: ProdutoActionTypes.SET_PRODUTO,
        payload: produto
      });
    } catch (e) {
      console.log(e);
    }
  };
};
