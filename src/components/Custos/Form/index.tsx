import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, FormErrors, InjectedFormProps, reduxForm } from "redux-form";
import { Button, Form } from "semantic-ui-react";
import { requestHandler } from "../../../services/nodeDbApi";
import { AppState } from "../../../store";
import { Custo, CustoActionTypes } from "../../../store/custos/types";
import { Material } from "../../../store/material/types";
import { Produto } from "../../../store/produto/types";

interface FormProps {
  onSubmit: (data: Custo) => void;
}

const CustoForm: React.FC<FormProps &
  InjectedFormProps<Custo, FormProps>> = props => {
  const dispatch = useDispatch();
  const produto = useSelector(
    (state: AppState) => state.produtos.produto
  ) as Produto;
  const produtoOptions = useSelector(
    (state: AppState) => state.custos.produtoOptions
  );
  const materialOptions = useSelector(
    (state: AppState) => state.custos.materialOptions
  );
  // const selectedId = useSelector((state: AppState) => state.custos.selectedId);

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
        <h2>Produto: {produto.nome}</h2>
        <Form onSubmit={props.handleSubmit(props.onSubmit)}>
          <Form.Field>
            <Field name="id" component="input" hidden />
          </Form.Field>
          <Form.Field>
            <Field name="ProdutoId" component="input" hidden />
          </Form.Field>
          {/* <Form.Field>
            <label>Produto:</label>
            <Field name="ProdutoId" component="select" value={selectedId}>
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
          </Form.Field> */}
          <Form.Field>
            <label>Material:</label>
            <Field name="MaterialId" component="select">
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
            <Field name="quantidade" component="input" />
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
