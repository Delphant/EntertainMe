import { useQuery } from "@tanstack/react-query";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import apiTest from "../Services/api-test";

export interface Title {
    title_id: number,
    title_name: string,
    user_id: number,
    user_watchlist_favorite: boolean,
    user_watchlist_id: number;
    genre_name: string;
}

interface FetchResponse<T> {
    titles: T[];
}

const useWatchlistQuery = () => {
    const authUser = useAuthUser(); // Declare the useAuthUser hook
    const authHeader = useAuthHeader(); // Declare the useAuthHeader hook

    return useQuery({
        queryKey: ["Watchlist"], // Include dataKey in the queryKey
        queryFn: () =>
            apiTest
                .get<FetchResponse<Title>>("/userwatchlist", {
                    headers: {
                        Authorization: authHeader(),
                        userid: authUser()?.userId,
                    },
                })
                .then((res) => {
                    if (res.data.titles) {
                        return res.data.titles;
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

export default useWatchlistQuery;