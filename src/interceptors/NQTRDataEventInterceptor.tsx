import { TimeManager } from '@drincs/nqtr';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentHourState } from '../atoms/currentHourState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';

export default function NQTRDataEventInterceptor() {
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const [_, setHour] = useRecoilState(currentHourState);

    useEffect(() => {
        setHour(TimeManager.currentHour)
    }, [reloadInterfaceDataEvent])

    return null
}
