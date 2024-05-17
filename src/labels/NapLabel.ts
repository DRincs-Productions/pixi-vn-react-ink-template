import { ChoiceMenuOptionLabel, Label, labelDecorator, setChoiceMenuOptions, setDialogue, StepLabelType } from "@drincs/pixi-vn";
import { wait } from "../utility/TimeUtility";

@labelDecorator()
export class Nap1HourLabel extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                wait(1)
            },
        ]
    }
}

@labelDecorator()
export class NapLabel extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                setDialogue("You are tired and decide to take a nap.")
                setChoiceMenuOptions([
                    new ChoiceMenuOptionLabel(
                        "1 hour",
                        Nap1HourLabel
                    )
                ])
            },
        ]
    }
}
