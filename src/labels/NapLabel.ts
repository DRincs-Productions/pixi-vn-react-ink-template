import { ChoiceMenuOption, newLabel, setChoiceMenuOptions, setDialogue } from "@drincs/pixi-vn";
import { wait } from "../utility/TimeUtility";

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
            setDialogue("You are tired and decide to take a nap.")
            setChoiceMenuOptions([
                new ChoiceMenuOption(
                    "1 hour",
                    napHourLabel,
                    "call",
                    {
                        hour: 1,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOption(
                    "2 hours",
                    napHourLabel,
                    "call",
                    {
                        hour: 2,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
                new ChoiceMenuOption(
                    "3 hours",
                    napHourLabel,
                    "call",
                    {
                        hour: 3,
                        afterGoingToNavigation: afterGoingToNavigation
                    }
                ),
            ])
        },
    ]
)