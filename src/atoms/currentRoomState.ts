import { RoomBaseModel } from "@drincs/nqtr";
import { atom } from "recoil";

export const currentRoomState = atom<RoomBaseModel>({
    key: 'currentRoomState',
    default: undefined,
});
