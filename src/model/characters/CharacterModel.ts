import { CharacterBaseModel, CharacterBaseModelProps } from "@drincs/pixi-vn";

export interface CharacterModelProps extends CharacterBaseModelProps {
    prefix?: string
}

export class CharacterModel extends CharacterBaseModel {
    constructor(id: string, props: CharacterModelProps) {
        super(id, props);
        this.prefix = props.prefix;
    }
    prefix?: string
}
