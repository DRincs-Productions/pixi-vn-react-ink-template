import { getCurrenrLocation, getCurrentCommitments, getCurrentRoom } from '@drincs/nqtr';
import { Grid, RoundIconButton } from '@drincs/react-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentLocationCommitmentsState } from '../atoms/currentLocationCommitmentsState';
import { currentLocationState } from '../atoms/currentLocationState';
import { currentRoomState } from '../atoms/currentRoomState';
import TextMenuButton from '../components/TextMenuButton';

export default function Navigation() {
    const [currentLocation, setCurrentLocation] = useRecoilState(currentLocationState)
    const [currentRoom, setCurrentRoom] = useRecoilState(currentRoomState)
    const [currentLocationCommitments, setCurrentLocationCommitments] = useRecoilState(currentLocationCommitmentsState)

    useEffect(() => {
        let location = getCurrenrLocation()
        if (location) {
            setCurrentLocation(location)
        }
    }, [])
    useEffect(() => {
        let room = getCurrentRoom()
        if (room) {
            setCurrentRoom(room)
        }
        let locationCommitments = getCurrentCommitments().filter((commitment) => {
            return commitment.room.location.id === currentLocation?.id
        })
        setCurrentLocationCommitments(locationCommitments)
    }, [currentLocation])

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
                spacing={2}
                sx={{
                    height: "100%",
                    width: "100%",
                    paddingLeft: { xs: 1, sm: 2, md: 4, lg: 6, xl: 8 },
                    position: "absolute",
                    marginBottom: 0,
                    bottom: 0,
                }}
            >
                <RoundIconButton
                    circumference={{ xs: "3rem", sm: "3.5rem", md: "4rem", lg: "5rem", xl: "7rem" }}
                >
                </RoundIconButton>
                {currentLocation.getRooms().map((room) => {
                    return (
                        <Grid
                            paddingY={0}
                        >
                            <TextMenuButton
                                onClick={() => setCurrentRoom(room)}
                            >
                                {room.name}
                            </TextMenuButton>
                        </Grid>
                    )
                })}
            </Grid >
        </>
    );
}
