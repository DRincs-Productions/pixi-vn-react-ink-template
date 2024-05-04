import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { hideInterfaceState } from './atoms/hideInterfaceState';
import Dialogue from './screens/Dialogue';
import History from './screens/History';
import MainMenu from './screens/MainMenu';
import Navigation from './screens/Navigation';
import QuickActions from './screens/QuickActions';

export default function AppRoutes() {
    const hideInterface = useRecoilValue(hideInterfaceState)

    return (
        <Routes>
            <Route key={"main_menu"} path={"/"} element={<MainMenu />} />
            <Route key={"game"} path={"/game"}
                element={<>
                    <History />
                    {hideInterface ? null :
                        <>
                            <QuickActions />
                            <Dialogue />
                        </>}
                </>}
            />
            <Route key={"navigation"} path={"/navigation"} element={<Navigation />} />
        </Routes>
    )
}
