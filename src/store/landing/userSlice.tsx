import { createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "../../services/apiService";

const initialState = {
    userData: {
        data: [],
        status: "loading",
        error: false,
        pagination: {
            pageIndex: 0,
            pageSize: 10,
            totalPage: 1,
        },
    },
};

const userSlice = createSlice({
    name: "fetchUserData",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, state => {
                state.userData.status = "loading";
                state.userData.error = false;
            })
            .addCase(fetchUsers.rejected, state => {
                state.userData.status = "error";
                state.userData.data = [];
                state.userData.error = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.userData.status = "success";
                state.userData.data = action?.payload?.data;
                state.userData.error = false;

                state.userData.pagination = {
                    pageIndex: action.payload?.pagination?.pageNo,
                    pageSize: action.payload?.pagination?.limit,
                    totalPage: action.payload?.pagination?.totalPage,
                };
            })
    },
});

export default userSlice.reducer;
