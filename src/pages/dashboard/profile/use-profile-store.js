import { api } from "@/api";
import axios from "axios";
import { create } from "zustand";

const initialState = {
  data: null,
  loading: false,
};

const useProfileStore = create((set) => ({
  ...initialState,
  getData: async (params = {}) => {
    set({ loading: true });
    try {
      const res = await api.auth.profile(params);
      set({ data: res?.data?.data, loading: false });
    } catch (err) {
      if (!axios.isCancel(err.message)) {
        return;
      }
      set({ loading: false });
    }
  },
  reset: () => set(initialState),
}));

export default useProfileStore;
