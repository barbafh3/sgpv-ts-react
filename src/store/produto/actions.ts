import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  SetProduto,
  FBProduto,
  Produto,
  ProdutoActionTypes,
  SetProdutoQuery,
  SetProdutoSearch
} from "./types";
import parseObject from "../../services/utils";
import fbDatabase from "../../services/firebaseConfig";

export const searchSpecific: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProdutoSearch>
> = (id: string) => {
  return async (dispatch: Dispatch) => {
    fbDatabase
      .ref("produtos/")
      .orderByChild("nome")
      .on("value", snapshot => {
        const raw = snapshot.val();
        // if (raw) {
        dispatch({
          type: ProdutoActionTypes.SET_PRODUTO_SEARCH,
          payload: raw
        });
        // }
      });
  };
};

export const searchProdutos: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProdutoSearch>
> = (query: string) => {
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

export const findAllProdutos: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProduto>
> = () => {
  return async (dispatch: Dispatch) => {
    const produtosRef = fbDatabase.ref().child("produtos");
    try {
      produtosRef.on("value", snapshot => {
        const raw = snapshot.val();
        dispatch({
          type: ProdutoActionTypes.SET_PRODUTO_SEARCH,
          payload: raw
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearProdutoSearch: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProduto>
> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ProdutoActionTypes.SET_PRODUTO_SEARCH,
      payload: null
    });
  };
};

export const setProduto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProduto>
> = (produto: Produto) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ProdutoActionTypes.SET_PRODUTO,
      payload: produto
    });
  };
};

export const setProdutoQuery: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProdutoQuery>
> = (query: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ProdutoActionTypes.SET_PRODUTO_QUERY,
      payload: query
    });
  };
};

export const clearProduto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProduto>
> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ProdutoActionTypes.SET_PRODUTO,
      payload: null
    });
  };
};

export const saveProduto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProduto>
> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const produtoRef = fbDatabase.ref().child("produtos");
    const { nome, maoDeObra, descricao } = formValues;
    const novoProduto: Produto = {
      nome,
      maoDeObra,
      descricao
    };
    const parsedProduto = parseObject(novoProduto);
    try {
      produtoRef.push(parsedProduto);
      dispatch({
        type: ProdutoActionTypes.SET_PRODUTO,
        payload: novoProduto
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteProduto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProduto>
> = (id: string) => {
  return async (dispatch: Dispatch) => {
    const produtoRef = fbDatabase.ref(`produtos/${id}`);
    await produtoRef.remove();
  };
};

export const updateProduto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetProduto>
> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const produtoRef = fbDatabase.ref().child("produtos");
    const { id, nome, maoDeObra, descricao } = formValues;
    const produto: Produto = {
      nome,
      maoDeObra,
      descricao
    };
    let novoProduto: FBProduto = {};
    novoProduto[id] = produto;
    const parsedProduto = parseObject(novoProduto);
    try {
      produtoRef.update(parsedProduto);
      dispatch({
        type: ProdutoActionTypes.SET_PRODUTO,
        payload: novoProduto
      });
    } catch (e) {
      console.log(e);
    }
  };
};
