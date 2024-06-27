import { ChoiceMenuOption, ChoiceMenuOptionClose, GameStepManager, newLabel, setChoiceMenuOptions, setDialogue } from "@drincs/pixi-vn";
import { sleep, wait } from "../utility/TimeUtility";

const sleepHourLabel = newLabel<{
    wakeupHour: number,
}>("Sleep1HourLabel",
    [
        ({ wakeupHour, ...rest }) => {
            sleep(wakeupHour, rest.notify)
            GameStepManager.runNextStep(rest)
        }
    ]
)

const napHourLabel = newLabel<{
    hour: number,
}>("Nap1HourLabel",
    [
        ({ hour, ...rest }) => {
            wait(hour, rest.notify)
            GameStepManager.runNextStep(rest)
        }
    ]
)

export const sleepLabel = newLabel("SleepLabel",
    [
        ({ t }) => {
            setDialogue("What time do you want to set the alarm?")
            setChoiceMenuOptions([
                new ChoiceMenuOption(
                    t("allarm_menu_item", { hour: 8 }),
                    sleepHourLabel,
                    "call",
                    {
                        wakeupHour: 8,
                    }
                ),
                new ChoiceMenuOption(
                    t("allarm_menu_item", { hour: 9 }),
                    sleepHourLabel,
                    "call",
                    {
                        wakeupHour: 9,
                    }
                ),
                new ChoiceMenuOption(
                    t("allarm_menu_item", { hour: 10 }),
                    sleepHourLabel,
                    "call",
                    {
                        wakeupHour: 10,
                    }
                ),
                new ChoiceMenuOptionClose("Cancel"),
            ])
        },
    ]
)

export const napLabel = newLabel("NapLabel",
    [
        ({ t }) => {
            setDialogue("You are tired and decide to take a nap.")
            setChoiceMenuOptions([
                new ChoiceMenuOption(
                    t("nap_menu_item", { hour: 3 }),
                    napHourLabel,
                    "call",
                    {
                        hour: 3,
                    }
                ),
                new ChoiceMenuOption(
                    t("sleep"),
                    sleepLabel,
                    "call",
                    {
                        hour: 3,
                    }
                ),
                new ChoiceMenuOptionClose("Cancel"),
            ])
        },
    ]
)