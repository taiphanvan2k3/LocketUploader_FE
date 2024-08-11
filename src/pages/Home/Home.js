import React from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";

import Header from "~/components/Header";
import Upload from "~/components/Upload";
const cx = classNames.bind(styles);

const Home = () => {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("content")}>
                <Upload />
            </div>
        </div>
    );
};

export default Home;
