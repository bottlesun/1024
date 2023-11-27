import { useEffect, useState } from "react";
import create from "zustand";

type States = {
  colors: boolean;
};
type Actions = {
  changeColor: () => void;
};

type Store = States & Actions;
const initialStates: States = {
  colors: false
};

export const useSetColorStore = create<Store>()((set) => ({
  ...initialStates,
  changeColor: () => set((state: any) => ({ colors: !state.colors }))
}));

export const useColorStore = <T extends keyof States>(selector: (state: States) => States[T]): States[T] => {
  const [state, setState] = useState(selector(initialStates));
  const zustandState = useSetColorStore((persistedState: any) => selector(persistedState));

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
