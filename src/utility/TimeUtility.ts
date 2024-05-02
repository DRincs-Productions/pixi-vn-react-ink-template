import { TimeManager } from "@drincs/nqtr";
import { getFlag } from "@drincs/pixi-vn";

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";

export function sleep(newDayHour?: number): boolean {
    if (getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        return false;
    }
    TimeManager.increaseDay(newDayHour)
    return true
}

export function wait(timeSpent?: number): boolean {
    if (getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        return false;
    }
    TimeManager.increaseHour(timeSpent)
    return true
}
