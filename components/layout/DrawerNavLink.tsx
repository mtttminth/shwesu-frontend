import { FC } from "react";
import Link from "next/link";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Category, NavItem } from "@/lib/types";

interface DrawerNavLinkProps {
  item: NavItem;
  categories: Category[];
  drawerCategoryOpen: boolean;
  handleDrawerCategoryClick: () => void;
}

const DrawerNavLink: FC<DrawerNavLinkProps> = ({
  item,
  categories,
  drawerCategoryOpen,
  handleDrawerCategoryClick,
}) => {
  return (
    <Box key={item.label}>
      {item.dropdownItems ? (
        <>
          <ListItemButton onClick={handleDrawerCategoryClick}>
            <ListItemText primary={item.label} />
            {drawerCategoryOpen ? <MdExpandLess /> : <MdExpandMore />}
          </ListItemButton>
          <Collapse in={drawerCategoryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories.map((category) => (
                <Box key={category.id}>
                  <ListItemButton sx={{ pl: 4, pointerEvents: "none" }}>
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                  {/* Subcategories */}
                  {category.subcategories.map((subcategory) => (
                    <Link
                      href={`/${category.slug}/${subcategory.slug}`}
                      passHref
                      legacyBehavior
                      key={subcategory.id}
                    >
                      <ListItemButton component="a" sx={{ pl: 8 }}>
                        <ListItemText primary={subcategory.name} />
                      </ListItemButton>
                    </Link>
                  ))}
                </Box>
              ))}
            </List>
          </Collapse>
        </>
      ) : (
        <ListItemButton
          component={Link}
          href={item.href || ""}
          key={item.label}
        >
          <ListItemText primary={item.label} />
        </ListItemButton>
      )}
    </Box>
  );
};

export default DrawerNavLink;
