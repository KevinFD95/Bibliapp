import Svg, { Path } from "react-native-svg";

const EditIcon = ({ size, filled, selectedColor, unselectedColor }) => {
  <Svg height={size} viewBox="0 -960 960 960" width={size}>
    <Path
      d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"
      fill={filled ? selectedColor : "none"}
      stroke={filled ? selectedColor : unselectedColor}
      strokeWidth={60}
    />
  </Svg>;
};

export default EditIcon;
