import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { updateMaterial } from "../../../store/material/actions";
import MaterialForm from "../Form";
import { AppState } from "../../../store";
import { Material } from "../../../store/material/types";
import history from "../../../history";
import { Container } from "semantic-ui-react";
import { formCss, titleCss } from "../../css";

const MaterialUpdate = () => {
  const dispatch = useDispatch();
  const material = useSelector(
    (state: AppState) => state.materiais.material
  ) as Material;

  useEffect(() => {
    if (!material) {
      history.push("/");
    }
  }, [dispatch, material]);

  const onSubmit = async (formValues: any) => {
    await dispatch(updateMaterial(formValues));
    history.push("/material");
  };

  if (material) {
    return (
      <Container style={formCss}>
        <h1 style={titleCss}>Editar Material</h1>
        <MaterialForm
          onSubmit={onSubmit}
          initialValues={_.pick(
            material,
            "id",
            "nome",
            "valorUnt",
            "tipoMedida",
            "descricao"
          )}
        />
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default MaterialUpdate;
