import React from "react";
import { useDispatch } from "react-redux";
import { Container } from "semantic-ui-react";

import ClienteForm from "../Form";
import { formCss, titleCss } from "../../css";
import { saveCliente } from "../../../store/cliente/actions";
import history from "../../../history";

const ClienteNew = () => {
  const dispatch = useDispatch();

  const onSubmit = async (formValues: any) => {
    await dispatch(saveCliente(formValues));
    history.push("/cliente");
  };

  return (
    <Container style={formCss}>
      <h1 style={titleCss}>Novo Cliente</h1>
      <ClienteForm onSubmit={onSubmit} />
    </Container>
  );
};

export default ClienteNew;
