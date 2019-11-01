import React from "react";
import { Produto } from "../../../store/produto/types";
import { InjectedFormProps, Field, FormErrors, reduxForm } from "redux-form";
import { Form, Button } from "semantic-ui-react";

interface FormProps {
  onSubmit: (data: Produto) => void;
}

const ProdutoForm: React.FC<
  FormProps & InjectedFormProps<Produto, FormProps>
> = props => {
  return (
    <div>
      <Form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Form.Field>
          <Field name="id" component="input" hidden />
        </Form.Field>
        <Form.Field>
          <label>Nome:</label>
          <Field name="nome" component="input" />
        </Form.Field>
        <Form.Field>
          <label>Mão de Obra:</label>
          <Field name="maoDeObra" component="input" />
        </Form.Field>
        <Form.Field>
          <label>Descrição</label>
          <Field name="descricao" component="textarea" />
        </Form.Field>
        <Button primary floated="right">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

const validateFields = (
  formValues: Readonly<Produto>
): FormErrors<FormData> => {
  let errors = {};
  return errors;
};

export default reduxForm<Produto, FormProps>({
  form: "produtoForm",
  validate: validateFields
})(ProdutoForm);
