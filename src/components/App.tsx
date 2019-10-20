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
        <Route path="/cliente/alterar" exact component={ClienteUpdate} />
      </Container>
    </Router>
  );
};

export default App;
