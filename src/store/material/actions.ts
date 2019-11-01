import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import fbDatabase from "../../services/firebaseConfig";
import { requestHandler } from "../../services/nodeDbApi";

import {
  FetchMaterial,
  MaterialActionTypes,
  MaterialState,
  SaveMaterial,
  Material,
  ClearMaterial,
  UpdateMaterial,
  SetMaterial,
  SetSearchQuery,
  SearchMaterials,
  FindAllMaterials,
  ClearMaterialSearch,
  DeleteMaterial,
  FBMaterial
} from "./types";
import parseObject from "../../services/utils";

export const searchMaterials: ActionCreator<
  ThunkAction<Promise<any>, null, null, SearchMaterials>
> = (query: string) => {
  return async (dispatch: Dispatch) => {
    const fullQuery = `SELECT * FROM materiais WHERE nome LIKE '%${query}%'`;
    const resultado = await requestHandler.post("/materiais/buscar", {
      query: fullQuery
    });
    const materiais: Material[] = resultado.data;
    dispatch({
      type: MaterialActionTypes.SEARCH_MATERIALS,
      payload: materiais
    });
  };
};

export const findAllMaterials: ActionCreator<
  ThunkAction<Promise<any>, null, null, FindAllMaterials>
> = () => {
  return async (dispatch: Dispatch) => {
    const materialRef = fbDatabase.ref().child("materiais");
    materialRef.on("value", snapshot => {
      const raw = snapshot.val();
      dispatch({
        type: MaterialActionTypes.SEARCH_MATERIALS,
        payload: raw
      });
    });
  };
};

export const setSearchQuery: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetSearchQuery>
> = (query: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: MaterialActionTypes.SET_SEARCH_QUERY, payload: query });
  };
};

export const setMaterial: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetMaterial>
> = (material: Material) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: MaterialActionTypes.SET_MATERIAL, payload: material });
  };
};

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

export const clearMaterialSearch: ActionCreator<
  ThunkAction<Promise<any>, null, null, ClearMaterialSearch>
> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: MaterialActionTypes.CLEAR_MATERIAL_SEARCH,
      payload: null
    });
  };
};

export const saveMaterial: ActionCreator<
  ThunkAction<Promise<any>, null, null, SaveMaterial>
> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const materialRef = fbDatabase.ref().child("materiais");
    const novoMaterial: Material = {
      nome: formValues.nome,
      valorUnt: formValues.valorUnt,
      tipoMedida: formValues.tipoMedida,
      descricao: formValues.descricao
    };
    const parsedMaterial = parseObject(novoMaterial);
    try {
      materialRef.push(parsedMaterial);
      dispatch({
        type: MaterialActionTypes.SAVE_MATERIAL,
        payload: novoMaterial
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateMaterial: ActionCreator<
  ThunkAction<Promise<any>, null, null, UpdateMaterial>
> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const materialRef = fbDatabase.ref().child("materiais");
    const { id, nome, valorUnt, tipoMedida, descricao } = formValues;
    const material: Material = {
      nome,
      valorUnt,
      tipoMedida,
      descricao
    };
    let novoMaterial: FBMaterial = {};
    novoMaterial[id] = material;
    const parsedMaterial = parseObject(novoMaterial);
    try {
      materialRef.update(parsedMaterial);
      dispatch({
        type: MaterialActionTypes.UPDATE_MATERIAL,
        payload: material
      });
    } catch (e) {}
  };
};

export const deleteMaterial: ActionCreator<
  ThunkAction<Promise<any>, null, null, DeleteMaterial>
> = (id: number) => {
  return async (dispatch: Dispatch) => {
    const materialRef = fbDatabase.ref().child(`materiais/${id}`);
    try {
      materialRef.remove();
      dispatch({
        type: MaterialActionTypes.DELETE_MATERIAL,
        payload: true
      });
    } catch (e) {
      console.log(e);
      await dispatch({
        type: MaterialActionTypes.DELETE_MATERIAL,
        payload: false
      });
    }
  };
};
