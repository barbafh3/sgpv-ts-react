import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Produto } from "../../../store/produto/types";
import history from "../../../history";
import { Container, Card, Button } from "semantic-ui-react";
import { cardCss } from "../../css";

const ProdutoShow: React.FC = () => {
  const dispatch = useDispatch();
  const produto = useSelector(
    (state: AppState) => state.produtos.produto
  ) as Produto;

  useEffect(() => {
    if (!produto) {
      history.push("/");
    }
    return () => {
      // dispatch(clearProduto());
    };
  }, [dispatch, produto]);

  const onBackClick = () => {
    history.goBack();
  };

  const onShowCustoClick = async () => {
    // if (produto) {
    // }
    //await sleep(1500);
    history.push("/custo");
  };

  // const getMaterialList = async () => {
  //   if (produto) {
  //     const custosRef = fbDatabase.ref().child("custos");
  //     const materialRef = fbDatabase.ref().child("materiais");
  //     let newMaterialList: Material[] = [];
  //     let newCustoList: Custo[] = [];
  //     await custosRef
  //       .orderByChild("produtoId")
  //       .equalTo(`${produto.id}`)
  //       .on("value", snapshot => {
  //         const raw = snapshot.val();
  //         if (raw) {
  //           const keys = Object.keys(raw);
  //           keys.map(async (key: string) => {
  //             const custo: Custo = {
  //               id: key,
  //               materialId: raw[key].materialId,
  //               produtoId: raw[key].produtoId,
  //               qtde: raw[key].qtde
  //             };
  //             newCustoList.push(custo);
  //             await materialRef
  //               .child(raw[key].materialId)
  //               .on("value", snapshot => {
  //                 const materialRaw = snapshot.val();
  //                 const materialKeys = Object.keys(materialRaw);
  //                 materialKeys.map((materialKey: string) => {
  //                   const material: Material = {
  //                     id: raw[key].materialId,
  //                     nome: materialRaw.nome,
  //                     valorUnt: materialRaw.valorUnt,
  //                     tipoMedida: materialRaw.tipoMedida,
  //                     descricao: materialRaw.descricao
  //                   };
  //                   if (!newMaterialList.some(e => e.id === material.id)) {
  //                     newMaterialList.push(material);
  //                   }
  //                 });
  //               });
  //           });
  //         }
  //       });
  //     await dispatch({
  //       type: MaterialActionTypes.SET_MATERIAL_LIST,
  //       payload: newMaterialList
  //     });
  //     await dispatch({
  //       type: CustoActionTypes.SET_CUSTO_LIST,
  //       payload: newCustoList
  //     });
  //   }
  // };

  if (produto) {
    return (
      <Container style={cardCss}>
        <Card
          header={produto.nome}
          meta={`R$ ${produto.maoDeObra}`}
          description={produto.descricao}
        />
        <Button primary floated="right" onClick={onShowCustoClick}>
          Ver Custo
        </Button>
        <Button primary floated="right" onClick={onBackClick}>
          Voltar
        </Button>
      </Container>
    );
  } else {
    return <div>Carregando...</div>;
  }
};

export default ProdutoShow;
