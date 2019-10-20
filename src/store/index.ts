import { createStore, combineReducers, Store, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import materialReducer from "./material";
import clienteReducer from "./cliente";
import principalReducer from "./principal";
import { MaterialState } from "./material/types";
import { PrincipalState } from "./principal/types";
import { ClienteState } from "./cliente/types";

export interface AppState {
  materials: MaterialState;
  clientes: ClienteState;
  principal: PrincipalState;
}

const reducers = combineReducers({
  materials: materialReducer,
  clientes: clienteReducer,
  principal: principalReducer,
  form: formReducer
});

const store: Store<AppState> = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
