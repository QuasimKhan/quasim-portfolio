import AppRoutes from "@/routes";
import { Toaster } from "./components/ui/sonner";

const App = () => {
    return (
        <>
            <AppRoutes />
            <Toaster richColors />
        </>
    );
};

export default App;
