// context/MenuContext.tsx
// Shares the chef's menu items across every screen (Home, Add, List, Detail/Update)
// so all four screens stay in sync without prop drilling.

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Course = 'Starter' | 'Main Course' | 'Dessert';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: Course;
  price: number;
}

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  getMenuItem: (id: string) => MenuItem | undefined;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: Date.now().toString() };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const updateMenuItem = (updated: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getMenuItem = (id: string) => menuItems.find((item) => item.id === id);

  return (
    <MenuContext.Provider
      value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem, getMenuItem }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
