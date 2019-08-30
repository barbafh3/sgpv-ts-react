import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { updateMaterial } from "../../store/material/actions";
import MaterialForm from "./Form";
import { AppState } from "../../store";
import { Material } from "../../store/material/types";
import history from "../../history";

const MaterialUpdate = () => {
  const dispatch = useDispatch();
  const material = useSelector(
    (state: AppState) => state.materials.material
  ) as Material;

  useEffect(() => {
    if (!material) {
      history.push("/");
    }
  }, [dispatch]);

  const onSubmit = async (formValues: any) => {
    await dispatch(updateMaterial(formValues));
    history.push("/material");
  };

  if (material) {
    return (
      <div>
        <h1>Novo Material</h1>
        <MaterialForm
          onSubmit={onSubmit}
          initialValues={_.pick(
            material,
            "nome",
            "valorUnt",
            "tipoMedida",
            "descricao"
          )}
        />
      </div>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default MaterialUpdate;
