import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ProjectRoutes from "./routes/ProjectRoutes";
import GameStartMessage from "./world/staging/StartGame"; // Importa el nuevo componente


const App = () => {
  return (
    <>
      <ProjectRoutes />
      <GameStartMessage /> {/* Agrega el mensaje de inicio */}
      <Login/>
      <SignUp/>
    </>
  );
};

export default App;
