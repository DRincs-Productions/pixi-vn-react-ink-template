import { DialogueBaseModel } from "@drincs/pixi-vn";
import { CharacterModel } from "./characters/CharacterModel";

export class DialogueModel extends DialogueBaseModel {
    constructor(
        character: CharacterModel | string,
        text: string,
        ...i18nArgs: string[]
    ) {
        super(character, text);
        this.i18nArgs = i18nArgs;
    }
    i18nArgs: string[] = [];
}
