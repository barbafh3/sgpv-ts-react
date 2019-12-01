import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Material } from "../../../store/material/types";
import history from "../../../history";
import { Container, List, Button, Icon, Divider } from "semantic-ui-react";
import { formCss, titleCss } from "../../css";
import { Produto } from "../../../store/produto/types";
import { Custo, CustoActionTypes } from "../../../store/custos/types";
import {
  getMateriaisCusto,
  getCustosProduto
} from "../../../store/custos/actions";

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

  const setValorTotal = useCallback(async () => {
    let valorTotal: number = Number(produto.maoDeObra);
    await materialList.forEach(async (material: Material) => {
      const custoMat: Custo[] = await custoList.filter(
        (custo: Custo) => custo.MaterialId === material.id
      );
      const calc = material.valorUnt * custoMat[0].quantidade;
      console.log("Material VU: " + material.valorUnt);
      console.log("Quantidade: " + custoMat[0].quantidade);
      console.log("Calc: " + calc);
      valorTotal += calc;
    });
    console.log("Total: " + valorTotal);
    await dispatch({
      type: CustoActionTypes.SET_VALOR_TOTAL,
      payload: valorTotal
    });
  }, [dispatch, custoList, materialList, produto]);

  useEffect(() => {
    if (!produto) {
      history.push("/");
    } else {
      (async () => {
        if (custoList.length === 0) {
          await dispatch(getCustosProduto(produto.id));
        }
        if (materialList.length === 0) {
          await dispatch(getMateriaisCusto(produto.id));
        }
      })();
    }
  }, [dispatch, produto, custoList, materialList]);

  useEffect(() => {
    (async () => {
      await setValorTotal();
    })();
  }, [valorTotal, setValorTotal]);

  const renderMaterialItem = (material: Material) => {
    const custoAtual = custoList.filter((custo: Custo) => {
      return custo.MaterialId === material.id;
    });
    const custoMaterial = custoAtual[0].quantidade * material.valorUnt;
    return (
      <>
        <List.Content floated="right">
          <Button icon color="red">
            <Icon name="close" />
          </Button>
        </List.Content>
        <List.Content>
          <List.Header>{material.nome}</List.Header>
          <List.Description>{`${custoAtual[0].quantidade} X R$${material.valorUnt}/${material.tipoMedida} - R$ ${custoMaterial}`}</List.Description>
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
        <div>Custo Total: R${valorTotal}</div>
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }

  // if (produto && materialList) {
  //   return (
  //     <Container style={formCss}>
  //       <h1 style={titleCss}>{produto.nome}</h1>
  //       <List divided>
  //         {materialList.map(material => {
  //           return (
  //             <List.Item key={material.id}>
  //               {renderMaterialItem(material as Material)}
  //             </List.Item>
  //           );
  //         })}
  //         <List.Item key={produto.id}>
  //           <List.Content>
  //             <List.Header>Mão de Obra</List.Header>
  //             <List.Description>{`R$${produto.maoDeObra}`}</List.Description>
  //           </List.Content>
  //         </List.Item>
  //       </List>
  //       <Divider />
  //       <div>Valor Total: R${valorTotal}</div>
  //     </Container>
  //   );
  // } else {
  //   return <div>Carregando...</div>;
  // }
};

export default CustoShow;
