import React from "react";

import { saveMaterial } from "../../store/material/actions";
import { useDispatch } from "react-redux";
import MaterialForm from "./Form";
import history from "../../history";
import { Container } from "semantic-ui-react";
import { formCss, titleCss } from "../css";

const MaterialNew = () => {
  const dispatch = useDispatch();

  const onSubmit = async (formValues: any) => {
    await dispatch(saveMaterial(formValues));
    history.push("/material");
  };

  return (
    <Container style={formCss}>
      <h1 style={titleCss}>Novo Material</h1>
      <MaterialForm onSubmit={onSubmit} />
    </Container>
  );
};

export default MaterialNew;
