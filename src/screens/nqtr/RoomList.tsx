import { getCurrentRoom, setCurrentRoom } from '@drincs/nqtr';
import { ImageBackdrop, ImageSrc, StackOverflow } from '@drincs/react-components';
import { AnimatePresence } from 'framer-motion';
import { isValidElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentLocationState } from '../../atoms/currentLocationState';
import { currentRoomState } from '../../atoms/currentRoomState';
import NavigationRoundIconButton from '../../components/NavigationRoundIconButton';
import { ImageTimeSlots } from '../../model/TimeSlots';
import { useMyNavigate } from '../../utility/useMyNavigate';

export default function RoomList() {
    const currentLocation = useRecoilValue(currentLocationState)
    const [currentRoom, setAtomCurrentRoom] = useRecoilState(currentRoomState)
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);

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
                                            setAtomCurrentRoom(r)
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
