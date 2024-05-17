class ActivityOnRunProps {
    constructor(navigate: (path: string) => void) {
        this.navigate = navigate
    }
    navigate: (path: string) => void
}
