import { TimeManager } from "@drincs/nqtr";
import { atom } from "recoil";

export const currentHourState = atom<number>({
    key: 'currentHourState',
    default: TimeManager.currentHour,
});
