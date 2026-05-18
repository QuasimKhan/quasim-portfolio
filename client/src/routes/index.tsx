import { Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";

import HomePage from "@/pages/home/home-page";
import BlogsPage from "@/pages/blogs/blogs-page";
import BlogDetailsPage from "@/pages/blogs/blog-details-page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
