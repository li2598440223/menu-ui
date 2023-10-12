import React, { useState } from 'react';
import { Menu, Input, Button } from 'antd';

const { SubMenu } = Menu;

const datas = [
  {
    key: '1',
    title: '菜单一',
    children: [
      {
        key: '1-1',
        title: '子菜单1-1',
      },
      {
        key: '1-2',
        title: '子菜单1-2',
      },
    ],
  },
  {
    key: '2',
    title: '菜单二',
    children: [
      {
        key: '2-1',
        title: '子菜单2-1',
      },
      {
        key: '2-2',
        title: '子菜单2-2',
      },
    ],
  },
];

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [editedMenu, setEditedMenu] = useState('');
  const [datasState, setdatasState] = useState(datas);

  const handleMenuSelect = ({ key }) => {
    setSelectedMenu(key);
  };

  const handleSave = () => {
    if (selectedMenu) {
      const updateddatas = datasState.map((menu) => {
        const updatedChildren = menu.children.map((childMenu) => {
          if (childMenu.key === selectedMenu) {
            return {
              ...childMenu,
              title: editedMenu || childMenu.title,
            };
          }
          return childMenu;
        });

        return {
          ...menu,
          children: updatedChildren,
        };
      });

      setdatasState(updateddatas);

      setEditedMenu('');
    }
  };

  return (
    <div>
      <div style={{ width: '200px', float: 'left' }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={handleMenuSelect}
        >
          {datasState.map((menu) => (
            <SubMenu key={menu.key} title={menu.title}>
              {menu.children.map((childMenu) => (
                <Menu.Item key={childMenu.key}>{childMenu.title}</Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </div>
      <div style={{ marginLeft: '220px' }}>
        <Input
          value={editedMenu}
          onChange={(e) => setEditedMenu(e.target.value)}
        />
        <Button type="primary" onClick={handleSave}>
          保存
        </Button>
        <div>当前菜单名称：{selectedMenu}</div>
      </div>
    </div>
  );
};

export default App;