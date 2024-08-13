import CryptoJS from "crypto-js";

export const encryptLoginData = (email, password) => {
    const secretKey = process.env.REACT_APP_HASH_SECRET_KEY;
    const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        secretKey,
    ).toString();

    return { encryptedEmail, encryptedPassword };
};

export const decryptLoginData = (encryptedEmail, encryptedPassword) => {
    const secretKey = process.env.REACT_APP_HASH_SECRET_KEY;
    const decryptedEmail = CryptoJS.AES.decrypt(
        encryptedEmail,
        secretKey,
    ).toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        secretKey,
    ).toString(CryptoJS.enc.Utf8);

    return { decryptedEmail, decryptedPassword };
};
