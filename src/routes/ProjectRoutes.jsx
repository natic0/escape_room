import { Route, Routes } from "react-router-dom";
import Template from "../pages/example/Example";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Template />} />
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
