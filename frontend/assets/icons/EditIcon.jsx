import Svg, { Path } from "react-native-svg";

import { useContext } from "react";
import { ThemeContext } from "../../src/context/ThemeContext.jsx";

const EditIcon = ({ size }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
        fill={theme["selected-icons"]}
        stroke={theme["selected-icons"]}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default EditIcon;
