import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { SetCusto, Custo, CustoActionTypes, FBCusto } from "./types";
import { parseObject } from "../../services/utils";
import fbDatabase from "../../services/firebaseConfig";
import { requestHandler } from "../../services/nodeDbApi";
import { MaterialActionTypes } from "../material/types";

export const saveCusto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetCusto>
> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const custosRef = fbDatabase.ref().child("custos");
    const custo: Custo = {
      ProdutoId: formValues.ProdutoId,
      MaterialId: formValues.MaterialId,
      quantidade: formValues.quantidade
    };
    const parsedCusto = parseObject(custo);
    custosRef.push(parsedCusto);
    dispatch({
      type: CustoActionTypes.SET_CUSTO,
      payload: custo
    });
  };
};

export const updateCusto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetCusto>
> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const custosRef = fbDatabase.ref().child("custos");
    const custo: Custo = {
      ProdutoId: formValues.ProdutoId,
      MaterialId: formValues.MaterialId,
      quantidade: formValues.quantidade
    };
    let novoCusto: FBCusto = {};
    novoCusto[formValues.id] = custo;
    const parsedCusto = parseObject(novoCusto);
    custosRef.update(parsedCusto);
    dispatch({
      type: CustoActionTypes.SET_CUSTO,
      payload: custo
    });
  };
};

export const getMateriaisCusto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetCusto>
> = (id: number) => {
  return async (dispatch: Dispatch) => {
    const query = {
      query: `SELECT materiais.* 
              FROM materiais, custoProdutos 
              WHERE custoProdutos.materialId = materiais.id 
              AND custoProdutos.produtoId = ${id}`
    };
    try {
      const result = await requestHandler.post("/materiais/buscar", query);
      dispatch({
        type: MaterialActionTypes.SET_MATERIAL_LIST,
        payload: result.data
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCustosProduto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetCusto>
> = (id: number) => {
  return async (dispatch: Dispatch) => {
    const query = {
      query: `SELECT * 
              FROM custoProdutos 
              WHERE custoProdutos.produtoId = ${id}`
    };
    try {
      const result = await requestHandler.post("/custos/buscar", query);
      dispatch({
        type: CustoActionTypes.SET_CUSTO_LIST,
        payload: result.data
      });
    } catch (e) {
      console.log(e);
    }
  };
};
