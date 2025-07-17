import { AuthProvider } from "./auth/auth-provider";
import Routing from "./routing";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routing />
        <Toaster />
      </AuthProvider>
    </div>
  );
};

export default App;
