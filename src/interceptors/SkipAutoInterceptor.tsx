import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { autoEnabledState } from '../atoms/autoEnabledState';
import { skipEnabledState } from '../atoms/skipEnabledState';
import { useMyNavigate } from '../utility/useMyNavigate';

export default function SkipAutoInterceptor({ nextOnClick }: {
    nextOnClick: (props: StepLabelProps) => Promise<void>,
}) {
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);
    const skipEnabled = useRecoilValue(skipEnabledState)
    const autoEnabled = useRecoilValue(autoEnabledState)
    const [recheckSkipAuto, setRecheckSkipAuto] = useState<number>(0)

    useEffect(() => {
        if (skipEnabled || autoEnabled) {
            nextOnClick({
                t,
                navigate,
            }).then(() => {
                nextOnClickInternal()
            })
        }
    }, [skipEnabled, recheckSkipAuto, autoEnabled])

    function nextOnClickInternal() {
        if (skipEnabled) {
            setTimeout(() => {
                setRecheckSkipAuto((p) => p + 1)
            }, 200);
        }
        else if (autoEnabled) {
            let autoForwardSecond = localStorage.getItem('auto_forward_second')
            if (autoForwardSecond) {
                let millisecond = parseInt(autoForwardSecond) * 1000
                setTimeout(() => {
                    setRecheckSkipAuto((p) => p + 1)
                }, millisecond);
            }
        }
    }

    return null
}
