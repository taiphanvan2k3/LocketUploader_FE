import { createContext, useEffect, useState, useMemo } from "react";

import PropTypes from "prop-types";
import * as miscFuncs from "~/helper/misc-functions";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(JSON.parse(miscFuncs.getCookie("user")));
    }, []);

    return useMemo(
        () => (
            <AuthContext.Provider value={{ user, setUser }}>
                {children}
            </AuthContext.Provider>
        ),
        [children, user],
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
