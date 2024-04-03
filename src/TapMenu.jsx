import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import { useState } from "react";

export const LabelBottomNavigation = () => {
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "100%" }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label='Где найти'
        value='location'
        icon={<LocationOnTwoToneIcon />}
      />
      <BottomNavigationAction
        label='Контакты'
        value='contacts'
        icon={<BusinessTwoToneIcon />}
      />
      <BottomNavigationAction
        label='Цены'
        value='price'
        icon={<ShoppingCartTwoToneIcon />}
      />
    </BottomNavigation>
  );
};
