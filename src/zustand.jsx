import { create } from "zustand";

const useStore = create((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
  token: localStorage.getItem("token") || null,  // This gets the token from localStorage or null
  setToken: (newToken) => {
    localStorage.setItem("token", newToken);
    set({ token: newToken });
  },
  refreshToken: async (navigate) => {
    try {
      const response = await fetch("https://aqvo.limsa.uz/api/auth/refresh", {
        method: "POST",
        credentials: "include", // assuming you're using cookies for the refresh token
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      const newAccessToken = data?.data?.tokens?.access_token;

      if (newAccessToken) {
        localStorage.setItem("token", newAccessToken);
        set({ token: newAccessToken });
        navigate("/home"); // If token refreshed, redirect to home
      } else {
        throw new Error("No new token received");
      }
    } catch (error) {
      console.error(error.message);
      localStorage.removeItem("token");
      set({ token: null });
      navigate("/"); // If refresh fails, navigate to login page
    }
  },
}));

export default useStore;
