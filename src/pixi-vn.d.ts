declare module '@drincs/pixi-vn/dist/override' {
    interface StepLabelResult {
        [key: string]: any
    }
    interface StepLabelProps {
        /**
         * function to navigate to a new route.
         * @param route The route to navigate to.
         * @returns 
         */
        navigate: (route: string) => void
        /**
         * Translate a key to a string.
         * @param key The key to translate.
         * @returns The translated string.
         */
        t: TFunction<[string], undefined>
        [key: string]: any
    }
}
