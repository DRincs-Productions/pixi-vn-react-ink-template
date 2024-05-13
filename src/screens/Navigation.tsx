import { getCurrenrLocation, getCurrentCommitments, getCurrentRoom, setCurrentRoom } from '@drincs/nqtr';
import { CanvasBase, CanvasContainer, CanvasImage, GameWindowManager } from '@drincs/pixi-vn';
import { Grid, ImageBackdrop, ImageSrc, RoundIconButton } from '@drincs/react-components';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentLocationCommitmentsState } from '../atoms/currentLocationCommitmentsState';
import { currentLocationState } from '../atoms/currentLocationState';
import { currentRoomState } from '../atoms/currentRoomState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import { ImageTimeSlots } from '../model/TimeSlots';
import { wait } from '../utility/TimeUtility';
import { BACKGROUND_ID } from '../values/constants';

export default function Navigation() {
    const [currentLocation, setAtomCurrentLocation] = useRecoilState(currentLocationState)
    const [currentRoom, setAtomCurrentRoom] = useRecoilState(currentRoomState)
    const [currentLocationCommitments, setCurrentLocationCommitments] = useRecoilState(currentLocationCommitmentsState)
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const [updateCommitments, setUpdateCommitments] = useState(0)

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
        setUpdateCommitments((prev) => prev + 1)
    }, [currentLocation])

    useEffect(() => {
        let locationCommitments = getCurrentCommitments().filter((commitment) => {
            return commitment.room.location.id === currentLocation?.id
        })
        setCurrentLocationCommitments(locationCommitments)
    }, [updateCommitments])

    useEffect(() => {
        let backgroundImage = currentRoom.image
        if (backgroundImage) {
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
                let icon = room.icon
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            currentRoom.activities.forEach((activity) => {
                let icon = activity.icon
                if (icon instanceof CanvasBase) {
                    container.addChild(icon)
                }
            })

            GameWindowManager.addCanvasElement(BACKGROUND_ID, container)
        }
    }, [currentRoom, currentLocationCommitments])

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
                spacing={2}
                sx={{
                    maxWidth: "100%",
                    position: "absolute",
                    marginBottom: "0.2rem",
                    marginLeft: "0.2rem",
                    bottom: 0,
                    left: 0,
                }}
            >
                {currentLocation.getRooms().map((room) => {
                    let image = room.icon || room.image
                    let disabled = room.id === currentRoom?.id || room.disabled
                    if (image instanceof ImageTimeSlots) {
                        image = image.currentImage
                    }
                    if (typeof image === "string") {
                        return (
                            <Grid
                                paddingY={0}
                                key={room.id}
                            >
                                <RoundIconButton
                                    circumference={{ xs: "3rem", sm: "3.5rem", md: "4rem", lg: "5rem", xl: "7rem" }}
                                    disabled={disabled}
                                    sx={{
                                        border: 3,
                                    }}
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
                                </RoundIconButton>
                            </Grid>
                        )
                    }
                })}
            </Grid >
            {currentLocation.getRooms().map((room) => {
                let image = room.icon || room.image
                // if image is a JSX.Element
                if (image instanceof Element) {
                    return image
                }
            })}
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                spacing={2}
                sx={{
                    maxWidth: "100%",
                    position: "absolute",
                    marginBottom: "0.2rem",
                    marginRight: "0.2rem",
                    bottom: 0,
                    right: 0,
                }}
            >
                <Grid
                    paddingY={0}
                >
                    <RoundIconButton
                        variant="outlined"
                        circumference={{ xs: "3rem", sm: "3.5rem", md: "4rem", lg: "5rem", xl: "7rem" }}
                        sx={{
                            border: 3,
                        }}
                        onClick={() => {
                            wait(1)
                            setUpdateCommitments((prev) => prev + 1)
                        }}
                    >
                        <ImageSrc
                            image={"https://cdn-icons-png.freepik.com/512/1045/1045584.png?ga=GA1.1.2068448463.1715274700"}
                            style={{
                                marginLeft: "0.3rem",
                                marginRight: "0.3rem",
                                marginTop: "0.3rem",
                                marginBottom: "0.3rem",
                            }}
                        />
                        <ImageBackdrop />
                    </RoundIconButton>
                </Grid>
                {currentRoom.activities.map((activity, index) => {
                    let image = activity.icon
                    let disabled = activity.disabled
                    if (image instanceof ImageTimeSlots) {
                        image = image.currentImage
                    }
                    if (typeof image === "string") {
                        return (
                            <Grid
                                paddingY={0}
                                key={index}
                            >
                                <RoundIconButton
                                    circumference={{ xs: "3rem", sm: "3.5rem", md: "4rem", lg: "5rem", xl: "7rem" }}
                                    disabled={disabled}
                                    sx={{
                                        border: 3,
                                    }}
                                    onClick={activity.onRun}
                                    ariaLabel={activity.name}
                                >
                                    {image && <ImageSrc image={image ?? ""} />}
                                    {image && <ImageBackdrop />}
                                </RoundIconButton>
                            </Grid>
                        )
                    }
                })}
            </Grid >
        </>
    );
}
