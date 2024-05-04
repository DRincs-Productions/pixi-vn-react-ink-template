import { LocationBaseModel, MapBaseModel } from "@drincs/nqtr";
import { atom } from "recoil";

export const currentLocationState = atom<LocationBaseModel>({
    key: 'currentLocationState',
    default: new LocationBaseModel("", new MapBaseModel("")),
});
