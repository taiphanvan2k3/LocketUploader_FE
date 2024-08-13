import React, { useContext } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import images from "~/assets/images";
import { AuthContext } from "~/contexts/AuthContext";
import UserDropdown from "../UserDropdown";
const cx = classNames.bind(styles);

const Header = () => {
    const { user } = useContext(AuthContext);

    console.log(user);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("logo-wrapper")}>
                <img src={images.logo} alt="logo" className={cx("logo")} />
                <h1>Locket uploader</h1>
            </div>

            {user && <UserDropdown userInfo={user} />}
        </div>
    );
};

export default Header;
