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
  id?: string;
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

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export interface DeleteAlertProps {
  content: string;
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
}

export interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  onSuccess: () => void;
}
