import { ChoiceMenuOption, ChoiceMenuOptionClose, newLabel, setChoiceMenuOptions, setDialogue } from "@drincs/pixi-vn";
import { sleep, wait } from "../utility/TimeUtility";

const sleepHourLabel = newLabel<{
    wakeupHour: number,
    afterGoingToNavigation: boolean
}>("Sleep1HourLabel",
    [
        ({ afterGoingToNavigation, navigate, wakeupHour }) => {
            sleep(wakeupHour)
            if (afterGoingToNavigation) {
                navigate("/navigation")
            }
        }
    ]
)

const napHourLabel = newLabel<{
    hour: number,
    afterGoingToNavigation: boolean
}>("Nap1HourLabel",
    [
        ({ hour, afterGoingToNavigation, navigate }) => {
            wait(hour)
            if (afterGoingToNavigation) {
                navigate("/navigation")
            }
        }
    ]
)

export const sleepLabel = newLabel<{
    /**
     * After going to navigation
     * @default true
     */
    afterGoingToNavigation?: boolean
}>("SleepLabel",
    [
        ({ afterGoingToNavigation = true, t }) => {
            setDialogue("What time do you want to set the alarm?")
            setChoiceMenuOptions([
                new ChoiceMenuOption(
                    t("allarm_menu_item", { hour: 8 }),
                    sleepHourLabel,
                    "call",
                    {
                        wakeupHour: 8,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOption(
                    t("allarm_menu_item", { hour: 9 }),
                    sleepHourLabel,
                    "call",
                    {
                        wakeupHour: 9,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOption(
                    t("allarm_menu_item", { hour: 10 }),
                    sleepHourLabel,
                    "call",
                    {
                        wakeupHour: 10,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOptionClose("Cancel"),
            ])
        },
    ]
)

export const napLabel = newLabel<{
    /**
     * After going to navigation
     * @default true
     */
    afterGoingToNavigation?: boolean
}>("NapLabel",
    [
        ({ afterGoingToNavigation = true, t }) => {
            setDialogue("You are tired and decide to take a nap.")
            setChoiceMenuOptions([
                new ChoiceMenuOption(
                    t("nap_menu_item", { hour: 3 }),
                    napHourLabel,
                    "call",
                    {
                        hour: 3,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOption(
                    t("sleep"),
                    sleepLabel,
                    "call",
                    {
                        hour: 3,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOptionClose("Cancel"),
            ])
        },
    ]
)