import create from "zustand";

type UseFormsStore = {
  forms: FormsStore;
  addForms: (key: string, value: any) => void;
};

export type FormsStore = {
  [key: string]: any;
};

const useFormsStore = create<UseFormsStore>(
  (set): UseFormsStore => ({
    forms: {},
    addForms: (key: string, value: any): void =>
      set((state: FormsStore) => ({
        forms: {
          ...state.forms,
          [key]: value
        }
      }))
  })
);

export default useFormsStore;
