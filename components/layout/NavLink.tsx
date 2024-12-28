"use client";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Category, NavItem } from "@/lib/types";
import { useState } from "react";
import { Dropdown } from "react-nested-dropdown";
import "react-nested-dropdown/dist/styles.css";
import { MdCategory } from "react-icons/md";

interface NavLinkProps {
  item: NavItem;
  categories: Category[];
}

const NavLink: React.FC<NavLinkProps> = ({ item, categories }) => {
  const setAnchorEl = useState<null | HTMLElement>(null)[1];
  const setPopoverAnchorEl = useState<null | HTMLElement>(null)[1];
  const setActiveCategory = useState<Category | null>(null)[1];

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setPopoverAnchorEl(null);
    setActiveCategory(null);
  };

  const router = useRouter();
  const items = categories.map((element) => ({
    label: element.name,
    items: element.subcategories.map((sub) => ({
      label: sub.name,
      onSelect: () => router.push(`/categories/${sub.slug}`),
    })),
  }));
  return (
    <Box key={item.label} sx={{ my: 2, display: "block" }}>
      {item.dropdownItems ? (
        <Box onMouseEnter={handleOpenMenu} onMouseLeave={handleCloseMenu}>
          <Dropdown items={items} containerWidth="300px" closeOnScroll={true}>
            {({ isOpen, onClick }) => (
              <button type="button" onClick={onClick}>
                {isOpen ? (
                  <MdCategory className="text-xl mr-2" />
                ) : (
                  <MdCategory className="text-xl mr-2" />
                )}{" "}
                <span>CATEGORIES</span>
              </button>
            )}
          </Dropdown>
        </Box>
      ) : (
        <Button color="inherit">
          <Link
            href={item.href || ""}
            style={{
              textDecoration: "none",
              color: "inherit",
              paddingLeft: "0.8rem",
              paddingRight: "0.8rem",
            }}
          >
            {item.label}
          </Link>
        </Button>
      )}
    </Box>
  );
};

export default NavLink;
