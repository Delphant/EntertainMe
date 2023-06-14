import { useQuery } from "@tanstack/react-query";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import apiTest from "../Services/api-test";

interface Title {
    genre_name?: string;
    title_description: string;
    title_id: number;
    title_name: string;
    title_release_year: string;
    actor_names: []
    user_watchlist: boolean,
    user_watchlist_favorite: boolean,
    avg_rating: number;
    director_names: [];
}

interface FetchResponse<T> {
    title: T;
}

const useTitleQuery = (tit_id: string) => {
    const authUser = useAuthUser(); // Declare the useAuthUser hook
    const authHeader = useAuthHeader(); // Declare the useAuthHeader hook

    return useQuery({
        queryKey: ["Title", tit_id],
        queryFn: () =>
            apiTest
                .get<FetchResponse<Title>>("/titles/" + tit_id, {
                    headers: {
                        Authorization: authHeader(),
                        userid: authUser()?.userId,
                    },
                })
                .then((res) => {
                    if (res.data.title) {
                        return res.data.title;
                    } else {
                        throw new Error("Data not available");
                    }
                })
        ,
        onError: (error: Error) => {
            console.error("An AWESOME TITLE error occurred:", error);
        },
    });
};

export default useTitleQuery;
