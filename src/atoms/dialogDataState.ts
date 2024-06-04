import { atom } from "recoil";
import { CharacterModel } from "../model/characters/CharacterModel";

export const dialogDataState = atom<{
    character?: CharacterModel,
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
