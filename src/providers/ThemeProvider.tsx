import { CssVarsProvider, extendTheme, get10ColorShades } from '@drincs/react-components';
import { createContext, useContext, useMemo, useState } from 'react';

type Iprops = {
    children: React.ReactNode
}
type SolidColorType = "black" | "white"

const ColorContext = createContext<{
    primaryColor: string,
    setPrimaryColor: (color: string) => void,
    solidColor: SolidColorType,
    setSolidColor: (color: SolidColorType) => void,

}>({
    primaryColor: "",
    setPrimaryColor: () => { },
    solidColor: "white",
    setSolidColor: () => { },
})

export function useEditColorProvider() {
    const context = useContext(ColorContext);
    if (context === undefined) {
        throw new Error("usePrimaryColorProvider must be used within a PrimaryColorProvider")
    }
    return context;
}

export default function MyThemeProvider({ children }: Iprops) {
    const [primaryColor, setPrimaryColor] = useState(localStorage.getItem("primaryColor") || '#1c73ff')
    const [solidColor, setSolidColor] = useState<SolidColorType>(localStorage.getItem("solidColor") as SolidColorType || "white")


    // Build the theme: https://mui.com/joy-ui/customization/theme-builder
    const theme = useMemo(() => {
        // Debouncing
        localStorage.setItem("primaryColor", primaryColor)
        localStorage.setItem("solidColor", solidColor)

        let colors = get10ColorShades(primaryColor)
        return extendTheme({
            colorSchemes: {
                light: {
                    palette: {
                        primary: {
                            ...colors,
                            solidColor: solidColor === "black" ? "var(--joy-palette-common-black)" : "var(--joy-palette-common-white)",
                        },
                    },
                },
                dark: {
                    palette: {
                        primary: {
                            ...colors,
                            solidColor: solidColor === "black" ? "var(--joy-palette-common-black)" : "var(--joy-palette-common-white)",
                        },
                    },
                },
            },
            components: {
                JoyButton: {
                    styleOverrides: {
                        root: {
                            pointerEvents: "auto",
                            userSelect: "none",
                        },
                    },
                },
                JoyLink: {
                    styleOverrides: {
                        root: {
                            pointerEvents: "auto",
                        },
                    },
                },
                JoySvgIcon: {
                    styleOverrides: {
                        root: {
                            pointerEvents: "auto",
                        },
                    },
                },
                MuiSvgIcon: {
                    styleOverrides: {
                        root: {
                            pointerEvents: "auto",
                        },
                    },
                },
                JoyCard: {
                    styleOverrides: {
                        root: {
                            pointerEvents: "auto",
                        },
                    },
                },
                JoyIconButton: {
                    styleOverrides: {
                        root: {
                            pointerEvents: "auto",
                        }
                    }
                }
            }
        })
    }, [primaryColor, solidColor])

    return (
        <CssVarsProvider
            themeJoy={theme}
            defaultMode="system"
        >
            <ColorContext.Provider value={{
                primaryColor: primaryColor,
                setPrimaryColor: setPrimaryColor,
                solidColor: solidColor,
                setSolidColor: setSolidColor,
            }}>
                {children}
            </ColorContext.Provider>
        </CssVarsProvider>
    );
}
