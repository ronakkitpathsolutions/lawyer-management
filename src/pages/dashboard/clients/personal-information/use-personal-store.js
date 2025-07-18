import { api } from "@/api";
import axios from "axios";
import { create } from "zustand";

const initialState = {
  data: null,
  loading: false,
};

const usePersonalInformationStore = create((set) => ({
  ...initialState,
  getData: async (data) => {
    set({ loading: true });
    try {
      const res = await api.client.get(data);
      set({ data: res?.data?.data?.client || {}, loading: false });
    } catch (err) {
      if (!axios.isCancel(err.message)) {
        return;
      }
      set({ loading: false });
    }
  },
  reset: () => set(initialState),
}));

export default usePersonalInformationStore;
