import React, { useEffect, useCallback } from "react";
import { Custo, CustoActionTypes } from "../../../store/custos/types";
import { InjectedFormProps, Field, FormErrors, reduxForm } from "redux-form";
import { Form, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { requestHandler } from "../../../services/nodeDbApi";
import { Material } from "../../../store/material/types";
import { Produto } from "../../../store/produto/types";

interface FormProps {
  onSubmit: (data: Custo) => void;
}

const CustoForm: React.FC<
  FormProps & InjectedFormProps<Custo, FormProps>
> = props => {
  const dispatch = useDispatch();
  const produto = useSelector((state: AppState) => state.produtos.produto);
  const produtoOptions = useSelector(
    (state: AppState) => state.custos.produtoOptions
  );
  const materialOptions = useSelector(
    (state: AppState) => state.custos.materialOptions
  );
  const selectedId = useSelector((state: AppState) => state.custos.selectedId);

  const setProdutoSelect = useCallback(async () => {
    const result = await requestHandler.get("/produtos");
    dispatch({
      type: CustoActionTypes.SET_CUSTO_PRODUTO_LIST,
      payload: result.data
    });
  }, [dispatch]);

  const setMaterialSelect = useCallback(async () => {
    const result = await requestHandler.get("/materiais");
    dispatch({
      type: CustoActionTypes.SET_CUSTO_MATERIAL_LIST,
      payload: result.data
    });
  }, [dispatch]);

  useEffect(() => {
    setProdutoSelect();
    setMaterialSelect();
  }, [setProdutoSelect, setMaterialSelect]);

  if (produtoOptions && materialOptions) {
    return (
      <div>
        <Form onSubmit={props.handleSubmit(props.onSubmit)}>
          <Form.Field>
            <Field name="id" component="input" hidden />
          </Form.Field>
          <Form.Field>
            <label>Produto:</label>
            <Field
              name="produtoId"
              component="select"
              defaultValue={selectedId}
            >
              <option />
              {produtoOptions.map((prod: Produto) => {
                if (produto) {
                  console.log("Prod:" + prod.id + " - Produto: " + produto.id);
                  if (produto.id === prod.id) {
                    dispatch({
                      type: CustoActionTypes.SET_CUSTO_SELECTED_ID,
                      payload: prod.id
                    });
                    return (
                      <option value={prod.id} key={prod.id}>
                        {prod.nome}
                      </option>
                    );
                  } else {
                    return (
                      <option value={prod.id} key={prod.id}>
                        {prod.nome}
                      </option>
                    );
                  }
                } else {
                  return (
                    <option value={prod.id} key={prod.id}>
                      {prod.nome}
                    </option>
                  );
                }
              })}
            </Field>
          </Form.Field>
          <Form.Field>
            <label>Material:</label>
            <Field name="materialId" component="select">
              <option />
              {materialOptions.map((material: Material) => {
                return (
                  <option value={material.id} key={material.id}>
                    {material.nome}
                  </option>
                );
              })}
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
  } else {
    return <div>Carregando...</div>;
  }
};

const validateFields = (formValues: Readonly<Custo>): FormErrors<FormData> => {
  let erros = {};
  return erros;
};

export default reduxForm<Custo, FormProps>({
  form: "custoForm",
  validate: validateFields
})(CustoForm);
