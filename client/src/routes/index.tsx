import { Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";

import HomePage from "@/pages/home/home-page";
import BlogsPage from "@/features/blogs/pages/blogs-page";
import BlogDetailsPage from "@/features/blogs/pages/blog-details-page";

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
