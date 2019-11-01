import React from "react";
import {
  InjectedFormProps,
  Field,
  reduxForm,
  // GenericFieldHTMLAttributes,
  // WrappedFieldProps,
  FormErrors
} from "redux-form";
import { Material } from "../../../store/material/types";
import { Form, Button } from "semantic-ui-react";

interface FormProps {
  onSubmit: (data: Material) => void;
}

const FormSelect = () => (
  <>
    <Field name="tipoMedida" component="select">
      <option></option>
      <option value="cm">cm</option>
      <option value="cm2">cm2</option>
      <option value="m">m</option>
      <option value="m2">m2</option>
      <option value="u">u</option>
    </Field>
  </>
);

const MaterialForm: React.FC<
  FormProps & InjectedFormProps<Material, FormProps>
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
          <label>Valor Unitário:</label>
          <Field name="valorUnt" component="input" />
        </Form.Field>
        <Form.Field
          label="Tipo de Medida"
          name="tipoMedida"
          control={FormSelect}
        ></Form.Field>
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
  formValues: Readonly<Material>
): FormErrors<FormData> => {
  let erros = {};
  return erros;
};

export default reduxForm<Material, FormProps>({
  form: "materialForm",
  validate: validateFields
})(MaterialForm);
