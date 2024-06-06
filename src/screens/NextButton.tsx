import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { Button } from '@drincs/react-components';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nextStepButtonHiddenState } from '../atoms/nextStepButtonHiddenState';
import { nextStepLoadingState } from '../atoms/nextStepLoadingState';
import { skipEnabledState } from '../atoms/skipEnabledState';
import { useMyNavigate } from '../utility/useMyNavigate';

export default function NextButton({ nextOnClick }: {
    nextOnClick: (props: StepLabelProps) => void,
}) {
    const [skip, setSkip] = useRecoilState(skipEnabledState)
    const nextStepLoading = useRecoilValue(nextStepLoadingState)
    const nextStepButtonHidden = useRecoilValue(nextStepButtonHiddenState)
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
            variants={{
                open: {
                    opacity: 1,
                    pointerEvents: "auto",
                },
                closed: {
                    opacity: 0,
                    pointerEvents: "none",
                }
            }}
            initial={"closed"}
            animate={nextStepButtonHidden ? "closed" : "open"}
            exit={"closed"}
        >
            {t("next")}
        </Button>
    );
}
