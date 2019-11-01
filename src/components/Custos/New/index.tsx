import React from "react";
import { useDispatch } from "react-redux";
import { saveCusto } from "../../../store/custos/actions";
import history from "../../../history";
import { formCss, titleCss } from "../../css";
import { Container } from "semantic-ui-react";
import CustoForm from "../Form";

const CustoNew: React.FC = () => {
  const dispatch = useDispatch();

  const onSubmit = async (formValues: any) => {
    await dispatch(saveCusto(formValues));
    history.push("/custo");
  };

  return (
    <Container style={formCss}>
      <h1 style={titleCss}>Novo Custo</h1>
      <CustoForm onSubmit={onSubmit} />
    </Container>
  );
};

export default CustoNew;
