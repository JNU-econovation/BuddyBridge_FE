import axios from "axios";

import { ROUTE } from "@/constants/route";

export const getNewAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/auth/reissue`, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = ROUTE.LOGIN;
    return null;
  }
};
