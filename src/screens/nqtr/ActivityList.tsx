import { ImageBackdrop, ImageSrc, StackOverflow } from '@drincs/react-components';
import { AnimatePresence } from 'framer-motion';
import { isValidElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { currentRoutineAndActivitiesState } from '../../atoms/currentRoutineAndActivitiesState';
import NavigationRoundIconButton from '../../components/NavigationRoundIconButton';
import { ImageTimeSlots } from '../../model/TimeSlots';
import { useMyNavigate } from '../../utility/useMyNavigate';

export default function ActivityList() {
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);
    const { activities, routine } = useRecoilValue(currentRoutineAndActivitiesState)

    return (
        <StackOverflow
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            spacing={0.5}
            maxLeght={"100%"}
            sx={{
                display: 'flex',
                position: "absolute",
                bottom: 0,
                right: 0,
                pointerEvents: "auto",
            }}
        >
            <AnimatePresence>
                {activities.map((activity) => {
                    let renderImage = activity.renderIcon
                    if (!renderImage) {
                        return
                    }
                    let image = renderImage({
                        navigate: navigate,
                        t: t,
                    })
                    let disabled = activity.disabled
                    if (image instanceof ImageTimeSlots) {
                        image = image.currentImage
                    }
                    if (typeof image === "string") {
                        return (
                            <NavigationRoundIconButton
                                key={"activity" + activity.id}
                                disabled={disabled}
                                onClick={() => {
                                    activity.run({
                                        navigate: navigate,
                                        t: t,
                                    })
                                }}
                                ariaLabel={activity.name}
                            >
                                {image && <ImageSrc image={image ?? ""} />}
                                {image && <ImageBackdrop />}
                            </NavigationRoundIconButton>
                        )
                    }
                    else if (isValidElement(image)) {
                        return image
                    }
                })}
                {routine.map((commitment) => {
                    let renderImage = commitment.renderIcon
                    if (!renderImage) {
                        return
                    }
                    let image = renderImage({
                        navigate: navigate,
                        t: t,
                    })
                    let disabled = commitment.disabled
                    if (image instanceof ImageTimeSlots) {
                        image = image.currentImage
                    }
                    if (typeof image === "string") {
                        return (
                            <NavigationRoundIconButton
                                key={"commitment" + commitment.id}
                                disabled={disabled}
                                onClick={() => {
                                    if (!commitment.run) {
                                        return
                                    }
                                    commitment.run({
                                        navigate: navigate,
                                        t: t,
                                    })
                                }}
                                ariaLabel={commitment.name}
                            >
                                {image && <ImageSrc image={image ?? ""} />}
                                {image && <ImageBackdrop />}
                            </NavigationRoundIconButton>
                        )
                    }
                    else if (isValidElement(image)) {
                        return image
                    }
                })}
            </AnimatePresence>
        </StackOverflow>
    );
}
