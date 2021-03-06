import React, { useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Produto } from "../../../store/produto/types";
import {
  clearProdutoSearch,
  setProduto,
  findAllProdutos,
  deleteProduto,
  setProdutoQuery,
  searchProdutos
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
import { sleep } from "../../../services/utils";

const ProdutoSearch: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: AppState) => state.produtos.query);
  const searchResult = useSelector(
    (state: AppState) => state.produtos.searchResult
  ) as Produto[];

  useEffect(() => {
    return () => {
      dispatch(clearProdutoSearch());
    };
  }, [dispatch]);

  const handleClick = async (name: string, produto: Produto) => {
    switch (name) {
      case "show":
        await new Promise(resolve => {
          dispatch(setProduto(produto));
          resolve();
        });
        history.push("/produto");
        break;
      case "edit":
        await new Promise(() => dispatch(setProduto(produto)));
        history.push("/produto/editar");
        break;
      case "delete":
        await new Promise(() => dispatch(deleteProduto(produto.id)));
        await new Promise(() => dispatch(findAllProdutos()));
        break;
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setProdutoQuery(e.target.value));
  };

  const onShowAllSubmit = async () => {
    await new Promise(() => dispatch(findAllProdutos()));
  };

  const onSearchSubmit = () => {
    if (query) {
      dispatch(searchProdutos(query));
    }
  };

  const onAddClick = async (produto: Produto) => {
    await new Promise(() => dispatch(setProduto(produto)));
    await sleep(1000);
    history.push("/custo/novo");
  };

  const onFilterClick = async () => {
    await new Promise(() => {
      dispatch(clearProdutoSearch());
    });
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
      return (
        <List divided>
          {searchResult.map((produto: Produto) => {
            return (
              <List.Item key={produto.id}>{renderListItem(produto)}</List.Item>
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
  //           const produto = searchResult[key] as Produto;
  //           produto["id"] = key;
  //           return <List.Item key={key}>{renderListItem(produto)}</List.Item>;
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
