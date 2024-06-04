import { atom } from "recoil";

export const nextStepLoadingState = atom<boolean>({
    key: 'nextStepLoadingState',
    default: false,
});
