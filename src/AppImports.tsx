import { TimeManager } from '@drincs/nqtr';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import MyThemeProvider from './providers/ThemeProvider';

type Iprops = {
    children: React.ReactNode
}

export default function AppImports(props: Iprops) {
    const { t } = useTranslation(["translation"]);
    useEffect(() => {
        TimeManager.settings = {
            defaultTimeSpent: 1,
            maxDayHours: 24,
            minDayHours: 0,
            timeSlots: [
                { name: t('morning'), startHour: 5 },
                { name: t('afternoon'), startHour: 12 },
                { name: t('evening'), startHour: 18 },
                { name: t('night'), startHour: 22 }
            ],
            weekDaysNames: [t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday'), t('sunday')],
            weekendStartDay: 6,
            weekLength: 7,
        }
    }, []);

    return (
        <BrowserRouter>
            <RecoilRoot>
                <MyThemeProvider>
                    {props.children}
                </MyThemeProvider>
            </RecoilRoot>
        </BrowserRouter>
    );
}
