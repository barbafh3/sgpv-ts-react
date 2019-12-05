import React, { useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import {
  clearClienteSearch,
  setCliente,
  deleteCliente,
  findAllClientes,
  setClienteQuery,
  searchClientes
} from "../../../store/cliente/actions";
import { Cliente } from "../../../store/cliente/types";
import history from "../../../history";
import {
  Input,
  Button,
  Container,
  List,
  Icon,
  Divider
} from "semantic-ui-react";
import { titleCss, listCss } from "../../css";

const ClienteSearch = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: AppState) => state.clientes.query);
  const searchResult = useSelector(
    (state: AppState) => state.clientes.searchResult
  ) as Cliente[];
  const clientes = useSelector(
    (state: AppState) => state.clientes.list
  ) as Cliente[];

  useEffect(() => {
    return () => {
      dispatch(clearClienteSearch());
    };
  }, [dispatch]);

  const handleClick = async (name: string, cliente: Cliente) => {
    switch (name) {
      case "show":
        dispatch(setCliente(cliente));
        history.push("/cliente");
        break;
      case "edit":
        dispatch(setCliente(cliente));
        history.push("/cliente/alterar");
        break;
      case "delete":
        await dispatch(deleteCliente(cliente.id));
        await dispatch(findAllClientes());
        break;
      default:
        break;
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setClienteQuery(e.target.value));
  };

  const onShowAllSubmit = () => {
    dispatch(findAllClientes());
  };

  const onSearchSubmit = () => {
    if (query) {
      dispatch(searchClientes(query));
    }
  };

  const renderSearch = () => {
    return (
      <Container>
        <Input label="Nome" onChange={onInputChange} />
        <br />
        <br />
        <Button primary onClick={onSearchSubmit}>
          Pesquisar
        </Button>
        <Button primary onClick={onShowAllSubmit}>
          Mostrar Todos
        </Button>
      </Container>
    );
  };

  const renderListItem = (cliente: Cliente) => {
    return (
      <>
        <List.Content floated="right">
          <Button
            icon
            color="blue"
            onClick={() => handleClick("show", cliente)}
          >
            <Icon name="eye" />
          </Button>
          <Button
            icon
            color="yellow"
            onClick={() => handleClick("edit", cliente)}
          >
            <Icon name="edit" />
          </Button>
          <Button
            icon
            color="red"
            onClick={() => handleClick("delete", cliente)}
          >
            <Icon name="close" />
          </Button>
        </List.Content>
        <List.Content>
          <List.Header>{cliente.nome}</List.Header>
          <List.Description>
            {cliente.telefone} - {cliente.email}
          </List.Description>
        </List.Content>
      </>
    );
  };

  const renderList = () => {
    if (searchResult) {
      if (searchResult.length > 0) {
        return (
          <List divided>
            {searchResult.map((cliente: Cliente) => {
              return (
                <List.Item key={cliente.id}>
                  {renderListItem(cliente)}
                </List.Item>
              );
            })}
          </List>
        );
      } else {
        return (
          <Container>
            <p>Nenhum resultado encontrado</p>
          </Container>
        );
      }
    } else {
      return (
        <Container>
          <p>Use o campo acima para realizar uma pesquisa</p>
        </Container>
      );
    }
  };

  return (
    <Container style={listCss}>
      <h1 style={titleCss}>Pesquisa de Clientes</h1>
      {renderSearch()}
      <br />
      <Divider />
      <br />
      {renderList()}
    </Container>
  );
};

export default ClienteSearch;
