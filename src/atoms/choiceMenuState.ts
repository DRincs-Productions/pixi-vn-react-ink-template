import { ChoiceMenuOptionsType } from "@drincs/pixi-vn";
import { atom } from "recoil";

export const choiceMenuState = atom<ChoiceMenuOptionsType | undefined>({
    key: 'choiceMenuState',
    default: undefined,
});
