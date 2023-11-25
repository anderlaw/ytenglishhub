import { Box, Chip, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import LinkIcon from "@mui/icons-material/Link";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import React from "react";
export const NavComponent: React.FC<{
  onMenuItemClick?: (name: string) => void;
  menus?: Array<{
    name: string;
    icon: JSX.Element;
  }>;
}> = ({ onMenuItemClick, menus }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        height: "60px",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "purple",
          fontSize: "17px",
          fontWeight: 600,
        }}
      >
        Chogolish
      </Link>
      {menus && (
        <Box>
          <Stack direction="row" spacing={1}>
            {menus.map((menuItem, index) => {
              return (
                <Chip
                  key={index}
                  onClick={() =>
                    onMenuItemClick && onMenuItemClick(menuItem.name)
                  }
                  icon={menuItem.icon}
                  label={menuItem.name}
                />
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};
export default NavComponent;
