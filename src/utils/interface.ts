import type { ReactNode } from "react";
import type { IconType } from "react-icons";

export interface LayoutProps {
  children?: ReactNode;
  activeMenu: string;
}

export interface SideMenuItem {
  id: string;
  label: string;
  icon: IconType;
  path: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectDropdownProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}


export interface Books {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number | string | null;
  status: string;
  pages: number;
  language: string;
  available: boolean;
}

