import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { SetCusto, Custo, CustoActionTypes, FBCusto } from "./types";
import { parseObject } from "../../services/utils";
import fbDatabase from "../../services/firebaseConfig";

export const saveCusto: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetCusto>
> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const custosRef = fbDatabase.ref().child("custos");
    const custo: Custo = {
      produtoId: formValues.produtoId,
      materialId: formValues.materialId,
      qtde: formValues.qtde
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
      produtoId: formValues.produtoId,
      materialId: formValues.materialId,
      qtde: formValues.qtde
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
