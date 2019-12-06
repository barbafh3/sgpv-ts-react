import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { SetCusto, Custo, CustoActionTypes, FBCusto } from "./types";
import { parseObject } from "../../services/utils";
import fbDatabase from "../../services/firebaseConfig";
import { requestHandler } from "../../services/nodeDbApi";
import { MaterialActionTypes } from "../material/types";

export const saveCusto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetCusto
>> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const { ProdutoId, MaterialId, quantidade } = formValues;
    const custo = {
      ProdutoId,
      MaterialId,
      quantidade
    };
    const result = await requestHandler.post("/custos", custo);
    dispatch({
      type: CustoActionTypes.SET_CUSTO,
      payload: result.data
    });
  };
};

export const updateCusto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetCusto
>> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const custosRef = fbDatabase.ref().child("custos");
    const custo = {
      ProdutoId: formValues.ProdutoId,
      MaterialId: formValues.MaterialId,
      quantidade: formValues.quantidade
    } as Custo;
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

export const getMateriaisCusto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetCusto
>> = (id: number) => {
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

export const clearMaterialList: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetCusto
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: MaterialActionTypes.SET_MATERIAL_LIST,
      payload: []
    });
  };
};

export const deleteCusto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetCusto
>> = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await requestHandler.delete(`/custos/${id}/remover`);
      dispatch({
        type: CustoActionTypes.DELETE_CUSTO,
        payload: true
      });
    } catch (e_) {
      dispatch({
        type: CustoActionTypes.DELETE_CUSTO,
        payload: false
      });
    }
  };
};

export const getCustosProduto: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetCusto
>> = (id: number) => {
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

export const clearCustoList: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetCusto
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: CustoActionTypes.SET_CUSTO_LIST,
      payload: []
    });
  };
};
