import React, { useEffect } from "react";
import { clearMaterial } from "../../store/material/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import history from "../../history";
import { Card, Container } from "semantic-ui-react";
import { Material } from "../../store/material/types";
import { cardCss } from "../css";

const MaterialShow: React.FC = () => {
  const dispatch = useDispatch();
  const material = useSelector(
    (state: AppState) => state.materials.material
  ) as Material;

  useEffect(() => {
    if (!material) {
      history.push("/");
    }
    return () => {
      dispatch(clearMaterial());
    };
  }, [dispatch, material]);

  if (material) {
    return (
      <Container style={cardCss}>
        <Card
          header={material.nome}
          meta={`R$${material.valorUnt}/${material.tipoMedida}`}
          description={material.descricao}
        />
      </Container>
    );
  } else {
    return <div>Carregando</div>;
  }
};

export default MaterialShow;
