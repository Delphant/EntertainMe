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
    titles: T[];
}

const useSearchQuery = (tit_id: string) => {
    const authUser = useAuthUser(); // Declare the useAuthUser hook
    const authHeader = useAuthHeader(); // Declare the useAuthHeader hook

    return useQuery({
        queryKey: ["Search", tit_id],
        queryFn: () =>
            apiTest
                .get<FetchResponse<Title>>("/search/" + tit_id, {
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
        staleTime: 50 * 60 * 1000, // 50 min
        onError: (error: Error) => {
            console.error("An AWESOME error occurred:", error);
        },
    });
};

export default useSearchQuery;