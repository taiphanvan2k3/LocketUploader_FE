import React from "react";
import TippyHeadless from "@tippyjs/react/headless";
import styles from "./Help.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Help = () => (
    <div>
        <TippyHeadless
            render={(attrs) => (
                <div className={cx("wrapper")} tabIndex="-1" {...attrs}>
                    <p className={cx("content")}>
                        Currently, my website serves images less than{" "}
                        <b> 1MB </b> and videos less than <b>10 MB</b> and and
                        doesn't exceed {""}
                        <b>
                            1&nbsp;minute.
                            <br />
                        </b>{" "}
                        Show you can access{" "}
                        <a
                            className={cx("link")}
                            href="https://tinypng.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            this page
                        </a>
                        <span> to compress the PNG and JPEG files.</span>
                        <br />
                        <span>
                            Or use{" "}
                            <a
                                className={cx("link")}
                                href="https://www.freeconvert.com/video-compressor"
                                target="_blank"
                                rel="noreferrer"
                            >
                                this page
                            </a>{" "}
                            to compress both image and video.
                        </span>
                    </p>
                </div>
            )}
            interactive
            delay={[100, 500]}
            // offset={[25, 10]}
            placement="top-start"
            hideOnClick={false}
        >
            <div className={cx("help-me")}>Help me</div>
        </TippyHeadless>
    </div>
);

export default Help;
