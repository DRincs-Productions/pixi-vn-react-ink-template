import { getCurrenrLocation, getCurrentCommitments, getCurrentRoom } from '@drincs/nqtr';
import { useEffect } from 'react';

export default function Dialogue() {
    useEffect(() => {
        let currentRoom = getCurrentRoom()
        let currentLocation = getCurrenrLocation()
        let locationCommitments = getCurrentCommitments().filter((commitment) => {
            return commitment.room.location.id === currentLocation?.id
        })
    })

    return (
        <>
        </>
    );
}
