export enum ProdutoActionTypes {
  SET_PRODUTO = "@produto/SET",
  SET_PRODUTO_LIST = "@produto/SET_LIST",
  SET_PRODUTO_SEARCH = "@produto/SET_SEARCH",
  SET_PRODUTO_QUERY = "@produto/SET_QUERY"
}

export type Produto = {
  id?: string;
  nome: string;
  maoDeObra: number;
  descricao?: string;
  materiais?: { [key: string]: boolean };
};

export type FBProduto = {
  [key: string]: Produto;
};

export interface SetProduto {
  type: ProdutoActionTypes.SET_PRODUTO;
  payload: Produto;
}

export interface SetProdutoList {
  type: ProdutoActionTypes.SET_PRODUTO_LIST;
  payload: Produto[];
}

export interface SetProdutoSearch {
  type: ProdutoActionTypes.SET_PRODUTO_SEARCH;
  payload: FBProduto;
}

export interface SetProdutoQuery {
  type: ProdutoActionTypes.SET_PRODUTO_QUERY;
  payload: string;
}

export type ProdutoActions =
  | SetProduto
  | SetProdutoList
  | SetProdutoSearch
  | SetProdutoQuery;

export interface ProdutoState {
  list: Produto[];
  produto?: Produto | null;
  searchResult?: FBProduto | null;
  query?: string;
}

export const initialProdutoState = {
  list: []
};
