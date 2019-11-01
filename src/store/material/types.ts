export enum MaterialActionTypes {
  SET_MATERIAL_LIST = "@material/SET_LIST",
  FETCH_MATERIAL = "@material/FETCH",
  GET_ALL_MATERIALS = "@material/GET_ALL",
  SAVE_MATERIAL = "@material/SAVE",
  UPDATE_MATERIAL = "@material/UPDATE",
  DELETE_MATERIAL = "@material/DELETE",
  SEARCH_MATERIALS = "@material/SEARCH",
  CLEAR_MATERIAL = "@material/CLEAR",
  SET_MATERIAL = "@material/SET",
  SET_SEARCH_QUERY = "@material/SEARCH_QUERY",
  CLEAR_MATERIAL_SEARCH = "@material/CLEAR_SEARCH"
}

export enum MaterialRoutes {
  SHOW = "material",
  NEW = "material/novo"
}

export type Material = {
  id?: string;
  nome: string;
  valorUnt: number;
  tipoMedida: string;
  descricao?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FBMaterial = {
  [key: string]: Material;
};

export interface FetchMaterial {
  type: MaterialActionTypes.FETCH_MATERIAL;
  payload: Material;
}

export interface SetMaterialList {
  type: MaterialActionTypes.SET_MATERIAL_LIST;
  payload: Material[];
}

export interface GetAllMaterials {
  type: MaterialActionTypes.GET_ALL_MATERIALS;
  payload: [];
}

export interface SaveMaterial {
  type: MaterialActionTypes.SAVE_MATERIAL;
  payload: Material;
}

export interface UpdateMaterial {
  type: MaterialActionTypes.UPDATE_MATERIAL;
  payload: Material;
}

export interface DeleteMaterial {
  type: MaterialActionTypes.DELETE_MATERIAL;
  payload: boolean;
}

export interface SearchMaterials {
  type: MaterialActionTypes.SEARCH_MATERIALS;
  payload: FBMaterial;
}

export interface FindAllMaterials {
  type: MaterialActionTypes.SEARCH_MATERIALS;
  payload: FBMaterial;
}

export interface ClearMaterial {
  type: MaterialActionTypes.CLEAR_MATERIAL;
  payload: null;
}

export interface ClearMaterialSearch {
  type: MaterialActionTypes.CLEAR_MATERIAL_SEARCH;
  payload: null;
}

export interface SetMaterial {
  type: MaterialActionTypes.SET_MATERIAL;
  payload: Material;
}

export interface SetSearchQuery {
  type: MaterialActionTypes.SET_SEARCH_QUERY;
  payload: string;
}

export type MaterialActions =
  | ClearMaterial
  | ClearMaterialSearch
  | SaveMaterial
  | UpdateMaterial
  | DeleteMaterial
  | SearchMaterials
  | FindAllMaterials
  | GetAllMaterials
  | FetchMaterial
  | SetSearchQuery
  | DeleteMaterial
  | SetMaterialList
  | SetMaterial;

export interface MaterialState {
  readonly list: Material[];
  readonly material?: Material | null;
  readonly searchResult?: FBMaterial | null;
  readonly query?: string;
}

export const initialMaterialState: MaterialState = {
  list: []
};
