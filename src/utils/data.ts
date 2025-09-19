import { GoProjectRoadmap } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import type { SideMenuItem } from "./interface";

export const SIDE_MENU_DATA: SideMenuItem[] = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/",
    },
    {
        id: "02",
        label: "Add Book",
        icon: GoProjectRoadmap,
        path: "/add-book",
    },
];


export const STATUS_DATA = [
    { label: "Available", value: "Available" },
    { label: "Issued", value: "Issued" },
]