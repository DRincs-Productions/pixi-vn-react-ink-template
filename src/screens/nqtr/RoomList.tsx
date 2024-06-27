import { getCurrentRoom, setCurrentRoom } from '@drincs/nqtr';
import { ImageBackdrop, ImageSrc, StackOverflow } from '@drincs/react-components';
import { AnimatePresence } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { isValidElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { currentNavigationDataState } from '../../atoms/currentNavigationDataState';
import NavigationRoundIconButton from '../../components/NavigationRoundIconButton';
import { ImageTimeSlots } from '../../model/TimeSlots';
import { useMyNavigate } from '../../utility/useMyNavigate';

export default function RoomList() {
    const [{ currentLocation, currentRoom }, setCurrentNavigationData] = useRecoilState(currentNavigationDataState)
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);
    const { enqueueSnackbar } = useSnackbar();

    return (
        <StackOverflow
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            spacing={0.5}
            maxLeght={"80%"}
            sx={{
                display: 'flex',
                position: "absolute",
                bottom: 0,
                left: 0,
                pointerEvents: "auto",
            }}
        >
            <AnimatePresence>
                {currentLocation.getRooms().map((room) => {
                    let renderImage = room.renderIcon || room.renderImage
                    let disabled = room.disabled
                    let selected = room.id === currentRoom?.id
                    if (!renderImage) {
                        return
                    }
                    let image = renderImage({
                        navigate: navigate,
                        t: t,
                        notify: (message, variant) => enqueueSnackbar(message, { variant }),
                    })
                    if (image instanceof ImageTimeSlots) {
                        image = image.currentImage
                    }
                    if (typeof image === "string") {
                        return (
                            <NavigationRoundIconButton
                                key={"room" + room.id}
                                disabled={disabled || selected}
                                selected={selected}
                                onClick={() => {
                                    if (!disabled) {
                                        setCurrentRoom(room)
                                        let r = getCurrentRoom()
                                        if (r && r.id !== currentRoom.id) {
                                            setCurrentNavigationData((prev) => ({ ...prev, currentRoom: r }))
                                        }
                                    }
                                }}
                                ariaLabel={room.name}
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
