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

export interface Books {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: string;
  status: string;
  publishedDate: string;
  pages: number;
  language: string;
  available: boolean;
}