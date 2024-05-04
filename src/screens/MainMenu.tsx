import { addImage, clearAllGameDatas, GameStepManager, GameWindowManager } from '@drincs/pixi-vn';
import { Grid } from '@mui/joy';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { openSettingsState } from '../atoms/openSettingsState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import MenuButton from '../components/MenuButton';
import { StartLabel } from '../label/StartLabel';
import { loadGameSave } from '../utility/ActionsUtility';
import { useMyNavigate } from '../utility/useMyNavigate';

export default function MainMenu() {
    const navigate = useMyNavigate();
    const setOpenSettings = useSetRecoilState(openSettingsState);
    const notifyLoadEvent = useSetRecoilState(reloadInterfaceDataEventState);
    const setHideInterface = useSetRecoilState(hideInterfaceState);
    const { t } = useTranslation(["translation"]);

    useEffect(() => {
        setHideInterface(false)
        clearAllGameDatas()
        let bg = addImage("background_main_menu", "https://andreannaking.com/wp-content/uploads/2021/12/Download-Beautiful-Nature-Landscape-Hd-Wallpaper-Full-HD-Wallpapers.jpg")
        bg.load()
    })

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={{ xs: 1, sm: 2, lg: 3 }}
            sx={{
                height: "100%",
                width: "100%",
                paddingLeft: { xs: 1, sm: 2, md: 4, lg: 6, xl: 8 }
            }}
        >
            <Grid>
                <MenuButton
                    onClick={() => {
                        GameWindowManager.removeCanvasElements()
                        GameStepManager.callLabel(StartLabel)
                            .then((result) => {
                                if (result && result.newRoute) {
                                    navigate(result.newRoute)
                                }
                                else {
                                    navigate("/game")
                                }
                            })
                    }}
                >
                    {t("start")}
                </MenuButton>
            </Grid>
            <Grid>
                <MenuButton
                    onClick={() => {
                        loadGameSave(navigate, () => notifyLoadEvent((prev) => prev + 1))
                    }}
                >
                    {t("load")}
                </MenuButton>
            </Grid>
            <Grid>
                <MenuButton
                    onClick={() => { setOpenSettings(true) }}
                >
                    {t("settings")}
                </MenuButton>
            </Grid>
        </Grid>
    );
}
