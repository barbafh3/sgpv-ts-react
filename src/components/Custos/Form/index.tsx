import React, { useEffect } from "react";
import { Custo, CustoActionTypes } from "../../../store/custos/types";
import { InjectedFormProps, Field, FormErrors, reduxForm } from "redux-form";
import { Form, Button } from "semantic-ui-react";
import fbDatabase from "../../../services/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";

interface FormProps {
  onSubmit: (data: Custo) => void;
}

const CustoForm: React.FC<
  FormProps & InjectedFormProps<Custo, FormProps>
> = props => {
  const dispatch = useDispatch();
  const produtoOptions = useSelector(
    (state: AppState) => state.custos.produtoOptions
  );
  const materialOptions = useSelector(
    (state: AppState) => state.custos.materialOptions
  );

  const setProdutoSelect = () => {
    fbDatabase
      .ref()
      .child("produtos")
      .on("value", snapshot => {
        const raw = snapshot.val();
        const keys = Object.keys(raw);
        const newProdutoOptions = keys.map((key: string) => (
          <option key={key} value={key}>
            {raw[key].nome}
          </option>
        ));
        dispatch({
          type: CustoActionTypes.SET_CUSTO_PRODUTO_LIST,
          payload: newProdutoOptions
        });
      });
  };

  const setMaterialSelect = () => {
    fbDatabase
      .ref()
      .child("materiais")
      .on("value", snapshot => {
        const raw = snapshot.val();
        const keys = Object.keys(raw);
        const newMaterialOptions = keys.map((key: string) => (
          <option key={key} value={key}>
            {raw[key].nome}
          </option>
        ));
        dispatch({
          type: CustoActionTypes.SET_CUSTO_MATERIAL_LIST,
          payload: newMaterialOptions
        });
      });
  };

  useEffect(() => {
    setProdutoSelect();
    setMaterialSelect();
  }, [dispatch]);

  const renderForm = () => {
    return (
      <div>
        <Form onSubmit={props.handleSubmit(props.onSubmit)}>
          <Form.Field>
            <Field name="id" component="input" hidden />
          </Form.Field>
          <Form.Field>
            <label>Produto:</label>
            <Field name="produtoId" component="select">
              <option />
              {produtoOptions}
            </Field>
          </Form.Field>
          <Form.Field>
            <label>Material:</label>
            <Field name="materialId" component="select">
              <option />
              {materialOptions}
            </Field>
          </Form.Field>
          <Form.Field>
            <label>Quantidade:</label>
            <Field name="qtde" component="input" />
          </Form.Field>
          <Button primary floated="right">
            Enviar
          </Button>
        </Form>
      </div>
    );
  };

  return <>{renderForm()}</>;
};

const validateFields = (formValues: Readonly<Custo>): FormErrors<FormData> => {
  let erros = {};
  return erros;
};

export default reduxForm<Custo, FormProps>({
  form: "custoForm",
  validate: validateFields
})(CustoForm);
