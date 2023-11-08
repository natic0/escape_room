import { Route, Routes } from "react-router-dom";
import ChapterOne from "../pages/chapters/ChapterOne";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ChapterOne />} />
        <Route path="/chapter_one" element={<ChapterOne />} />
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
