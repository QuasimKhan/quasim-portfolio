import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles/global.css";
import "@mdxeditor/editor/style.css";
import ScrollToTop from "./components/common/ScrollToTop";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ScrollToTop />
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);
