import { CharacterModel, CharacterModelProps } from "./CharacterModel";

export interface McModelProps extends CharacterModelProps { }

export class McModel extends CharacterModel {
    constructor(id: string, props: McModelProps) {
        super(id, props);
    }
}
