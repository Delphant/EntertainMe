import { useQuery } from "@tanstack/react-query";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import apiTest from "../Services/api-test";

interface Review {
    review_date: Date,
    user_review_description: string,
    user_review_title: string,
    user_review_id: number,
    user_review_rating: number,
    reviewer_name: string,
}

interface FetchResponse<T> {
    reviews: T[];
}

const useReviewQuery = (tit_id: string) => {
    const authUser = useAuthUser(); // Declare the useAuthUser hook
    const authHeader = useAuthHeader(); // Declare the useAuthHeader hook

    return useQuery({
        queryKey: ["Review", tit_id], // Include dataKey in the queryKey
        queryFn: () =>
            apiTest
                .get<FetchResponse<Review>>("/review/" + tit_id, {
                    headers: {
                        Authorization: authHeader(),
                        userid: authUser()?.userId,
                    },
                })
                .then((res) => {
                    if (res.data.reviews) {
                        const formattedReviews = res.data.reviews.map((review) => {
                            const reviewDate = new Date(review.review_date);
                            const formattedDate = `${reviewDate.toLocaleString('default', { month: 'short' })} ${reviewDate.getDate()} ${reviewDate.getFullYear()}`;

                            return {
                                ...review,
                                review_date: formattedDate,
                            };
                        });

                        return formattedReviews;
                    } else {
                        throw new Error('Data not available');
                    }
                }),
        staleTime: 60 * 1000, // 5 mins
        onError: (error: Error) => {
            console.error("An AWESOME error occurred:", error);
        },
    });
};

export default useReviewQuery;