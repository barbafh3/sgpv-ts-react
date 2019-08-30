export enum PrincipalActionTypes {
  SET_ACTIVE_ITEM = "@principal/SET_ACTIVE_ITEM"
}

export interface SetActiveItem {
  type: PrincipalActionTypes.SET_ACTIVE_ITEM;
  payload?: string;
}

export type PrincipalActions = SetActiveItem;

export interface PrincipalState {
  activeItem?: string;
}

export const initialPrincipalState = {
  activeItem: ""
};
