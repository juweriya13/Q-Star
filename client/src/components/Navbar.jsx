import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/slices/userSlice.js";
import toast from "react-hot-toast";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const menuItems = [
    {
      title: "Events",
      link: "/events",
    },
    {
      title: "Create",
      link: "/create",
    },
  ];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <AcmeLogo />
        <RouterLink to="/" className="font-bold text-inherit">
          CampusEventHub
        </RouterLink>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarContent className="hidden sm:flex gap-4 mr-4" justify="end">
          <NavbarItem>
            <RouterLink color="foreground" to="/events">
              Events
            </RouterLink>
          </NavbarItem>
          <NavbarItem>
            <RouterLink color="foreground" to="/create">
              Create
            </RouterLink>
          </NavbarItem>
        </NavbarContent>

        {/* User */}
        {user ? (
          <Dropdown placement="bottom-end" className="dark">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={`${import.meta.env.VITE_SERVER_IMAGES}/${user.profile}`}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="dark:text-white"
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                key="settings"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button color="secondary" onClick={() => navigate("/auth")}>
            Login
          </Button>
        )}
      </NavbarContent>

      <NavbarMenu className="dark">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <RouterLink
              className="w-full text-fuchsia-500"
              to={item.link}
              size="lg"
            >
              {item.title}
            </RouterLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
