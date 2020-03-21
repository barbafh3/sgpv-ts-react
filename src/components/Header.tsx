import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

import history from "../history";
import { AppRoutes, MainRoutes } from "../store/types";
import { ClienteRoutes } from "../store/cliente/types";
import { MaterialRoutes } from "../store/material/types";
import { ProdutoRoutes } from "../store/produto/types";
import { CustoRoutes } from "../store/custos/types";

const Header: React.FC = () => {
  const onMenuItemClick = (route: AppRoutes) => {
    history.push(route);
  };

  return (
    <>
      <Menu>
        <Menu.Item header onClick={() => onMenuItemClick(MainRoutes.HOME)}>
          SGPV
        </Menu.Item>
        <Dropdown item text="Material">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onMenuItemClick(MaterialRoutes.NEW)}>
              <Icon name="plus" />
              Novo
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onMenuItemClick(MaterialRoutes.SEARCH)}
            >
              <Icon name="search" />
              Pesquisar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Clientes">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onMenuItemClick(ClienteRoutes.NEW)}>
              <Icon name="plus" />
              Novo
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onMenuItemClick(ClienteRoutes.SEARCH)}
            >
              <Icon name="search" />
              Pesquisar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Produtos">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onMenuItemClick(ProdutoRoutes.NEW)}>
              <Icon name="plus" />
              Novo
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onMenuItemClick(ProdutoRoutes.SEARCH)}
            >
              <Icon name="search" />
              Pesquisar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Custos">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onMenuItemClick(CustoRoutes.SEARCH)}>
              <Icon name="search" />
              Pesquisar
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <Menu.Item name="logout" />
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default Header;
