import React, { useContext } from "react";
import styles from "./UserDropdown.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import TippyHeadless from "@tippyjs/react/headless";

import { deleteCookie } from "~/helper/misc-functions";
import { AuthContext } from "~/contexts/AuthContext";
const cx = classNames.bind(styles);

const UserDropdown = ({ userInfo, className }) => {
    const { setUser } = useContext(AuthContext);

    const handleLogout = () => {
        deleteCookie("user");
        setUser(null);
    };

    return (
        <div className={cx("wrapper", className)}>
            <span>Xin chào</span>
            <TippyHeadless
                render={(attrs) => (
                    <div className={cx("dropdown")} tabIndex="-1" {...attrs}>
                        <div className={cx("dropdown-item")}>
                            <button onClick={handleLogout}>Đăng xuất</button>
                        </div>
                    </div>
                )}
                interactive
                placement="bottom-end"
                delay={[100, 500]}
                hideOnClick={false}
            >
                <b className={cx("display-name")}>{userInfo?.displayName}</b>
            </TippyHeadless>
        </div>
    );
};

UserDropdown.propTypes = {
    userInfo: PropTypes.object,
    className: PropTypes.string,
};

export default UserDropdown;
