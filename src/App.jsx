import { AuthProvider } from "./auth/auth-provider";
import Routing from "./routing";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </div>
  );
};

export default App;
