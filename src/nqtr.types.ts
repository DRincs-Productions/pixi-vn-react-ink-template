import { StepLabelProps } from "@drincs/pixi-vn/dist/override";
import { ReactElement } from "react";
import { ImageTimeSlots } from "./model/TimeSlots";

declare module '@drincs/nqtr/dist/override' {
    interface OnRunActivityProps extends StepLabelProps {
    }
    interface OnRenderGraphicItemProps extends StepLabelProps {
    }
    interface GraphicItemInterface extends ImageTimeSlots { }
    interface GraphicHTMLElement extends ReactElement<any, any> { }
}
