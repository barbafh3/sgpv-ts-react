import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  SaveCliente,
  Cliente,
  ClienteActionTypes,
  ClearCliente,
  ClearClienteSearch,
  FindAllClientes,
  DeleteCliente,
  SetCliente,
  UpdateCliente,
  SetClienteQuery,
  SearchCliente
} from "./types";
import { requestHandler } from "../../services/nodeDbApi";

export const searchClientes: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SearchCliente
>> = (query: string) => {
  return async (dispatch: Dispatch) => {
    const fullQuery = `SELECT * FROM clientes WHERE nome LIKE '%${query}%'`;
    const resultado = await requestHandler.post("/clientes/buscar", {
      query: fullQuery
    });
    const clientes: Cliente[] = resultado.data;
    dispatch({
      type: ClienteActionTypes.SET_CLIENTE_SEARCH,
      payload: clientes
    });
  };
};

export const setClienteQuery: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetClienteQuery
>> = (query: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ClienteActionTypes.SET_CLIENTE_QUERY,
      payload: query
    });
  };
};

export const findAllClientes: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  FindAllClientes
>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const result = await requestHandler.get("/clientes");
      dispatch({
        type: ClienteActionTypes.SET_CLIENTE_SEARCH,
        payload: result.data
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteCliente: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  DeleteCliente
>> = (cliente: Cliente) => {
  return async (dispatch: Dispatch) => {
    try {
      await requestHandler.delete(`/clientes/${cliente.id}/remover`);
      dispatch({
        type: ClienteActionTypes.SET_CLIENTE,
        payload: true
      });
    } catch (e) {
      dispatch({
        type: ClienteActionTypes.SET_CLIENTE,
        payload: false
      });
    }
  };
};

export const setCliente: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SetCliente
>> = (cliente: Cliente) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ClienteActionTypes.SET_CLIENTE,
      payload: cliente
    });
  };
};

export const clearCliente: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  ClearCliente
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ClienteActionTypes.SET_CLIENTE,
      payload: null
    });
  };
};

export const clearClienteSearch: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  ClearClienteSearch
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ClienteActionTypes.SET_CLIENTE_SEARCH,
      payload: null
    });
  };
};

export const saveCliente: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  SaveCliente
>> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const {
      nome,
      telefone,
      email,
      endereco,
      bairro,
      cidade,
      observacoes
    } = formValues;
    const novoCliente: Cliente = {
      nome,
      telefone,
      email,
      endereco,
      bairro,
      cidade,
      observacoes
    };
    try {
      const resultado = await requestHandler.post("/clientes", novoCliente);
      const material = resultado.data;
      dispatch({
        type: ClienteActionTypes.SET_CLIENTE,
        payload: material
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateCliente: ActionCreator<ThunkAction<
  Promise<any>,
  null,
  null,
  UpdateCliente
>> = (formValues: any) => {
  return async (dispatch: Dispatch) => {
    const {
      id,
      nome,
      telefone,
      email,
      endereco,
      bairro,
      cidade,
      observacoes
    } = formValues;
    const novoCliente: Cliente = {
      nome,
      telefone,
      email,
      endereco,
      bairro,
      cidade,
      observacoes
    };
    try {
      const resultado = await requestHandler.patch(
        `/clientes/${id}`,
        novoCliente
      );
      const material = resultado.data;
      dispatch({
        type: ClienteActionTypes.SET_CLIENTE,
        payload: material
      });
    } catch (e) {
      console.log(e);
    }
  };
};
