import { DialogueBaseModel } from "@drincs/pixi-vn";
import { CharacterModel } from "./characters/CharacterModel";

export class DialogueModel extends DialogueBaseModel {
    constructor(
        text: string,
        character: CharacterModel | string,
        i18nArgs: { [key: string]: string }
    ) {
        super(text, character);
        this.i18nArgs = i18nArgs;
    }
    i18nArgs: { [key: string]: string } = {}
}
