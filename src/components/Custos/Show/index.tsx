import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Material } from "../../../store/material/types";
import history from "../../../history";
import { Container, List, Button, Icon, Divider } from "semantic-ui-react";
import { formCss, titleCss } from "../../css";
import { Produto } from "../../../store/produto/types";
import { Custo, CustoActionTypes } from "../../../store/custos/types";

const CustoShow: React.FC = () => {
  const dispatch = useDispatch();
  const materialList = useSelector(
    (state: AppState) => state.materiais.list
  ) as Material[];
  const custoList = useSelector(
    (state: AppState) => state.custos.list
  ) as Custo[];
  const produto = useSelector(
    (state: AppState) => state.produtos.produto
  ) as Produto;
  const valorTotal = useSelector(
    (state: AppState) => state.custos.valorTotal
  ) as number;

  const setValorTotal = async () => {
    let valorTotal: number = Number(produto.maoDeObra);
    materialList.forEach((material: Material) => {
      const custoMat: Custo[] = custoList.filter(
        (custo: Custo) => custo.materialId === material.id
      );
      const calc = material.valorUnt * custoMat[0].qtde;
      valorTotal += calc;
    });
    await dispatch({
      type: CustoActionTypes.SET_VALOR_TOTAL,
      payload: valorTotal
    });
  };

  useEffect(() => {
    if (!produto) {
      history.push("/");
    } else {
      (async () => {
        console.log(materialList);
        await setValorTotal();
      })();
    }
  }, [dispatch]);

  const renderMaterialItem = (material: Material) => {
    const custoAtual = custoList.filter((custo: Custo) => {
      return custo.materialId === material.id;
    });
    const totalMaterial = custoAtual[0].qtde * material.valorUnt;
    return (
      <>
        <List.Content floated="right">
          <Button icon color="red">
            <Icon name="close" />
          </Button>
        </List.Content>
        <List.Content>
          <List.Header>{material.nome}</List.Header>
          <List.Description>{`${totalMaterial} ${material.tipoMedida} - R$${material.valorUnt}/${material.tipoMedida}`}</List.Description>
        </List.Content>
      </>
    );
  };

  if (produto && materialList) {
    return (
      <Container style={formCss}>
        <h1 style={titleCss}>{produto.nome}</h1>
        <List divided>
          {materialList.map(material => {
            return (
              <List.Item key={material.id}>
                {renderMaterialItem(material as Material)}
              </List.Item>
            );
          })}
          <List.Item key={produto.id}>
            <List.Content>
              <List.Header>Mão de Obra</List.Header>
              <List.Description>{`R$${produto.maoDeObra}`}</List.Description>
            </List.Content>
          </List.Item>
        </List>
        <Divider />
        <div>Valor Total: R${valorTotal}</div>
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default CustoShow;
