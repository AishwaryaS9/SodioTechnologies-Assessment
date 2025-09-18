import type { LayoutProps } from '../../utils/interface';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header role="banner" aria-label="Dashboard navigation bar">
                <Navbar activeMenu={activeMenu} />
            </header>

            <div className="flex flex-1">
                <aside
                    className="max-[1080px]:hidden"
                    role="navigation"
                    aria-label="Sidebar menu"
                >
                    <SideMenu activeMenu={activeMenu} />
                </aside>

                <main
                    role="main"
                    aria-label="Dashboard main content"
                    className="grow mx-5 focus:outline-none"
                    tabIndex={-1}
                >
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
