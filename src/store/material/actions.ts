import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import {
  FetchMaterial,
  MaterialActionTypes,
  MaterialState,
  SaveMaterial,
  Material,
  ClearMaterial,
  UpdateMaterial
} from "./types";

export const fetchMaterial: ActionCreator<
  ThunkAction<Promise<any>, MaterialState, null, FetchMaterial>
> = (id: number) => {
  return async (dispatch: Dispatch) => {
    // TODO: api request
    console.log(id);
    return await dispatch({
      type: MaterialActionTypes.FETCH_MATERIAL,
      payload: null
    });
  };
};

export const clearMaterial: ActionCreator<
  ThunkAction<Promise<any>, null, null, ClearMaterial>
> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: MaterialActionTypes.CLEAR_MATERIAL,
      payload: null
    });
  };
};

export const saveMaterial: ActionCreator<
  ThunkAction<Promise<any>, null, null, SaveMaterial>
> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const material: Material = {
      id: formValues.id,
      nome: formValues.nome,
      valorUnt: formValues.valorUnt,
      tipoMedida: formValues.tipoMedida,
      descricao: formValues.descricao
    };
    // Saves material using the api
    dispatch({
      type: MaterialActionTypes.SAVE_MATERIAL,
      payload: material
    });
  };
};

export const updateMaterial: ActionCreator<
  ThunkAction<Promise<any>, null, null, UpdateMaterial>
> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const material: Material = {
      id: formValues.id,
      nome: formValues.nome,
      valorUnt: formValues.valorUnt,
      tipoMedida: formValues.tipoMedida
    };
    // Update material using the api
    dispatch({
      type: MaterialActionTypes.SAVE_MATERIAL,
      payload: material
    });
  };
};
