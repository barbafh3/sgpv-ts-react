export enum ClienteActionTypes {
  SET_CLIENTE = "@cliente/SET",
  SET_CLIENTE_LIST = "@cliente/SET_LIST",
  SET_CLIENTE_SEARCH = "@cliente/SET_SEARCH",
  SET_CLIENTE_QUERY = "@cliente/SET_QUERY",
  DELETE_CLIENTE = "@cliente/DELETE"
}

export type Cliente = {
  id?: string;
  nome: string;
  telefone: string;
  email: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  observacoes?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface FBClienteResult {
  [key: string]: Cliente;
}

export interface FetchCliente {
  type: ClienteActionTypes.SET_CLIENTE;
  payload: Cliente;
}

export interface FindAllClientes {
  type: ClienteActionTypes.SET_CLIENTE_LIST;
  payload: Cliente[];
}

export interface SetCliente {
  type: ClienteActionTypes.SET_CLIENTE;
  payload: Cliente;
}

export interface ClearCliente {
  type: ClienteActionTypes.SET_CLIENTE;
  payload: null;
}

export interface ClearClienteSearch {
  type: ClienteActionTypes.SET_CLIENTE_SEARCH;
  payload: null;
}

export interface SaveCliente {
  type: ClienteActionTypes.SET_CLIENTE;
  payload: Cliente;
}

export interface UpdateCliente {
  type: ClienteActionTypes.SET_CLIENTE;
  payload: Cliente;
}

export interface DeleteCliente {
  type: ClienteActionTypes.DELETE_CLIENTE;
  payload: boolean;
}

export interface SearchCliente {
  type: ClienteActionTypes.SET_CLIENTE_SEARCH;
  payload: Cliente[];
}

export interface SetClienteQuery {
  type: ClienteActionTypes.SET_CLIENTE_QUERY;
  payload: string;
}

export type ClienteActions =
  | FetchCliente
  | FindAllClientes
  | SaveCliente
  | UpdateCliente
  | SetCliente
  | ClearCliente
  | ClearClienteSearch
  | DeleteCliente
  | SearchCliente
  | SetClienteQuery;

export interface ClienteState {
  readonly list: Cliente[];
  readonly cliente?: Cliente | null;
  readonly searchResult?: Cliente[] | null;
  readonly query?: string;
}

export const initialClienteState: ClienteState = {
  list: []
};
