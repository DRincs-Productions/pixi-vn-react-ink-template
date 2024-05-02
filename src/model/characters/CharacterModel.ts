import { CharacterBaseModel, CharacterBaseModelProps } from "@drincs/pixi-vn";

export interface CharacterModelProps extends CharacterBaseModelProps { }

export class CharacterModel extends CharacterBaseModel {
    constructor(id: string, props: CharacterModelProps) {
        super(id, props);
    }
}
