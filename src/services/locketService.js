import axios from "axios";
import constants from "./constants";
import * as miscFuncs from "~/helper/misc-functions";

export const login = async (email, password, onPleaseWait) => {
    const timeOutId = setTimeout(() => {
        onPleaseWait();
    }, 5000);

    try {
        const res = await axios.post(constants.apiRoutes.LOGIN_URL, {
            email,
            password,
        });

        clearTimeout(timeOutId);
        return res.data;
    } catch (error) {
        clearTimeout(timeOutId);
        return null;
    }
};

export const uploadMedia = async (file, caption, onPleaseWait) => {
    let timeOutId;
    try {
        const user = JSON.parse(miscFuncs.getCookie("user"));
        const formData = new FormData();

        if (file.type.includes("image")) {
            formData.append("images", file);
            timeOutId = setTimeout(() => {
                onPleaseWait();
            }, 5000);
        } else if (file.type.includes("video")) {
            formData.append("videos", file);
            timeOutId = setTimeout(() => {
                onPleaseWait();
            }, 10000);
        }

        formData.append("caption", caption);
        formData.append("userId", user.localId);
        formData.append("idToken", user.idToken);

        const res = await axios.post(
            constants.apiRoutes.UPLOAD_MEDIA_URL,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        clearTimeout(timeOutId);
        return res.data;
    } catch (error) {
        clearTimeout(timeOutId);
        throw error;
    }
};
