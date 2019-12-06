import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Material } from "../../../store/material/types";
import history from "../../../history";
import { Container, Button, Icon, Table } from "semantic-ui-react";
import { titleCss, tableCss } from "../../css";
import { Produto } from "../../../store/produto/types";
import { Custo, CustoActionTypes } from "../../../store/custos/types";
import {
  getMateriaisCusto,
  getCustosProduto,
  deleteCusto,
  clearMaterialList,
  clearCustoList
} from "../../../store/custos/actions";
import { currencyFormat } from "../../../services/utils";

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
    let newValorTotal: number = Number(produto.maoDeObra);
    await new Promise(() => {
      materialList.forEach(async (material: Material) => {
        const custoMat: Custo[] = custoList.filter(
          (custo: Custo) => custo.MaterialId === material.id
        );
        const calc = material.valorUnt * custoMat[0].quantidade;
        newValorTotal += calc;
      });
    });
    await new Promise(() =>
      dispatch({
        type: CustoActionTypes.SET_VALOR_TOTAL,
        payload: newValorTotal
      })
    );
  }, [dispatch, custoList, materialList, produto]);

  useEffect(() => {
    if (!produto) {
      history.push("/");
    } else {
      (async () => {
        if (custoList.length === 0) {
          await new Promise(() => dispatch(getCustosProduto(produto.id)));
        }
        if (materialList.length === 0) {
          await new Promise(() => dispatch(getMateriaisCusto(produto.id)));
        }
      })();
    }
  }, [dispatch, produto, custoList, materialList]);

  useEffect(() => {
    if (!produto) {
      history.push("/");
    } else {
      (async () => {
        await new Promise(() => setValorTotal());
      })();
    }
  }, [produto, setValorTotal]);

  const onRemoveClick = async (id: number) => {
    await dispatch(deleteCusto(id));
    await dispatch(getMateriaisCusto(produto.id));
    await dispatch(getCustosProduto(produto.id));
    await setValorTotal();
  };

  const renderMaterialItem = (material: Material) => {
    const custoAtual = custoList.filter((custo: Custo) => {
      return custo.MaterialId === material.id;
    });
    return (
      <Table.Row key={material.id}>
        <Table.Cell>{material.nome}</Table.Cell>
        <Table.Cell>{`${custoAtual[0].quantidade} ${material.tipoMedida}`}</Table.Cell>
        <Table.Cell>{currencyFormat(material.valorUnt, 3)}</Table.Cell>
        <Table.Cell>
          {currencyFormat(custoAtual[0].quantidade * material.valorUnt, 2)}
        </Table.Cell>
        <Table.Cell>
          <Button
            onClick={() => onRemoveClick(Number(custoAtual[0].id))}
            icon
            color="red"
          >
            <Icon name="close" />
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const onSendToCartClick = () => {};

  const onAddCustoClick = () => {
    dispatch(clearMaterialList());
    dispatch(clearCustoList());
    history.push("/custo/novo");
  };

  const onBackClick = () => {
    history.goBack();
  };

  if (produto && materialList && valorTotal) {
    return (
      <Container style={tableCss}>
        <h1 style={titleCss}>{produto.nome}</h1>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Material</Table.HeaderCell>
              <Table.HeaderCell>Quantidade</Table.HeaderCell>
              <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
              <Table.HeaderCell>Valor Total</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {materialList.map((material: Material) => {
              return renderMaterialItem(material as Material);
            })}
            <Table.Row>
              <Table.Cell>Mão de Obra</Table.Cell>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>-</Table.Cell>
              <Table.Cell>{currencyFormat(produto.maoDeObra, 2)}</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <b>Custo Total</b>
              </Table.Cell>
              <Table.Cell>{currencyFormat(valorTotal, 2)}</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <b>Valor de Venda</b>
              </Table.Cell>
              <Table.Cell>{currencyFormat(valorTotal * 1.3, 2)}</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button primary floated="right" onClick={onBackClick}>
          Voltar
        </Button>
        <Button positive floated="right" onClick={onAddCustoClick}>
          Adicionar material ao custo
        </Button>
        <Button primary floated="right" onClick={onSendToCartClick}>
          Adicionar ao carrinho
        </Button>
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default CustoShow;
