import React from "react";
import { Router, Route } from "react-router";

import history from "../history";
import MaterialShow from "./material/Show";
import MaterialNew from "./material/New";
import Header from "./Header";
import MaterialSearch from "./material/Search";
import Main from "./Main";
import { Container } from "semantic-ui-react";

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Container>
        <Header />
        <Route path="/" exact component={Main} />
        <Route path="/material" exact component={MaterialShow} />
        <Route path="/material/novo" exact component={MaterialNew} />
        <Route path="/material/pesquisar" exact component={MaterialSearch} />
      </Container>
    </Router>
  );
};

export default App;
