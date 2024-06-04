import { atom } from "recoil";

export const canGoBackState = atom<boolean>({
    key: 'canGoBackState',
    default: false,
});
