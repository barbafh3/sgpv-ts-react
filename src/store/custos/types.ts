export enum CustoActionTypes {
  SET_CUSTO = "@custo/SET",
  SET_CUSTO_LIST = "@custo/SET_LIST",
  SET_CUSTO_SEARCH = "@custo/SET_SEARCH",
  SET_CUSTO_QUERY = "@custo/SET_QUERY",
  SET_CUSTO_PRODUTO_LIST = "@custo/SET_PRODUTO_LIST",
  SET_CUSTO_MATERIAL_LIST = "@custo/SET_MATERIAL_LIST",
  SET_VALOR_TOTAL = "@custo/SET_VALOR_TOTAL",
  SET_CUSTO_SELECTED_ID = "@custo/SET_SELECTED_ID",
  DELETE_CUSTO = "@custo/DELETE"
}

export type Custo = {
  id?: string;
  ProdutoId: string;
  MaterialId: string;
  quantidade: number;
};

export type FBCusto = {
  [key: string]: Custo;
};

export interface CustoState {
  list: Custo[];
  custo?: Custo | null;
  searchResult?: Custo[] | null;
  query?: any;
  produtoOptions?: [] | null;
  materialOptions?: [] | null;
  valorTotal?: number | null;
  selectedId?: string;
}

export interface SetCusto {
  type: CustoActionTypes.SET_CUSTO;
  payload: Custo;
}

export interface SetCustoList {
  type: CustoActionTypes.SET_CUSTO_LIST;
  payload: Custo[];
}

export interface SetCustoSearch {
  type: CustoActionTypes.SET_CUSTO_SEARCH;
  payload: Custo[];
}

export interface SetCustoQuery {
  type: CustoActionTypes.SET_CUSTO_QUERY;
  payload: string;
}

export interface SetCustoProdutoList {
  type: CustoActionTypes.SET_CUSTO_PRODUTO_LIST;
  payload: [];
}

export interface SetCustoMaterialList {
  type: CustoActionTypes.SET_CUSTO_MATERIAL_LIST;
  payload: [];
}

export interface SetValorTotal {
  type: CustoActionTypes.SET_VALOR_TOTAL;
  payload: number;
}

export interface SetCustoSelectedId {
  type: CustoActionTypes.SET_CUSTO_SELECTED_ID;
  payload: string;
}

export interface DeleteCusto {
  type: CustoActionTypes.DELETE_CUSTO;
  payload: boolean;
}

export type CustoActions =
  | SetCusto
  | SetCustoList
  | SetCustoSearch
  | SetCustoProdutoList
  | SetCustoMaterialList
  | SetValorTotal
  | SetCustoSelectedId
  | DeleteCusto
  | SetCustoQuery;

export const initialCustoState: CustoState = {
  list: []
};
