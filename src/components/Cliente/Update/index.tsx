import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "semantic-ui-react";
import _ from "lodash";

import ClienteForm from "../Form";
import { formCss, titleCss } from "../../css";
import { updateCliente } from "../../../store/cliente/actions";
import { AppState } from "../../../store";
import history from "../../../history";

const ClienteUpdate = () => {
  const dispatch = useDispatch();
  const cliente = useSelector((state: AppState) => state.clientes.cliente);

  useEffect(() => {
    if (!cliente) {
      history.push("/");
    }
  }, [dispatch, cliente]);

  const onSubmit = async (formValues: any) => {
    await dispatch(updateCliente(formValues));
    history.push("/cliente");
  };

  if (cliente) {
    return (
      <Container style={formCss}>
        <h1 style={titleCss}>Alterar Cliente</h1>
        <ClienteForm
          onSubmit={onSubmit}
          initialValues={_.pick(
            cliente,
            "id",
            "nome",
            "telefone",
            "email",
            "endereco",
            "bairro",
            "cidade",
            "observacoes"
          )}
        />
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default ClienteUpdate;
