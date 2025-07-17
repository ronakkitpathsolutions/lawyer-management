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
        limit: 10
    }
};

const useClientsStore = create((set) => ({
  ...initialState,
  setParams: (newState) => set((state) => ({ params: { ...state.params, ...newState } })),
  getAll: async (params = {}) => {
    set({ isLoading: true });
     await apiAsyncHandler(
      async () => {
        const res = await api.client.getAll(params);
        set({
          data: res?.data?.data?.result,
          total: res?.data?.data?.pagination?.totalCount,
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

export default useClientsStore;
