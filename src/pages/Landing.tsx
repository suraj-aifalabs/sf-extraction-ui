import { RiCheckboxCircleFill } from '@remixicon/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UserState } from '../types/storeTypes';
import { fetchUsers } from '../services/apiService';

const Landing = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: UserState) => state?.userData);
    console.log(data, "child data")

    useEffect(() => {
        dispatch(fetchUsers({ pageNo: 0, pageSize: 20 }));
    }, []);


    return (
        <p className='text-xl bg-yellow-400 flex items-center gap-8 border-8 p-2'>SF Extraction UI<RiCheckboxCircleFill size={40} /></p>

    )
}

export default Landing