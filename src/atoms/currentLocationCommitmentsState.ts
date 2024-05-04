import { CommitmentBaseModel, LocationBaseModel, MapBaseModel, RoomBaseModel } from "@drincs/nqtr";
import { atom } from "recoil";
import { CharacterModel } from "../model/characters/CharacterModel";

export const currentLocationCommitmentsState = atom<CommitmentBaseModel<CharacterModel, RoomBaseModel<LocationBaseModel<MapBaseModel>>>[]>({
    key: 'currentLocationCommitmentsState',
    default: [],
});
