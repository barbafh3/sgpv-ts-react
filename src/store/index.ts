import { createStore, combineReducers, Store, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import materialReducer from "./material";
import clienteReducer from "./cliente";
import principalReducer from "./principal";
import produtoReducer from "./produto";
import custosReducer from "./custos";
import { MaterialState } from "./material/types";
import { PrincipalState } from "./principal/types";
import { ClienteState } from "./cliente/types";
import { ProdutoState } from "./produto/types";
import { CustoState } from "./custos/types";

export interface AppState {
  materiais: MaterialState;
  clientes: ClienteState;
  principal: PrincipalState;
  produtos: ProdutoState;
  custos: CustoState;
}

const reducers = combineReducers({
  materiais: materialReducer,
  clientes: clienteReducer,
  produtos: produtoReducer,
  custos: custosReducer,
  principal: principalReducer,
  form: formReducer
});

const store: Store<AppState> = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
