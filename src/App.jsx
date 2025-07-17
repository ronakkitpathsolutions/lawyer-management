import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { colorSchemeManager, defaultColorScheme, theme } from "./theme";

const App = () => {
  return (
    <MantineProvider {...{ theme, defaultColorScheme, colorSchemeManager }}>
      <Notifications />
      <h1>Welcome to the Lawyer Dashboard</h1>
    </MantineProvider>
  )
}

export default App;