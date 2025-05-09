export interface UserState {
    userData: {
        loading: boolean;
        error: string | null;
        status: string,
        data: [] | null;
        pagination: {
            pageIndex: number,
            pageSize: number,
            totalPage: number,
        },
    }
}