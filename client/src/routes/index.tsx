import { Route, Routes } from "react-router-dom";

import MainLayout from "@/layouts/main-layout";

import HomePage from "@/pages/home/home-page";

import BlogsPage from "@/features/blogs/pages/blogs-page";

import BlogDetailsPage from "@/features/blogs/pages/blog-details-page";

import CreateBlogPage from "@/features/admin/pages/create-blog-page";

import EditBlogPage from "@/features/admin/pages/edit-blog-page";
import ProjectsPage from "@/features/projects/pages/projects-page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />

                <Route path="/blogs" element={<BlogsPage />} />

                <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />

                {/* Admin Routes */}
                <Route
                    path="/admin/blogs/create"
                    element={<CreateBlogPage />}
                />

                <Route
                    path="/admin/blogs/:id/edit"
                    element={<EditBlogPage />}
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
