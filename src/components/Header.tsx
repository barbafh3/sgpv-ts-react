import React, { useEffect } from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import history from "../history";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const onHomeClick = () => {
    history.push("/");
  };

  return (
    <>
      <Menu>
        <Menu.Item header onClick={onHomeClick}>
          SGPV
        </Menu.Item>
        <Dropdown item text="Material">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name="plus" />
              <Link to="/material/novo">Novo</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon name="search" />
              <Link to="/material/pesquisar">Pesquisar</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Clientes">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name="plus" />
              <Link to="/cliente/novo">Novo</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon name="search" />
              <Link to="/cliente/pesquisar">Pesquisar</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Produtos">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name="plus" />
              <Link to="/produto/novo">Novo</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Icon name="search" />
              <Link to="/produto/pesquisar">Pesquisar</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Custos">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name="search" />
              <Link to="/custo/pesquisar">Pesquisar</Link>
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
