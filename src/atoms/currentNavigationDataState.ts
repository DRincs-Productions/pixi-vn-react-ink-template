import { LocationBaseModel, MapBaseModel, RoomBaseModel } from "@drincs/nqtr";
import { atom } from "recoil";

export const currentNavigationDataState = atom<{
    currentRoom: RoomBaseModel,
    currentLocation: LocationBaseModel,
}>({
    key: 'currentNavigationDataState',
    default: {
        currentRoom: new RoomBaseModel("", new LocationBaseModel("", new MapBaseModel(""))),
        currentLocation: new LocationBaseModel("", new MapBaseModel(""))
    },
});
