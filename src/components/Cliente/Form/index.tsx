import React from "react";
import { InjectedFormProps, Field, FormErrors, reduxForm } from "redux-form";
import { Cliente } from "../../../store/cliente/types";
import { Form, Button } from "semantic-ui-react";

interface FormProps {
  onSubmit: (data: Cliente) => void;
}

const ClienteForm: React.FC<
  FormProps & InjectedFormProps<Cliente, FormProps>
> = props => {
  return (
    <div>
      <Form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Form.Field>
          <Field name="id" component="input" hidden />
        </Form.Field>
        <Form.Field>
          <label>Nome</label>
          <Field name="nome" component="input" />
        </Form.Field>
        <Form.Field>
          <label>E-mail</label>
          <Field name="email" component="input" />
        </Form.Field>
        <Form.Field>
          <label>Telefone</label>
          <Field name="telefone" component="input" />
        </Form.Field>
        <Form.Field>
          <label>Endereço</label>
          <Field name="endereco" component="input" />
        </Form.Field>
        <Form.Field>
          <label>Bairro</label>
          <Field name="bairro" component="input" />
        </Form.Field>
        <Form.Field>
          <label>Cidade</label>
          <Field name="cidade" component="input" />
        </Form.Field>
        <Form.Field>
          <label>Observações</label>
          <Field name="observacoes" component="textarea" />
        </Form.Field>
        <Button primary floated="right">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

const validateFields = (
  formValues: Readonly<Cliente>
): FormErrors<FormData> => {
  let errors = {};
  return errors;
};

export default reduxForm<Cliente, FormProps>({
  form: "clienteForm",
  validate: validateFields
})(ClienteForm);
