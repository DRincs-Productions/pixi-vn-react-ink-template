import { addImage, clearAllGameDatas, GameStepManager, GameWindowManager } from '@drincs/pixi-vn';
import Stack from '@mui/joy/Stack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { openSettingsState } from '../atoms/openSettingsState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';
import MenuButton from '../components/MenuButton';
import { startLabel } from '../labels/startLabel';
import { loadGameSave } from '../utility/ActionsUtility';
import { useMyNavigate } from '../utility/useMyNavigate';

export default function MainMenu() {
    const navigate = useMyNavigate();
    const setOpenSettings = useSetRecoilState(openSettingsState);
    const notifyReloadInterfaceDataEvent = useSetRecoilState(reloadInterfaceDataEventState);
    const setHideInterface = useSetRecoilState(hideInterfaceState);
    const { t } = useTranslation(["translation"]);

    useEffect(() => {
        setHideInterface(false)
        clearAllGameDatas()
        let bg = addImage("background_main_menu", "https://andreannaking.com/wp-content/uploads/2021/12/Download-Beautiful-Nature-Landscape-Hd-Wallpaper-Full-HD-Wallpapers.jpg")
        bg.load()
    })

    return (
        <Stack
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
            <MenuButton
                onClick={() => {
                    GameWindowManager.removeCanvasElements()
                    GameStepManager.callLabel(startLabel, {
                        navigate: navigate,
                        t: t
                    }).then(() => {
                        notifyReloadInterfaceDataEvent((prev) => prev + 1)
                    })
                }}
            >
                {t("start")}
            </MenuButton>
            <MenuButton
                onClick={() => {
                    loadGameSave(navigate, () => notifyReloadInterfaceDataEvent((prev) => prev + 1))
                }}
            >
                {t("load")}
            </MenuButton>
            <MenuButton
                onClick={() => { setOpenSettings(true) }}
            >
                {t("settings")}
            </MenuButton>
        </Stack>
    );
}
