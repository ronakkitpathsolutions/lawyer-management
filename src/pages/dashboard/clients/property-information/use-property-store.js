import axios from "axios";
import { create } from "zustand";
import { api } from "@/api";
import { apiAsyncHandler } from "@/utils/helper";

const initialState = {
    loading: false,
    data: [],
    total: 0,
    params: {
        page: 1,
        limit: 10,
    },
};

const usePropertyStore = create((set) => ({
    ...initialState,
    setParams: (newState) => {
        set((state) => ({ params: { ...state.params, ...newState } }));
    },
    getAll: async (configs = {}) => {
        set({ loading: true });
        // Extract signal from configs and separate it from params
        const { signal, id, params } = configs;
        await apiAsyncHandler(
            async () => {
                const res = await api.property.getAll({
                    id,
                    params,
                    signal,
                });
                set({
                    data: res?.data?.data?.result,
                    total: res?.data?.data?.pagination?.totalItems,
                    loading: false,
                });
            },
            (error) => {
                if (axios.isCancel(error)) {
                    return;
                }
                set({ loading: false });
            }
        );
    },
    resetParams: () => set(() => ({ params: { page: 1, limit: 10 } })),
    reset: () => set(initialState),
}));

export default usePropertyStore;
