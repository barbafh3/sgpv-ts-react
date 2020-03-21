import { ClienteRoutes } from "./cliente/types";
import { MaterialRoutes } from "./material/types";
import { ProdutoRoutes } from "./produto/types";
import { CustoRoutes } from "./custos/types";

export enum MainRoutes {
  HOME = "/"
}

export type AppRoutes =
  | MainRoutes
  | ClienteRoutes
  | MaterialRoutes
  | ProdutoRoutes
  | CustoRoutes;
