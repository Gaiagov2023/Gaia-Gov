import { AuthProvider } from "../hooks/useAuth";
import { DrawerProvider } from "../hooks/useDrawer";

const allProviders = [DrawerProvider, AuthProvider];

const mergeAllComponents = (components) =>
  components.reduce(
    (AccumulatedComponents, NewComponent) =>
      ({ children }) =>
        (
          <AccumulatedComponents>
            <NewComponent>{children}</NewComponent>
          </AccumulatedComponents>
        ),
    ({ children }) => children
  );

export const Providers = mergeAllComponents(allProviders);
