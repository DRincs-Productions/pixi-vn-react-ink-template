import { ActivityRoom, CommitmentBaseModel, currentActivities, LocationBaseModel, MapBaseModel, RoomBaseModel } from "@drincs/nqtr";
import { getCurrentRoomRoutine } from "@drincs/nqtr/dist/functions/RoutineFunctions";
import { atom } from "recoil";

export const currentRoutineAndActivitiesState = atom<{
    routine: CommitmentBaseModel[]
    activities: ActivityRoom<RoomBaseModel<LocationBaseModel<MapBaseModel>>>[]
}>({
    key: 'currentLocationState',
    default: {
        routine: getCurrentRoomRoutine(),
        activities: currentActivities()
    },
});
