import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';

const SideMenu = ({ activeMenu }) => {
    const [sideMenuData, setSideMenuData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setSideMenuData(SIDE_MENU_DATA);
        return () => { };
    }, []);

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
            <div className="flex flex-col items-center justify-center mb-7 pt-5">
                <div className="relative">
                </div>
                <h5 className="text-gray-950 font-medium leading-6 mt-3">
                    User
                </h5>
                <p className="text-[12px] text-gray-500">user@yopmail.com</p>
            </div>
            {
                sideMenuData.map((item, index) => (
                    <button key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label
                            ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3" : ""
                            } py-3 px-6 mb-3 cursor-pointer`}>
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                ))
            }
        </div >
    )
}

export default SideMenu