import { Reducer } from "redux";
import {
  initialMaterialState,
  MaterialActions,
  MaterialState,
  MaterialActionTypes
} from "./types";

const reducer: Reducer<MaterialState, MaterialActions> = (
  state = initialMaterialState,
  action
) => {
  switch (action.type) {
    case MaterialActionTypes.SEARCH_MATERIALS:
      return {
        ...state,
        searchResult: action.payload
      };
    case MaterialActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case MaterialActionTypes.SET_MATERIAL:
      return {
        ...state,
        material: action.payload
      };
    case MaterialActionTypes.FETCH_MATERIAL:
      return {
        ...state,
        material: action.payload
      };
    case MaterialActionTypes.CLEAR_MATERIAL:
      return {
        ...state,
        material: action.payload
      };
    case MaterialActionTypes.CLEAR_MATERIAL_SEARCH:
      return {
        ...state,
        searchResult: action.payload
      };
    case MaterialActionTypes.SAVE_MATERIAL:
      return {
        ...state,
        material: action.payload
      };
    case MaterialActionTypes.UPDATE_MATERIAL:
      return {
        ...state,
        material: action.payload
      };
    case MaterialActionTypes.DELETE_MATERIAL:
      return {
        ...state,
        materialRemoved: action.payload
      };
    case MaterialActionTypes.GET_ALL_MATERIALS:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
