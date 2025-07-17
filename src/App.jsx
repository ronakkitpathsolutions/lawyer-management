import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { colorSchemeManager, defaultColorScheme, theme } from "./theme";
import { AuthProvider } from "./auth/auth-provider";
import Routing from "./routing";

const App = () => {
  return (
    <MantineProvider {...{ theme, defaultColorScheme, colorSchemeManager }}>
      <Notifications />
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </MantineProvider>
  )
}

export default App;