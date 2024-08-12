import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Upload.module.scss";
import classNames from "classnames/bind";
import { toast } from "react-toastify";

import { AuthContext } from "~/contexts/AuthContext";
import constants from "~/services/constants";
import images from "~/assets/images";
import LoginModal from "../Modals/Login/LoginModal";
import * as miscFuncs from "~/helper/misc-functions";
import * as lockerService from "~/services/lockerService";
const cx = classNames.bind(styles);

const Upload = () => {
    const { user, setUser } = useContext(AuthContext);

    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileRef = useRef(null);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleAfterLogin = (userInfo) => {
        setIsShowModal(false);
        setUser(userInfo.user);

        toast.success("Login successfully", {
            ...constants.toastSettings,
        });
        // Lưu vào cookie
        miscFuncs.setCookie("user", JSON.stringify(userInfo.user), 1);
    };

    const handleTriggerUploadFile = () => {
        fileRef.current.click();
    };

    const handleSelectFile = (e) => {
        const { files } = e.target;
        if (files?.length) {
            const objectUrl = URL.createObjectURL(files[0]);
            setFile(files[0]);
            setPreviewUrl(objectUrl);
        }
    };

    const handleDragOver = (e) => {
        // Ngăn chặn hành động mặc định của thẻ HTML để cho phép thả file vào
        e.preventDefault();
    };

    const handleSelectFileFromDrop = (e) => {
        e.preventDefault();
        const { files } = e.dataTransfer;
        if (files?.length) {
            const objectUrl = URL.createObjectURL(files[0]);
            setFile(files[0]);
            setPreviewUrl(objectUrl);
        }
    };

    const handleUploadFile = () => {
        if (file) {
            setIsUploading(true);
            lockerService.uploadMedia(file, caption).then((res) => {
                if (res) {
                    setPreviewUrl("");
                    setCaption("");
                    setIsUploading(false);

                    const fileType = file.type.includes("image")
                        ? "image"
                        : "video";
                    toast.success(`Upload ${fileType} successfully`, {
                        ...constants.toastSettings,
                    });
                }
            });
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("card")}>
                {user ? (
                    <>
                        <h2 className={cx("title")}>Upload image or video</h2>
                        <div className={cx("input-container")}>
                            <input
                                type="text"
                                className={cx("post-title")}
                                placeholder="Enter the title for your post"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                        </div>
                        <div
                            className={cx("upload-area")}
                            onDragOver={handleDragOver}
                            onDrop={handleSelectFileFromDrop}
                            role="button"
                            tabIndex="0"
                        >
                            {previewUrl ? (
                                <div className={cx("preview-wrapper")}>
                                    {file.type.includes("image") ? (
                                        <img
                                            src={previewUrl}
                                            alt="preview"
                                            className={cx("preview-image")}
                                        />
                                    ) : (
                                        <video
                                            src={previewUrl}
                                            alt="preview"
                                            className={cx("preview-video")}
                                            controls
                                        >
                                            <track
                                                kind="captions"
                                                src="captions.vtt"
                                                label="English"
                                            />
                                        </video>
                                    )}
                                    <button
                                        className={cx("btn-delete-preview")}
                                        onClick={() => setPreviewUrl("")}
                                    >
                                        <span>&times;</span>
                                    </button>
                                </div>
                            ) : (
                                <div className={cx("content")}>
                                    <button onClick={handleTriggerUploadFile}>
                                        <img
                                            src={images.mediaUpload}
                                            alt="upload"
                                            className={cx("upload-icon")}
                                        />
                                    </button>
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
                                            accept="image/*,video/*"
                                        />
                                    </h3>
                                </div>
                            )}
                        </div>
                        <div className={cx("actions")}>
                            <div className={cx("buttons")}>
                                <button onClick={() => setPreviewUrl("")}>
                                    Cancel
                                </button>
                                <button
                                    disabled={
                                        previewUrl && caption && !isUploading
                                            ? ""
                                            : "disable"
                                    }
                                    className={cx("btn-submit", {
                                        "is-loading": isUploading,
                                    })}
                                    onClick={handleUploadFile}
                                >
                                    <span>Submit</span>
                                    {isUploading && (
                                        <img
                                            src={images.spinner}
                                            alt="spinner"
                                            className={cx("spinner")}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={cx("no-login")}>
                        <h3>Please login to upload image or video</h3>
                        <button
                            className={cx("btn-login")}
                            onClick={() => setIsShowModal(true)}
                        >
                            Login here
                        </button>
                        <LoginModal
                            handleAfterLogin={handleAfterLogin}
                            show={isShowModal}
                            onHide={() => setIsShowModal(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Upload;
