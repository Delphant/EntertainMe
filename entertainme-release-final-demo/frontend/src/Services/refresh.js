import { useAuthHeader, createRefresh } from 'react-auth-kit'
import apiTest from "./api-test";


const refreshApi = createRefresh({
  interval: 20,   // Refreshs the token in every 20 minutes
  refreshApiCallback: async (
    {   // arguments
      refreshToken,
      authUserState
    }) => {
    try {
      const response = await apiTest.post("/refreshtoken", { refresh: refreshToken }, {
        headers: { Authorization: `Bearer ${refreshToken}`, userid: authUserState }
      }

      );
      console.log("Token refreshed successfully!");
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newAuthTokenExpireIn: response.data.access_token_exp,
      }
    }
    catch (error) {
      console.error(error)
      console.log("THIS IS AN ERROR")
      window.location.reload();
      return {
        isSuccess: false
      }
    }
  }
})


export default refreshApi