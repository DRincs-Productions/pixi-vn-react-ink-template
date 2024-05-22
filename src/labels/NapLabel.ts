import { ChoiceMenuOption, newLabel, setChoiceMenuOptions, setDialogue } from "@drincs/pixi-vn";
import { wait } from "../utility/TimeUtility";

const napHourLabel = newLabel<{ hour: number }>("Nap1HourLabel",
    [
        () => {
            wait(1)
        }
    ]
)

export const napLabel = newLabel("NapLabel",
    [
        (props) => {
            setDialogue("You are tired and decide to take a nap.")
            setChoiceMenuOptions([
                new ChoiceMenuOption(
                    "1 hour",
                    napHourLabel,
                    "call",
                    { hour: 1 }
                ),
                new ChoiceMenuOption(
                    "2 hours",
                    napHourLabel,
                    "call",
                    { hour: 2 }
                ),
                new ChoiceMenuOption(
                    "3 hours",
                    napHourLabel,
                    "call",
                    { hour: 3 }
                ),
            ])
            if (props) {
                props.navigate("/game")
            }
            else {
                console.error("Props not passed to napLabel")
            }
        },
    ]
)