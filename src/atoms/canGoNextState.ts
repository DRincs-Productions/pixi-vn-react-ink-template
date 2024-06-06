import { atom } from "recoil";

export const canGoNextState = atom<boolean>({
    key: 'canGoNextState',
    default: false,
});
