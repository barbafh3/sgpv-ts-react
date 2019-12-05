import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import history from "../../../history";
import { clearCliente } from "../../../store/cliente/actions";
import { Cliente } from "../../../store/cliente/types";
import { cardCss } from "../../css";
import { Container, Card, Button } from "semantic-ui-react";

const ClienteShow: React.FC = () => {
  const dispatch = useDispatch();
  const cliente = useSelector(
    (state: AppState) => state.clientes.cliente
  ) as Cliente;

  useEffect(() => {
    if (!cliente) {
      history.push("/");
    }
    return () => {
      dispatch(clearCliente());
    };
  }, [dispatch, cliente]);

  const onBackClick = () => {
    history.goBack();
  };

  const getDescription = (cli: Cliente) => {
    let description: string = "Endereço:";
    if (cli.endereco) {
      description += " " + cli.endereco;
    }
    if (cli.bairro) {
      description += " " + cli.bairro;
    }
    if (cli.cidade) {
      description += " " + cli.cidade;
    }
    return description;
  };

  if (cliente) {
    return (
      <Container style={cardCss}>
        <Card
          header={cliente.nome}
          meta={`${cliente.telefone} - ${cliente.email}`}
          description={getDescription(cliente)}
        />
        <Button primary floated="right" onClick={onBackClick}>
          Voltar
        </Button>
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default ClienteShow;
