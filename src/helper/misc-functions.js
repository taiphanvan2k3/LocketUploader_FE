export const setCookie = (name, value, hours) => {
    const d = new Date();
    d.setTime(d.getTime() + hours * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(
        value,
    )}; ${expires}; path=/`;
};

export const getCookie = (name) => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");
    for (const c of cookies) {
        const cookie = c.trim();
        if (cookie.startsWith(nameEQ))
            return decodeURIComponent(
                cookie.substring(nameEQ.length, cookie.length),
            );
    }
    return null;
};
