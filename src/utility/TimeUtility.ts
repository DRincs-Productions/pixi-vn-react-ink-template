import { clearExpiredActivities, clearExpiredRoutine, startMustStartStageQuests, TimeManager } from "@drincs/nqtr";
import { getFlag, setFlag } from "@drincs/pixi-vn";

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";

export function sleep(newDayHour?: number): boolean {
    if (getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        return false;
    }
    TimeManager.increaseDay(newDayHour)
    setFlag("weekend", TimeManager.isWeekend)
    setFlag("not_weekend", !TimeManager.isWeekend)
    clearExpiredRoutine()
    clearExpiredActivities()
    startMustStartStageQuests({})
    return true
}

export function wait(timeSpent?: number): boolean {
    if (getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        return false;
    }
    TimeManager.increaseHour(timeSpent)
    setFlag("weekend", TimeManager.isWeekend)
    setFlag("not_weekend", !TimeManager.isWeekend)
    return true
}
