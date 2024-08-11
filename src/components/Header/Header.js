import React from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import images from "~/assets/images";
const cx = classNames.bind(styles);

const Header = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("logo-wrapper")}>
                <img src={images.logo} alt="logo" className={cx("logo")} />
                <h1>Locket uploader</h1>
            </div>
        </div>
    );
};

export default Header;
