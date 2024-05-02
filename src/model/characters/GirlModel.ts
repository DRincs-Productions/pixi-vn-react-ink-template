import { CharacterModel, CharacterModelProps } from "./CharacterModel";

export interface GirlModelProps extends CharacterModelProps { }

export class GirlModel extends CharacterModel {
    constructor(id: string, props: GirlModelProps) {
        super(id, props);
    }
}
