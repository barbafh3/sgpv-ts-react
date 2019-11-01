export enum CustoActionTypes {
  SET_CUSTO = "@custo/SET",
  SET_CUSTO_LIST = "@custo/SET_LIST",
  SET_CUSTO_SEARCH = "@custo/SET_SEARCH",
  SET_CUSTO_QUERY = "@custo/SET_QUERY",
  SET_CUSTO_PRODUTO_LIST = "@custo/SET_PRODUTO_LIST",
  SET_CUSTO_MATERIAL_LIST = "@custo/SET_MATERIAL_LIST"
}

export type Custo = {
  id?: string;
  produtoId: string;
  materialId: string;
  qtde: number;
};

export type FBCusto = {
  [key: string]: Custo;
};

export interface CustoState {
  list: Custo[];
  custo?: Custo | null;
  searchResult?: FBCusto | null;
  query?: any;
  produtoOptions?: [] | null;
  materialOptions?: [] | null;
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
  payload: FBCusto;
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

export type CustoActions =
  | SetCusto
  | SetCustoList
  | SetCustoSearch
  | SetCustoProdutoList
  | SetCustoMaterialList
  | SetCustoQuery;

export const initialCustoState: CustoState = {
  list: []
};
