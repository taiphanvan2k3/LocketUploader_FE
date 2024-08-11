import axios from "axios";
import constants from "./constants";
import * as miscFuncs from "~/helper/misc-functions";

export const login = async (email, password) => {
    try {
        const res = await axios.post(constants.LOGIN_URL, {
            email,
            password,
        });

        return res.data;
    } catch (error) {
        console.log("Login failed: ", error);
    }
};

export const uploadMedia = async (file, caption) => {
    try {
        const user = JSON.parse(miscFuncs.getCookie("user"));
        const formData = new FormData();
        formData.append("images", file);
        formData.append("caption", caption);
        formData.append("userId", user.localId);
        formData.append("idToken", user.idToken);

        const res = await axios.post(constants.UPLOAD_MEDIA_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    } catch (error) {
        console.log("Upload media failed: ", error);
    }
};
