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

import { AppState } from "../../../store";
import { Material } from "../../../store/material/types";
import { titleCss, listCss } from "../../css";
import {
  setMaterial,
  setSearchQuery,
  searchMaterials,
  findAllMaterials,
  deleteMaterial,
  clearMaterialSearch
} from "../../../store/material/actions";
import history from "../../../history";

const MaterialSearch = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: AppState) => state.materiais.query);
  const searchResult = useSelector(
    (state: AppState) => state.materiais.searchResult
  ) as Material[];

  useEffect(() => {
    return () => {
      dispatch(clearMaterialSearch());
    };
  }, [dispatch]);

  const handleClick = async (name: string, material: Material) => {
    switch (name) {
      case "show":
        dispatch(setMaterial(material));
        history.push("/material");
        break;
      case "edit":
        dispatch(setMaterial(material));
        history.push("/material/editar");
        break;
      case "delete":
        await dispatch(deleteMaterial(material.id));
        await dispatch(findAllMaterials());
        break;
      default:
        break;
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const onSearchSubmit = () => {
    if (query) {
      dispatch(searchMaterials(query));
    }
  };

  const onShowAllSubmit = () => {
    dispatch(findAllMaterials());
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

  const renderListItem = (material: Material) => {
    return (
      <>
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
      </>
    );
  };

  const renderList = () => {
    if (searchResult) {
      return (
        <List divided>
          {searchResult.map((material: Material) => {
            return (
              <List.Item key={material.id}>
                {renderListItem(material)}
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

  // const renderList = () => {
  //   if (searchResult) {
  //     const keys = Object.keys(searchResult);
  //     return (
  //       <List divided>
  //         {keys.map((key: string) => {
  //           const material = searchResult[key] as Material;
  //           material["id"] = key;
  //           return <List.Item key={key}>{renderListItem(material)}</List.Item>;
  //         })}
  //       </List>
  //     );
  //   } else {
  //     return (
  //       <Container>
  //         <p>Use o campo acima para realizar uma pesquisa</p>
  //       </Container>
  //     );
  //   }
  // };

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
