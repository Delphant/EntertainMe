import React, { useEffect } from 'react'
import apiTest from '../Services/api-test'
import { useNavigate } from 'react-router-dom'
import { useAuthUser, useAuthHeader } from 'react-auth-kit';


interface RandTitle {
    title_id: number
}

const useRandomTitle = () => {
    const navigate = useNavigate();
    const authUser = useAuthUser();
    const authHeader = useAuthHeader();

    const getRandomTitle = () => {
        apiTest
            .get<RandTitle>('/randomtitle', {
                headers: {
                    Authorization: authHeader(),
                    userid: authUser()?.userId,
                },
            })
            .then(res => {
                navigate(`/title/${res.data.title_id}`);
            });
    };

    return getRandomTitle;
};

export default useRandomTitle;