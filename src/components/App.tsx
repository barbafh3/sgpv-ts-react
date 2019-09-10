import React from "react";
import { Router, Route } from "react-router";
import { Container } from "semantic-ui-react";

import history from "../history";
import MaterialShow from "./material/Show";
import MaterialNew from "./material/New";
import Header from "./Header";
import MaterialSearch from "./material/Search";
import Main from "./Main";
import MaterialUpdate from "./material/Update";

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
      </Container>
    </Router>
  );
};

export default App;
