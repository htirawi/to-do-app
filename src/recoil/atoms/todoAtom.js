import { atom } from "recoil";
import persistAtom from "./recoil-persist";

export const todoListAtom = atom({
  key: "userTodoListState",
  default: [],
  effects: [persistAtom],
});