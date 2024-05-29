import { ErrorBoundary } from "react-error-boundary";
import AppImports from './AppImports';
import AppRoutes from './AppRoutes';
import EventInterceptor from './EventInterceptor';
import Settings from './screens/Settings';

function App() {
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <AppImports>
                <AppRoutes />
                <Settings />
                <EventInterceptor />
            </AppImports>
        </ErrorBoundary >
    )
}

export default App
