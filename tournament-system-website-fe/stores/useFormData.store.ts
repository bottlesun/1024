import create from "zustand";

type UseFormDataStore = {
  formData: any;
  setFormData: (state: any) => void;
};

export const useFormDataStore = create<UseFormDataStore>((set) => ({
  formData: {},
  setFormData: (state: any) => set({ formData: state })
}));
