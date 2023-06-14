import { useQuery } from "@tanstack/react-query";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import apiTest from "../Services/api-test";

interface Profile {
    first_name: string,
    last_name: string
}

interface User<T> {
    user_profile: T
}

const useMenuQuery = () => {
    const authUser = useAuthUser(); // Declare the useAuthUser hook
    const authHeader = useAuthHeader(); // Declare the useAuthHeader hook

    return useQuery({
        queryKey: ["Profile"],
        queryFn: () =>
            apiTest
                .get<User<Profile>>("/profile", {
                    headers: {
                        Authorization: authHeader(),
                        userid: authUser()?.userId,
                    },
                })
                .then((res) => {
                    if (res.data.user_profile) {
                        return res.data.user_profile;
                    } else {
                        throw new Error("Data not available");
                    }
                }),
        staleTime: 10 * 60 * 1000, // 10 min
        onError: (error: Error) => {
            console.error("An AWESOME TITLE error occurred:", error);
        },
    });
};

export default useMenuQuery;