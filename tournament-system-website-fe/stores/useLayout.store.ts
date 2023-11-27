import { useEffect, useState } from "react";
import create from "zustand";

type States = {
  name: string;
  layout: boolean;
};

type Actions = {
  changeLayout: () => void;
};

type Store = States & Actions;

const initialStates: States = {
  name: "Horizontal",
  layout: true
};

export const useSetLayoutStore = create<Store>()((set) => ({
  ...initialStates,
  changeLayout: () => set((state: any) => ({ layout: !state.layout }))
}));
export const useLayoutStore = <T extends keyof States>(selector: (state: States) => States[T]): States[T] => {
  const [state, setState] = useState(selector(initialStates));
  const zustandState = useSetLayoutStore((persistedState: any) => selector(persistedState));

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
