import React from "react";
import { useDispatch } from "react-redux";
import { saveProduto } from "../../../store/produto/actions";
import history from "../../../history";
import { Container } from "semantic-ui-react";
import { formCss, titleCss } from "../../css";
import ProdutoForm from "../Form";

const ProdutoNew: React.FC = () => {
  const dispatch = useDispatch();

  const onSubmit = async (formValues: any) => {
    await dispatch(saveProduto(formValues));
    history.push("/produto");
  };

  return (
    <Container style={formCss}>
      <h1 style={titleCss}>Novo Produto</h1>
      <ProdutoForm onSubmit={onSubmit} />
    </Container>
  );
};

export default ProdutoNew;
