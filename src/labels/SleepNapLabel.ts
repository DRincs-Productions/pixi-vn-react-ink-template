import { ChoiceMenuOption, newLabel, setChoiceMenuOptions, setDialogue } from "@drincs/pixi-vn";
import { sleep, wait } from "../utility/TimeUtility";

const sleepHourLabel = newLabel<{
    wakeupHour: number,
    afterGoingToNavigation: boolean
}>("Sleep1HourLabel",
    [
        (props) => {
            let hour = props?.wakeupHour || 8
            sleep(hour)
            if (props?.afterGoingToNavigation) {
                props.navigate("/navigation")
            }
        }
    ]
)

const napHourLabel = newLabel<{
    hour: number,
    afterGoingToNavigation: boolean
}>("Nap1HourLabel",
    [
        (props) => {
            let hour = props?.hour || 1
            wait(hour)
            if (props?.afterGoingToNavigation) {
                props.navigate("/navigation")
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
        (props) => {
            let afterGoingToNavigation = props?.afterGoingToNavigation || true
            if (!props?.translate) {
                return
            }
            setDialogue("What time do you want to set the alarm?")
            setChoiceMenuOptions([
                new ChoiceMenuOption(
                    props.translate("allarm_menu_item", { hour: 8 }),
                    sleepHourLabel,
                    "call",
                    {
                        wakeupHour: 8,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOption(
                    props.translate("allarm_menu_item", { hour: 9 }),
                    sleepHourLabel,
                    "call",
                    {
                        wakeupHour: 9,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOption(
                    props.translate("allarm_menu_item", { hour: 10 }),
                    sleepHourLabel,
                    "call",
                    {
                        wakeupHour: 10,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                // TODO: new ChoiceMenuOptionClose("Cancel"),
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
        (props) => {
            let afterGoingToNavigation = props?.afterGoingToNavigation || true
            if (!props?.translate) {
                return
            }
            setDialogue("You are tired and decide to take a nap.")
            setChoiceMenuOptions([
                new ChoiceMenuOption(
                    props.translate("nap_menu_item", { hour: 3 }),
                    napHourLabel,
                    "call",
                    {
                        hour: 3,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOption(
                    props.translate("sleep"),
                    sleepLabel,
                    "call",
                    {
                        hour: 3,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                // TODO: new ChoiceMenuOptionClose("Cancel"),
            ])
        },
    ]
)