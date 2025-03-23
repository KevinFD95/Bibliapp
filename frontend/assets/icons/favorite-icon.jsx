import Svg, { Path } from "react-native-svg";

const FavoriteIcon = ({ size, filled, selectedColor, unselectedColor }) => {
  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
        fill={filled ? selectedColor : "none"}
        stroke={filled ? selectedColor : unselectedColor}
        strokeWidth={60}
      />
    </Svg>
  );
};

export default FavoriteIcon;
