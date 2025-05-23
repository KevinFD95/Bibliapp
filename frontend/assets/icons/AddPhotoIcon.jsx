import { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../../src/context/ThemeContext";

const AddPhotoIcon = ({ size }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg height={size} viewBox="0 -960 960 960" width={size}>
      <Path
        d="M760-680v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h280v160h80v80h160v400q0 33-23.5 56.5T760-120H120Z"
        fill={theme["selected-icons"]}
        stroke={theme["selected-icons"]}
        strokeWidth={2}
      />
    </Svg>
  );
};

export default AddPhotoIcon;
