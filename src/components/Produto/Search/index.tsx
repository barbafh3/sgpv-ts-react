import React, { useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { FBProduto, Produto } from "../../../store/produto/types";
import {
  clearProdutoSearch,
  setProduto,
  findAllProdutos,
  deleteProduto,
  setProdutoQuery,
  searchProdutos,
  searchSpecific
} from "../../../store/produto/actions";
import history from "../../../history";
import {
  Container,
  Input,
  Button,
  List,
  Icon,
  Divider
} from "semantic-ui-react";
import { listCss, titleCss } from "../../css";
import fbDatabase from "../../../services/firebaseConfig";

const ProdutoSearch: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: AppState) => state.produtos.query);
  const searchResult = useSelector(
    (state: AppState) => state.produtos.searchResult
  ) as FBProduto;

  useEffect(() => {
    return () => {
      dispatch(clearProdutoSearch());
    };
  }, [dispatch]);


  const handleClick = async (name: string, produto: Produto) => {
    switch (name) {
      case "show":
        await dispatch(setProduto(produto));
        history.push("/produto");
        break;
      case "edit":
        dispatch(setProduto(produto));
        history.push("/produto/editar");
        break;
      case "delete":
        dispatch(deleteProduto(produto.id));
        dispatch(findAllProdutos());
        break;
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setProdutoQuery(e.target.value));
  };

  const onShowAllSubmit = () => {
    dispatch(findAllProdutos());
  };

  const onSearchSubmit = () => {
    if (query) {
      dispatch(searchProdutos(query));
    }
  };

  const onAddClick = (produto: Produto) => {
    console.log(produto.id);
    const produtoRef = fbDatabase.ref(`produtos/${produto.id}`);
    const materialId: string = "HUHHUHUHUHU";
    interface Teste {
      materiais?: {
        [key: string]: number;
      };
    }
    let material: Teste = {};
    const id: { [key: string]: number } = {};
    id[`${materialId}`] = 1;
    material["materiais"] = id;
    produtoRef.update(material);
  };

  const onFilterClick = () => {
    // dispatch(clearProdutoSearch());
    dispatch(searchSpecific("HUHUHUHUHU"));
  };

  const renderSearch = () => {
    return (
      <Container>
        <Input label="nome" onChange={onInputChange} />
        <br />
        <br />
        <Button primary onClick={onSearchSubmit}>
          Pesquisar
        </Button>
        <Button primary onClick={onShowAllSubmit}>
          Mostrar Todos
        </Button>
        <Button primary onClick={onFilterClick}>
          Filter
        </Button>
      </Container>
    );
  };

  const renderListItem = (produto: Produto) => {
    return (
      <>
        <List.Content floated="right">
          <Button primary onClick={() => onAddClick(produto)}>
            Adicionar
          </Button>
          <Button
            icon
            color="blue"
            onClick={() => handleClick("show", produto)}
          >
            <Icon name="eye" />
          </Button>
          <Button
            icon
            color="yellow"
            onClick={() => handleClick("edit", produto)}
          >
            <Icon name="edit" />
          </Button>
          <Button
            icon
            color="red"
            onClick={() => handleClick("delete", produto)}
          >
            <Icon name="close" />
          </Button>
        </List.Content>
        <List.Content>
          <List.Header>{produto.nome}</List.Header>
          <List.Description>Mão de Obra: {produto.maoDeObra}</List.Description>
        </List.Content>
      </>
    );
  };

  const renderList = () => {
    if (searchResult) {
      const keys = Object.keys(searchResult);
      return (
        <List divided>
          {keys.map((key: string) => {
            const produto = searchResult[key] as Produto;
            produto["id"] = key;
            return <List.Item key={key}>{renderListItem(produto)}</List.Item>;
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
      <h1 style={titleCss}>Pesquisa de Produtos</h1>
      {renderSearch()}
      <br />
      <Divider />
      <br />
      {renderList()}
    </Container>
  );
};

export default ProdutoSearch;
