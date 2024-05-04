import { Label, labelDecorator, StepLabelType } from "@drincs/pixi-vn";

@labelDecorator()
export class StartLabel extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                return {
                    newRoute: "/navigation",
                }
            },
        ]
    }
}
