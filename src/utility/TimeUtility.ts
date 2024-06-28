import { clearExpiredActivities, clearExpiredRoutine, startMustStartStageQuests, TimeManager } from "@drincs/nqtr";
import { OnStartEndStageQuest } from "@drincs/nqtr/dist/override";
import { getFlag, setFlag } from "@drincs/pixi-vn";
import { VariantType } from "notistack";

const NOT_CAN_SPEND_TIME_FLAG_KEY = "not_can_spend_time";

export function sleep(newDayHour: number, props: OnStartEndStageQuest): boolean {
    if (getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        props.notify("You can't sleep now", "info")
        return false;
    }
    TimeManager.increaseDay(newDayHour)
    setFlag("weekend", TimeManager.isWeekend)
    setFlag("not_weekend", !TimeManager.isWeekend)
    clearExpiredRoutine()
    clearExpiredActivities()
    startMustStartStageQuests(props)
    return true
}

export function wait(timeSpent: number, notify: (message: string, variant: VariantType) => void): boolean {
    if (getFlag(NOT_CAN_SPEND_TIME_FLAG_KEY)) {
        notify("You can't sleep now", "info")
        return false;
    }
    if (TimeManager.currentHour + timeSpent >= 23 || TimeManager.currentHour < 5) {
        notify("You can't wait anymore, you should sleep now", "info")
        return false;
    }
    TimeManager.increaseHour(timeSpent)
    setFlag("weekend", TimeManager.isWeekend)
    setFlag("not_weekend", !TimeManager.isWeekend)
    return true
}
