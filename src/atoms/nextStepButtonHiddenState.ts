import { atom } from "recoil";

export const nextStepButtonHiddenState = atom<boolean>({
    key: 'nextStepButtonHiddenState',
    default: false,
});
