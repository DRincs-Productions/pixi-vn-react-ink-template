import { StepLabelProps } from "@drincs/pixi-vn/dist/override";
import { ImageTimeSlots } from "./model/TimeSlots";

declare module '@drincs/nqtr/dist/override' {
    interface OnRunActivityProps extends StepLabelProps {
    }
    interface OnRenderGraphicItemProps extends StepLabelProps {
    }
    interface GraphicItemInterface extends ImageTimeSlots { }
}
