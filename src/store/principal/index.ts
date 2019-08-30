import { Reducer } from "redux";
import {
  PrincipalState,
  PrincipalActions,
  initialPrincipalState,
  PrincipalActionTypes
} from "./types";

const reducer: Reducer<PrincipalState, PrincipalActions> = (
  state = initialPrincipalState,
  action
) => {
  switch (action.type) {
    case PrincipalActionTypes.SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
