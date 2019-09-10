import React, { useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  Container,
  Button,
  Icon,
  Input,
  Divider
} from "semantic-ui-react";

import { AppState } from "../../store";
import { Material } from "../../store/material/types";
import { titleCss, listCss } from "../css";
import { setMaterial, setSearchQuery } from "../../store/material/actions";
import history from "../../history";

const MaterialSearch = () => {
  const dispatch = useDispatch();
  const materiais = useSelector((state: AppState) => state.materials.list);
  const query = useSelector((state: AppState) => state.materials.query);

  useEffect(() => {
    // TODO: Carregar lista do DB
  }, [dispatch]);

  const handleClick = (name: string, material: Material) => {
    dispatch(setMaterial(material));
    switch (name) {
      case "show":
        history.push("/material");
        break;
      case "edit":
        history.push("/material/editar");
        break;
      case "delete":
        //TODO: Remover
        break;
      default:
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const onSearchSubmit = () => {
    if (query) {
      //TODO: Fazer pesquisa
    }
  };

  const renderSearch = () => {
    return (
      <Container>
        <Input label="Nome" onChange={onInputChange} />
        <br />
        <br />
        <Button primary onSubmit={onSearchSubmit}>
          Pesquisar
        </Button>
      </Container>
    );
  };

  const renderList = () => {
    if (materiais) {
      return (
        <List divided>
          {materiais.map((material: Material) => {
            return (
              <List.Item key={material.id}>
                <List.Content floated="right">
                  <Button
                    icon
                    color="blue"
                    onClick={() => handleClick("show", material)}
                  >
                    <Icon name="eye" />
                  </Button>
                  <Button
                    icon
                    color="yellow"
                    onClick={() => handleClick("edit", material)}
                  >
                    <Icon name="edit" />
                  </Button>
                  <Button
                    icon
                    color="red"
                    onClick={() => handleClick("delete", material)}
                  >
                    <Icon name="close" />
                  </Button>
                </List.Content>
                <List.Content>
                  <List.Header>{material.nome}</List.Header>
                  <List.Description>
                    R${material.valorUnt}/{material.tipoMedida}
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      );
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
      <h1 style={titleCss}>Pesquisa de Materiais</h1>
      {renderSearch()}
      <br />
      <Divider />
      <br />
      {renderList()}
    </Container>
  );
};

export default MaterialSearch;
