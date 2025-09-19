import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import type { LayoutProps, SideMenuItem } from '../../utils/interface';

const SideMenu = ({ activeMenu }: LayoutProps) => {
    const [sideMenuData, setSideMenuData] = useState<SideMenuItem[]>([]);
    const navigate = useNavigate();

    const handleClick = (route: string) => {
        navigate(route);
    };

    useEffect(() => {
        setSideMenuData(SIDE_MENU_DATA);
        return () => { };
    }, []);

    return (
        <nav
            className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20"
            aria-label="Sidebar navigation"
        >
            <ul className="flex flex-col">
                {sideMenuData.map((item, index) => {
                    const isActive = activeMenu === item.label;
                    return (
                        <li key={`menu_${index}`}>
                            <button
                                className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label
                                    ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3" : ""
                                    } py-3 px-6 mb-3 cursor-pointer`}
                                onClick={() => handleClick(item.path)}
                                aria-current={isActive ? "page" : undefined}
                                aria-label={`Go to ${item.label}`}
                            >
                                <item.icon className="text-xl" aria-hidden="true" />
                                <span>{item.label}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default SideMenu;
