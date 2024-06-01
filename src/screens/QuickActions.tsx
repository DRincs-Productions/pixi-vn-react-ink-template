import { Grid, ModalConfirmation, Typography } from '@drincs/react-components';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { motion } from "framer-motion";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { autoEnabledState } from '../atoms/autoEnabledState';
import { canGoBackState } from '../atoms/canGoBackState';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { openHistoryState } from '../atoms/openHistoryState';
import { openSettingsState } from '../atoms/openSettingsState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import { skipEnabledState } from '../atoms/skipEnabledState';
import TextMenuButton from '../components/TextMenuButton';
import { addQuickSave, goBack, loadGameSave, loadQuickSave, saveGame } from '../utility/ActionsUtility';
import { useMyNavigate } from '../utility/useMyNavigate';

export default function QuickActions() {
    const setOpenSettings = useSetRecoilState(openSettingsState);
    const setOpenHistory = useSetRecoilState(openHistoryState);
    const navigate = useMyNavigate();
    const canGoBack = useRecoilValue(canGoBackState)
    const notifyLoadEvent = useSetRecoilState(reloadInterfaceDataEventState);
    const [openYouSure, setOpenYouSure] = useState(false)
    const [skip, setSkip] = useRecoilState(skipEnabledState)
    const [auto, setAuto] = useRecoilState(autoEnabledState)
    const { t } = useTranslation(["translation"]);
    const hideInterface = useRecoilValue(hideInterfaceState)

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
                component={motion.div}
                animate={{
                    opacity: !hideInterface ? 1 : 0,
                    y: !hideInterface ? 0 : 8,
                }}
                transition={{ type: "tween" }}
            >
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => goBack(navigate, () => { notifyLoadEvent((prev) => prev + 1) })}
                        disabled={!canGoBack}
                        sx={{ pointerEvents: !hideInterface ? "auto" : "none" }}
                    >
                        {t("back")}
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => setOpenHistory(true)}
                        sx={{ pointerEvents: !hideInterface ? "auto" : "none" }}
                    >
                        {t("history")}
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        selected={skip}
                        onClick={() => setSkip((prev) => !prev)}
                        sx={{ pointerEvents: !hideInterface ? "auto" : "none" }}
                    >
                        {t("skip")}
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        selected={auto}
                        onClick={() => setAuto((prev) => !prev)}
                        sx={{ pointerEvents: !hideInterface ? "auto" : "none" }}
                    >
                        {t("auto_forward_time_restricted")}
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={saveGame}
                        sx={{ pointerEvents: !hideInterface ? "auto" : "none" }}
                    >
                        {t("save")}
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => loadGameSave(navigate, () => notifyLoadEvent((prev) => prev + 1))}
                        sx={{ pointerEvents: !hideInterface ? "auto" : "none" }}
                    >
                        {t("load")}
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={addQuickSave}
                        sx={{ pointerEvents: !hideInterface ? "auto" : "none" }}
                    >
                        {t("quick_save_restricted")}
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => setOpenYouSure(true)}
                        disabled={!localStorage.getItem("quickSave")}
                        sx={{ pointerEvents: !hideInterface ? "auto" : "none" }}
                    >
                        {t("quick_load_restricted")}
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => setOpenSettings(true)}
                        sx={{ pointerEvents: !hideInterface ? "auto" : "none" }}
                    >
                        {t("settings_restricted")}
                    </TextMenuButton>
                </Grid>
            </Grid >

            <ModalConfirmation
                open={openYouSure}
                setOpen={setOpenYouSure}
                color="primary"
                headText={t("load")}
                onClick={() => {
                    loadQuickSave(navigate, () => notifyLoadEvent((prev) => prev + 1))
                    return true
                }}
                confirmText={t("confirm")}
                cancelText={t("cancel")}
                startDecorator={<CloudDownloadIcon />}
            >
                <Typography>
                    {t("you_sure_to_quick_load")}
                </Typography>
            </ModalConfirmation>
        </>
    );
}
