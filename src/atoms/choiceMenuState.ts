import { ChoiceMenuOptionsType } from "@drincs/pixi-vn";
import { atom } from "recoil";

export const choiceMenuState = atom<{
    menu: ChoiceMenuOptionsType,
    hidden: boolean,
}>({
    key: 'choiceMenuState',
    default: {
        menu: [],
        hidden: true,
    },
});
