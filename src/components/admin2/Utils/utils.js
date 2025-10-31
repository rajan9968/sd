import { jwtDecode } from "jwt-decode";

// Call this after login to store user data
export const saveUserData = (token) => {
    localStorage.setItem("token", token);

    try {
        const decoded = jwtDecode(token); // decode token to get user info
        localStorage.setItem("user", JSON.stringify(decoded));
    } catch (e) {
        console.error("Invalid JWT token:", e);
    }
};

// Get user data safely
export const getUserData = () => {
    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
        console.error("Invalid user data in localStorage:", e);
        localStorage.removeItem("user");
    }

    if (!user) {
        window.location.href = "/admin";
        return null;
    }

    return user;
};
