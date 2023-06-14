import { useQuery } from "@tanstack/react-query";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import apiTest from "../Services/api-test";

export interface Title {
    title_description: string;
    title_id: number;
    title_name: string;
    genre_name: string;
}


interface FetchResponse<T> {
    latestrecs: T[];
    watchlist: T[];
    whatsnew: T[];
    top_rating: T[];
}



const useMainQuery = () => {
    const authUser = useAuthUser(); // Declare the useAuthUser hook
    const authHeader = useAuthHeader(); // Declare the useAuthHeader hook

    return useQuery({
        queryKey: ["recommend"], // Include dataKey in the queryKey
        queryFn: () =>
            apiTest
                .get<FetchResponse<Title>>("/titles", {
                    headers: {
                        Authorization: authHeader(),
                        userid: authUser()?.userId,
                    },
                })
                .then((res) => {
                    if (res.data) {
                        return res.data;

                    } else {
                        throw new Error("Data not available");
                    }
                }), // Access the appropriate data based on dataKey
        staleTime: 1000, // 1 sec
        onError: (error: Error) => {
            console.error("An AWESOME error occurred:", error);
        },
    });
};

export default useMainQuery;
