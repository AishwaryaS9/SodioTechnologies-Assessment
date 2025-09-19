import { useState } from 'react';
import SideMenu from './SideMenu';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import type { LayoutProps } from '../../utils/interface';

const Navbar = ({ activeMenu }: LayoutProps) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <nav
            className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 fixed top-0 left-0 right-0 z-30"
            role="navigation"
            aria-label="Main navigation bar">
            <button
                className="block lg:hidden text-black"
                onClick={() => setOpenSideMenu(!openSideMenu)}
                aria-controls="mobile-side-menu"
                aria-expanded={openSideMenu}
                aria-label={openSideMenu ? "Close sidebar menu" : "Open sidebar menu"}
            >
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl" aria-hidden="true" />
                ) : (
                    <HiOutlineMenu className="text-2xl" aria-hidden="true" />
                )}
            </button>
            <h1 className="text-xl font-bold text-gray-800 select-none">
                Book Management App
            </h1>
            {openSideMenu && (
                <div
                    id="mobile-side-menu"
                    className="fixed top-[61px] -ml-4 bg-white shadow-lg"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Sidebar navigation menu"
                >
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
