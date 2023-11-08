import ChapterOneExperience from "../../components/experiences/chapters/ChapterOneExperience";
import { Canvas } from "@react-three/fiber";

const ChapterOne = () => {
  return (
    <Canvas shadows>
      <ChapterOneExperience />;
    </Canvas>
  );
};

export default ChapterOne;
