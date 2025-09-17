import { useEffect, useState } from 'react'
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
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
            {
                sideMenuData.map((item, index) => (
                    <button key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label
                            ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3" : ""
                            } py-3 px-6 mb-3 cursor-pointer`} onClick={() => handleClick(item.path)}>
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                ))
            }
        </div >
    )
}

export default SideMenu