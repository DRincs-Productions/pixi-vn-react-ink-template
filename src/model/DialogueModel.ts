import { DialogueBaseModel, StorageElementType } from "@drincs/pixi-vn";
import { CharacterModel } from "./characters/CharacterModel";

export class DialogueModel extends DialogueBaseModel {
    constructor(
        text: string,
        character: CharacterModel | string,
        i18nArgs: { [key: string]: string } = {}
    ) {
        super(text, character);
        this.oltherParams = {
            i18nArgs: i18nArgs
        }
    }
    oltherParams: {
        [key: string | number | symbol]: StorageElementType,
        i18nArgs: { [key: string]: string }
    }

    get i18nArgs() {
        return this.oltherParams.i18nArgs;
    }
}
