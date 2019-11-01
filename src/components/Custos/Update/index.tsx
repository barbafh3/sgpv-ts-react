import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Custo } from "../../../store/custos/types";
import { AppState } from "../../../store";
import history from "../../../history";
import { updateCusto } from "../../../store/custos/actions";
import { Container } from "semantic-ui-react";
import { titleCss, formCss } from "../../css";
import CustoForm from "../Form";
import _ from "lodash";

const CustoUpdate: React.FC = () => {
  const dispatch = useDispatch();
  const custo = useSelector((state: AppState) => state.custos.custo) as Custo;

  useEffect(() => {
    if (!custo) {
      history.push("/");
    }
  }, [dispatch, custo]);

  const onSubmit = async (formValues: any) => {
    await dispatch(updateCusto(formValues));
    history.push("/custo");
  };

  if (custo) {
    return (
      <Container style={formCss}>
        <h1 style={titleCss}>Editar Custo</h1>
        <CustoForm
          onSubmit={onSubmit}
          initialValues={_.pick(custo, "id", "produtoId", "materialId", "qtde")}
        />
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default CustoUpdate;
