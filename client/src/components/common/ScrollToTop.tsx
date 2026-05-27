import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Use 'next/navigation' if using Next.js

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Instantly snap to the top-left corner of the window
        window.scrollTo(0, 0);
    }, [pathname]); // Fires every single time the URL route changes

    return null; // This component doesn't render any visual UI
};

export default ScrollToTop;
