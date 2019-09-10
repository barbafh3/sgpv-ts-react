export enum MaterialActionTypes {
  FETCH_MATERIAL = "@material/FETCH",
  GET_ALL_MATERIALS = "@material/GET_ALL",
  SAVE_MATERIAL = "@material/SAVE",
  UPDATE_MATERIAL = "@material/UPDATE",
  DELETE_MATERIAL = "@material/DELETE",
  SEARCH_MATERIALS = "@material/SEARCH",
  CLEAR_MATERIAL = "@material/CLEAR",
  SET_MATERIAL = "@material/SET",
  SET_SEARCH_QUERY = "@material/SEARCH_QUERY"
}

export enum MaterialRoutes {
  SHOW = "material",
  NEW = "material/novo"
}

export type Material = {
  id: number;
  nome: string;
  valorUnt: number;
  tipoMedida: string;
  descricao?: string;
};

export interface FetchMaterial {
  type: MaterialActionTypes.FETCH_MATERIAL;
  payload: Material;
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
  payload: Material[];
}

export interface ClearMaterial {
  type: MaterialActionTypes.CLEAR_MATERIAL;
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
  | SaveMaterial
  | UpdateMaterial
  | DeleteMaterial
  | SearchMaterials
  | GetAllMaterials
  | FetchMaterial
  | SetSearchQuery
  | SetMaterial;

export interface MaterialState {
  readonly list: Material[];
  readonly material?: Material | null;
  readonly searchResult?: [];
  readonly query?: string;
}

const materialList: Material[] = [
  {
    id: 1,
    nome: "Linha",
    valorUnt: 1,
    tipoMedida: "cm",
    descricao: "Linha Azul"
  },
  {
    id: 2,
    nome: "Fita",
    valorUnt: 5,
    tipoMedida: "m",
    descricao: "Fita Verde"
  },
  {
    id: 3,
    nome: "Tecido",
    valorUnt: 9,
    tipoMedida: "m2",
    descricao: "Tecido Estanpado"
  }
];

export const initialMaterialState: MaterialState = {
  // list: materialList
  list: []
};
