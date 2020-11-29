import AppRouter from "./Router/Router";
import AuthContextProvider from "./context/AuthContext";
function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
