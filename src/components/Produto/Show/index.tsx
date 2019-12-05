import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Produto } from "../../../store/produto/types";
import history from "../../../history";
import { Container, Card, Button } from "semantic-ui-react";
import { cardCss } from "../../css";

const ProdutoShow: React.FC = () => {
  const dispatch = useDispatch();
  const produto = useSelector(
    (state: AppState) => state.produtos.produto
  ) as Produto;

  useEffect(() => {
    if (!produto) {
      history.push("/");
    }
    return () => {
      // dispatch(clearProduto());
    };
  }, [dispatch, produto]);

  const onBackClick = () => {
    history.goBack();
  };

  const onShowCustoClick = async () => {
    // if (produto) {
    // }
    //await sleep(1500);
    history.push("/custo");
  };

  if (produto) {
    return (
      <Container style={cardCss}>
        <Card
          header={produto.nome}
          meta={`R$ ${produto.maoDeObra}`}
          description={produto.descricao}
        />
        <Button primary floated="right" onClick={onShowCustoClick}>
          Ver Custo
        </Button>
        <Button primary floated="right" onClick={onBackClick}>
          Voltar
        </Button>
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default ProdutoShow;
