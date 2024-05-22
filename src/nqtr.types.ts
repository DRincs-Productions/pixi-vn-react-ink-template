declare module '@drincs/nqtr/dist/override' {
    interface OnRunActivityProps {
        navigate: (route: string) => void,
        [key: string]: any
    }
}
