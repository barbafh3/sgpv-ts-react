import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { SetActiveItem, PrincipalActionTypes } from "./types";

export const setActiveItem: ActionCreator<
  ThunkAction<Promise<any>, null, null, SetActiveItem>
> = (name: string) => {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: PrincipalActionTypes.SET_ACTIVE_ITEM,
      payload: name
    });
  };
};
