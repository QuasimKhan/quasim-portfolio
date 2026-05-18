import { Outlet } from "react-router-dom";

import Footer from "@/components/common/footer";
import Navbar from "@/components/navigation/navbar";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <Outlet />

            <Footer />
        </div>
    );
};

export default MainLayout;
