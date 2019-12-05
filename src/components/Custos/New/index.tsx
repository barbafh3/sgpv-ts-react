import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCusto } from "../../../store/custos/actions";
import history from "../../../history";
import { formCss, titleCss } from "../../css";
import { Container } from "semantic-ui-react";
import CustoForm from "../Form";
import { AppState } from "../../../store";
import { Produto } from "../../../store/produto/types";

const CustoNew: React.FC = () => {
  const dispatch = useDispatch();
  const produto = useSelector(
    (state: AppState) => state.produtos.produto
  ) as Produto;

  useEffect(() => {
    if (!produto) {
      history.push("/");
    }
  }, [produto]);

  const onSubmit = async (formValues: any) => {
    await dispatch(saveCusto(formValues));
    history.push("/custo");
  };

  return (
    <Container style={formCss}>
      <h1 style={titleCss}>Novo Custo</h1>
      <CustoForm
        onSubmit={onSubmit}
        initialValues={{ ProdutoId: produto.id }}
      />
    </Container>
  );
};

export default CustoNew;
