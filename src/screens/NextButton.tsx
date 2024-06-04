import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { Button } from '@mui/joy';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nextStepButtonVisibleState } from '../atoms/nextStepButtonVisibleState';
import { nextStepLoadingState } from '../atoms/nextStepLoadingState';
import { skipEnabledState } from '../atoms/skipEnabledState';
import { useMyNavigate } from '../utility/useMyNavigate';

export default function NextButton({ nextOnClick }: {
    nextOnClick: (props: StepLabelProps) => void,
}) {
    const [skip, setSkip] = useRecoilState(skipEnabledState)
    const nextStepLoading = useRecoilValue(nextStepLoadingState)
    const nextStepButtonVisible = useRecoilValue(nextStepButtonVisibleState)
    const navigate = useMyNavigate();
    const { t } = useTranslation(["translation"]);
    useEffect(() => {
        window.addEventListener('keydown', onkeydown);

        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'Enter' || event.code == 'Space') {
            nextOnClick({
                t,
                navigate,
            })
            if (skip) {
                setSkip(false)
            }
        }
    }

    return (
        <Button
            variant="solid"
            color="primary"
            size="sm"
            loading={nextStepLoading}
            sx={{
                position: "absolute",
                bottom: -10,
                right: 0,
                width: { xs: 70, sm: 100, md: 150 },
                border: 3,
                zIndex: 100,
            }}
            onClick={() => {
                if (skip) {
                    setSkip(false)
                }
                nextOnClick({
                    t,
                    navigate,
                })
            }}
            component={motion.div}
            animate={{
                opacity: nextStepButtonVisible ? 1 : 0,
                y: nextStepButtonVisible ? 0 : 0,
                pointerEvents: nextStepButtonVisible ? "auto" : "none",
            }}
            transition={{ type: "spring" }}
        >
            {t("next")}
        </Button>
    );
}