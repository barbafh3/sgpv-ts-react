import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fbDatabase from "../../../services/firebaseConfig";
import { AppState } from "../../../store";
import { Material, MaterialActionTypes } from "../../../store/material/types";
import history from "../../../history";
import { Container, List } from "semantic-ui-react";
import { formCss, titleCss } from "../../css";
import { Produto, ProdutoActionTypes } from "../../../store/produto/types";
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
  const query = useSelector((state: AppState) => state.custos.query) as string;

  const getProduto = () => {
    fbDatabase
      .ref()
      .child(`produto/${query}`)
      .on("value", snapshot => {
        const raw = snapshot.val();
        const keys = Object.keys(raw);
        keys.map((key: string) => {
          const produto: Produto = {
            id: key,
            nome: raw[key].nome,
            maoDeObra: raw[key].maoDeObra,
            descricao: raw[key].descricao
          };
          dispatch({
            type: ProdutoActionTypes.SET_PRODUTO,
            payload: produto
          });
        });
      });
  };

  const getMaterialList = async () => {
    if (produto) {
      const custosRef = fbDatabase.ref().child("custos");
      const materialRef = fbDatabase.ref().child("materiais");
      let newMaterialList: Material[] = [];
      let materialIdList: string[] = [];
      let newCustoList: Custo[] = [];
      await custosRef
        .orderByChild("produtoId")
        .equalTo(query)
        .on("child_added", snapshot => {
          const raw = snapshot.val();
          const keys = Object.keys(raw);
          keys.map((key: string) => {
            materialIdList.push(raw[key].materialId);
            const custo: Custo = {
              id: key,
              materialId: raw[key].materialId,
              produtoId: raw[key].produtoId,
              qtde: raw[key].qtde
            };
            newCustoList.push(custo);
          });
        });
      await materialIdList.map((id: string) => {
        materialRef.equalTo(id).on("value", snapshot => {
          const raw = snapshot.val();
          const keys = Object.keys(raw);
          keys.map((key: string) => {
            const material: Material = {
              id: key,
              nome: raw[key].nome,
              valorUnt: raw[key].valorUnt,
              tipoMedida: raw[key].tipoMedida,
              descricao: raw[key].descricao
            };
            newMaterialList.push(material);
          });
        });
      });
      dispatch({
        type: MaterialActionTypes.SET_MATERIAL_LIST,
        payload: newMaterialList
      });
      dispatch({
        type: CustoActionTypes.SET_CUSTO_LIST,
        payload: newCustoList
      });
    }
  };

  useEffect(() => {
    if (!query) {
      history.push("/");
    } else {
      getProduto();
      getMaterialList();
    }
  }, [dispatch]);

  const renderMaterialItem = (material: Material) => {
    const custoAtual = custoList.filter((custo: Custo) => {
      return custo.materialId == material.id;
    });
    const valorTotal = custoAtual[0].qtde * material.valorUnt;
    return (
      <>
        <List.Content>
          <List.Header>{material.nome}</List.Header>
          <List.Description>{valorTotal}</List.Description>
        </List.Content>
      </>
    );
  };

  const renderMaterialList = () => {
    if (materialList) {
      <List divided>
        {materialList.map((material: Material) => {
          return (
            <List.Item key={material.id}>
              {renderMaterialItem(material)}
            </List.Item>
          );
        })}
      </List>;
    }
  };

  if (produto) {
    return (
      <Container style={formCss}>
        <h1 style={titleCss}>{produto.nome}</h1>
        {renderMaterialList()}
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default CustoShow;
