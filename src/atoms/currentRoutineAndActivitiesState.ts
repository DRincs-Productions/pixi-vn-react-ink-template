import { ActivityRoom, CommitmentBaseModel, LocationBaseModel, MapBaseModel, RoomBaseModel } from "@drincs/nqtr";
import { atom } from "recoil";

export const currentRoutineAndActivitiesState = atom<{
    routine: CommitmentBaseModel[]
    activities: ActivityRoom<RoomBaseModel<LocationBaseModel<MapBaseModel>>>[]
}>({
    key: 'currentLocationState',
    default: {
        routine: [],
        activities: []
    },
});
