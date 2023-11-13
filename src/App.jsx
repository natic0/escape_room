import ProjectRoutes from "./routes/ProjectRoutes";
import GameStartMessage from "./world/staging/StartGame"; // Importa el nuevo componente


const App = () => {
  return (
    <>
      <ProjectRoutes />
      <GameStartMessage /> {/* Agrega el mensaje de inicio */}

    </>
  );
};

export default App;
