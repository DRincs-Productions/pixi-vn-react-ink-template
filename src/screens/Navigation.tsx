import { getCurrenrLocation, getCurrentRoom, setCurrentRoom, TimeManager } from '@drincs/nqtr';
import { CanvasBase, CanvasContainer, CanvasImage, GameWindowManager } from '@drincs/pixi-vn';
import { ImageBackdrop, ImageSrc, StackOverflow } from '@drincs/react-components';
import { AnimatePresence } from 'framer-motion';
import { isValidElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentLocationState } from '../atoms/currentLocationState';
import { currentRoomState } from '../atoms/currentRoomState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import NavigationRoundIconButton from '../components/NavigationRoundIconButton';
import { ImageTimeSlots } from '../model/TimeSlots';
import { useMyNavigate } from '../utility/useMyNavigate';
import { BACKGROUND_ID } from '../values/constants';
import Time from './Time';

export default function Navigation() {
    const [currentLocation, setAtomCurrentLocation] = useRecoilState(currentLocationState)
    const [currentRoom, setAtomCurrentRoom] = useRecoilState(currentRoomState)
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const [hour, setHour] = useState(TimeManager.currentHour)
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);

    useEffect(() => {
        let location = getCurrenrLocation()
        if (location) {
            setAtomCurrentLocation(location)
        }
    }, [reloadInterfaceDataEvent])

    useEffect(() => {
        let room = getCurrentRoom()
        if (room) {
            setAtomCurrentRoom(room)
        }
    }, [currentLocation])

    useEffect(() => {
        let locationCommitments = currentRoom.getRoutine()
        if (currentRoom.renderImage) {
            let backgroundImage = currentRoom.renderImage({
                navigate: navigate,
                t: t,
            })
            if (locationCommitments.length > 0 && locationCommitments[0].renderImage) {
                backgroundImage = locationCommitments[0].renderImage({
                    navigate: navigate,
                    t: t,
                })
            }
            let container = new CanvasContainer()
            if (backgroundImage instanceof CanvasBase) {
                container.addChild(backgroundImage)
            }
            if (backgroundImage instanceof ImageTimeSlots) {
                backgroundImage = backgroundImage.currentImage
            }
            if (typeof backgroundImage === 'string') {
                let image = new CanvasImage()
                image.imageLink = backgroundImage
                image.load()
                container.addChild(image)
            }

            currentRoom.location.getRooms().forEach((room) => {
                if (!room.renderIcon) {
                    return
                }
                let icon = room.renderIcon({
                    navigate: navigate,
                    t: t,
                })
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            currentRoom.activities.forEach((activity) => {
                if (!activity.renderIcon) {
                    return
                }
                let icon = activity.renderIcon({
                    navigate: navigate,
                    t: t,
                })
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            currentRoom.getRoutine().forEach((commitment) => {
                if (!commitment.renderIcon) {
                    return
                }
                let icon = commitment.renderIcon({
                    navigate: navigate,
                    t: t,
                })
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            GameWindowManager.addCanvasElement(BACKGROUND_ID, container)
        }
    }, [currentRoom, hour])

    return (
        <>
            <Time hour={hour} setHour={setHour} />
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
                    {currentLocation.getRooms().map((room, index) => {
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
                                    key={"room" + index}
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
                    {currentRoom.activities.map((activity, index) => {
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
                                    key={"activity" + index}
                                    disabled={disabled}
                                    onClick={() => {
                                        activity.onRun({
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
                    {currentRoom.getRoutine().map((commitment, index) => {
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
                                    key={"commitment" + index}
                                    disabled={disabled}
                                    onClick={() => {
                                        if (!commitment.onRun) {
                                            return
                                        }
                                        commitment.onRun({
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
        </>
    );
}
