import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Produto } from "../../../store/produto/types";
import history from "../../../history";
import { updateProduto } from "../../../store/produto/actions";
import { Container } from "semantic-ui-react";
import { formCss, titleCss } from "../../css";
import ProdutoForm from "../Form";
import _ from "lodash";

const ProdutoUpdate: React.FC = () => {
  const dispatch = useDispatch();
  const produto = useSelector(
    (state: AppState) => state.produtos.produto
  ) as Produto;

  useEffect(() => {
    if (!produto) {
      history.push("/");
    }
  }, [dispatch, produto]);

  const onSubmit = async (formValues: any) => {
    await dispatch(updateProduto(formValues));
    history.push("/produto");
  };

  if (produto) {
    return (
      <Container style={formCss}>
        <h1 style={titleCss}>Editar Produto</h1>
        <ProdutoForm
          onSubmit={onSubmit}
          initialValues={_.pick(
            produto,
            "id",
            "nome",
            "maoDeObra",
            "descricao"
          )}
        />
      </Container>
    );
  }

  return <div>kk</div>;
};

export default ProdutoUpdate;
