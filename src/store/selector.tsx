import { createSelector } from "@reduxjs/toolkit";

const selectSelf = state => state;

export const userData = createSelector(selectSelf, state => state.userData);
