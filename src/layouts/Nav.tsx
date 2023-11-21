import { Box, Chip, Stack } from "@mui/material";

import CategoryIcon from "@mui/icons-material/Category";
import LinkIcon from "@mui/icons-material/Link";
import MenuBookIcon from "@mui/icons-material/MenuBook";
export const NavComponent: React.FC<{
  onMenuItemClick?: (name: "category" | "addURL" | "wordBook") => void;
}> = ({ onMenuItemClick }) => {
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
      <Box>Logo here</Box>
      <Box>
        <Stack direction="row" spacing={1}>
          <Chip
            onClick={() => onMenuItemClick && onMenuItemClick("category")}
            icon={<CategoryIcon />}
            label="分类"
          />
          <Chip
            onClick={() => onMenuItemClick && onMenuItemClick("addURL")}
            icon={<LinkIcon />}
            label="添加"
          />
          <Chip
            onClick={() => onMenuItemClick && onMenuItemClick("wordBook")}
            icon={<MenuBookIcon />}
            label="单词本"
          />
        </Stack>
      </Box>
    </Box>
  );
};
export default NavComponent;
