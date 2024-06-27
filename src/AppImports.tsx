import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { useI18n } from './i18n';
import MyThemeProvider from './providers/ThemeProvider';

type Iprops = {
    children: React.ReactNode
}

export default function AppImports(props: Iprops) {
    useI18n()

    return (
        <BrowserRouter>
            <RecoilRoot>
                <MyThemeProvider>
                    <SnackbarProvider
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        {props.children}
                    </SnackbarProvider>
                </MyThemeProvider>
            </RecoilRoot>
        </BrowserRouter>
    );
}
