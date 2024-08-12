import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { routes } from "~/routes";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {routes.map((route, _) => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component />}
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
