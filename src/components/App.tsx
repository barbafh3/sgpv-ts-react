import React from "react";
import { Router, Route } from "react-router";
import { Container } from "semantic-ui-react";

import history from "../history";
import MaterialShow from "./Material/Show";
import MaterialNew from "./Material/New";
import Header from "./Header";
import MaterialSearch from "./Material/Search";
import Main from "./Main";
import MaterialUpdate from "./Material/Update";
import ClienteNew from "./Cliente/New";
import ClienteUpdate from "./Cliente/Update";
import ClienteShow from "./Cliente/Show";
import ClienteSearch from "./Cliente/Search";
import ProdutoNew from "./Produto/New";
import ProdutoUpdate from "./Produto/Update";
import ProdutoShow from "./Produto/Show";
import ProdutoSearch from "./Produto/Search";
import CustoNew from "./Custos/New";

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Container>
        <Header />
        <Route path="/" exact component={Main} />
        <Route path="/material" exact component={MaterialShow} />
        <Route path="/material/novo" exact component={MaterialNew} />
        <Route path="/material/pesquisar" exact component={MaterialSearch} />
        <Route path="/material/editar" exact component={MaterialUpdate} />
        <Route path="/cliente" exact component={ClienteShow} />
        <Route path="/cliente/novo" exact component={ClienteNew} />
        <Route path="/cliente/editar" exact component={ClienteUpdate} />
        <Route path="/cliente/pesquisar" exact component={ClienteSearch} />
        <Route path="/produto" exact component={ProdutoShow} />
        <Route path="/produto/novo" exact component={ProdutoNew} />
        <Route path="/produto/editar" exact component={ProdutoUpdate} />
        <Route path="/produto/pesquisar" exact component={ProdutoSearch} />
        <Route path="/custo/novo" exact component={CustoNew} />
      </Container>
    </Router>
  );
};

export default App;
