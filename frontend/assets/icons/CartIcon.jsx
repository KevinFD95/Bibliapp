import Svg, { Path } from "react-native-svg";

import { useContext } from "react";
import { ThemeContext } from "../../src/context/ThemeContext.jsx";

const CartIcon = ({ size }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Svg height={size} width={size} viewBox="0 -960 960 960">
      <Path
        d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM208-800h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Z"
        fill={theme["selected-icons"]}
        stroke={theme["selected-icons"]}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default CartIcon;
