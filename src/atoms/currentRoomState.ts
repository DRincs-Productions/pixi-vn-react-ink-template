import { LocationBaseModel, MapBaseModel, RoomBaseModel } from "@drincs/nqtr";
import { atom } from "recoil";

export const currentRoomState = atom<RoomBaseModel>({
    key: 'currentRoomState',
    default: new RoomBaseModel("", new LocationBaseModel("", new MapBaseModel(""))),
});
