import React, { useRef, useState } from "react";
import styles from "./Upload.module.scss";
import classNames from "classnames/bind";

import images from "~/assets/images";
const cx = classNames.bind(styles);

const Upload = () => {
    const fileRef = useRef(null);
    const [file, setFile] = useState(null);

    const handleTriggerUploadFile = () => {
        fileRef.current.click();
    };

    const handleSelectFile = (e) => {
        const { files } = e.target;
        if (files?.length) {
            setFile(files[0]);
        }
    };

    console.log(file);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("card")}>
                <h2 className={cx("title")}>Upload image or video</h2>
                <div className={cx("input-container")}>
                    <input
                        type="text"
                        className={cx("post-title")}
                        placeholder="Enter the title for your post"
                    />
                </div>
                <div className={cx("upload-area")}>
                    <div className={cx("content")}>
                        <img src={images.mediaUpload} alt="upload" />
                        <h3>
                            Drag and Drop file here or{" "}
                            <button
                                className={cx("underline")}
                                onClick={handleTriggerUploadFile}
                            >
                                Choose file
                            </button>
                            <input
                                type="file"
                                ref={fileRef}
                                onChange={handleSelectFile}
                            />
                        </h3>
                    </div>
                </div>
                <div className={cx("actions")}>
                    <div className={cx("buttons")}>
                        <button>Cancel</button>
                        <button disabled>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
