import { BrowserRouter, Route, Routes } from "react-router-dom";

import { routes } from "~/routes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
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
    );
}

export default App;
