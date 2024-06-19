import { getCurrenrLocation, getCurrentRoom, TimeManager } from '@drincs/nqtr';
import { CanvasBase, CanvasContainer, CanvasImage, GameWindowManager } from '@drincs/pixi-vn';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentHourState } from '../atoms/currentHourState';
import { currentLocationState } from '../atoms/currentLocationState';
import { currentRoomState } from '../atoms/currentRoomState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import { ImageTimeSlots } from '../model/TimeSlots';
import { useMyNavigate } from '../utility/useMyNavigate';
import { BACKGROUND_ID } from '../values/constants';

export default function NQTRDataEventInterceptor() {
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const [hour, setHour] = useRecoilState(currentHourState);
    const setLocation = useSetRecoilState(currentLocationState)
    const [room, setRoom] = useRecoilState(currentRoomState)
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);

    useEffect(() => {
        setHour(TimeManager.currentHour)
    }, [reloadInterfaceDataEvent])

    useEffect(() => {
        let location = getCurrenrLocation()
        if (location) {
            setLocation(location)
        }
        let room = getCurrentRoom()
        if (room) {
            setRoom(room)
        }
    }, [reloadInterfaceDataEvent, hour])

    useEffect(() => {
        let currentCommitments = room.getRoutine()
        if (room.renderImage) {
            let backgroundImage = room.renderImage({
                navigate: navigate,
                t: t,
            })
            if (currentCommitments.length > 0 && currentCommitments[0].renderImage) {
                backgroundImage = currentCommitments[0].renderImage({
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

            room.location.getRooms().forEach((room) => {
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

            room.activities.forEach((activity) => {
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

            currentCommitments.forEach((commitment) => {
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

            let automaticCommitment = currentCommitments.find((commitment) => commitment.executionType === "automatic")
            if (automaticCommitment && automaticCommitment.run) {
                automaticCommitment.run({
                    navigate: navigate,
                    t: t,
                })
            }

            GameWindowManager.addCanvasElement(BACKGROUND_ID, container)
        }
    }, [room, hour])

    return null
}
