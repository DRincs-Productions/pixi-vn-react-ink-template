import { CharacterBaseModel } from "@drincs/pixi-vn";
import { atom } from "recoil";

export const dialogDataState = atom<{
    character?: CharacterBaseModel,
    text?: string,
    hidden: boolean,
}>({
    key: 'dialogDataState',
    default: {
        character: undefined,
        text: undefined,
        hidden: true,
    },
})
