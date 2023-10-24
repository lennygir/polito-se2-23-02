import {
  Box,
  Container,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
} from "@mui/material";

import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MoneyIcon from "@mui/icons-material/Money";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const tabs = [
  {
    name: "Counters",
    icon: <MoneyIcon />,
    url: "counters",
  },
  {
    name: "Services",
    icon: <MedicalServicesIcon />,
    url: "services",
  },
  {
    name: "Users",
    icon: <PersonIcon />,
    url: "users",
  },
];

export default function AdminPage(props) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div id="admin-page">
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List component="nav">
            {tabs.map((tab, index) => (
              <ListItem key={tab.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={tab.url}
                  selected={index === selectedTab}
                  onClick={() => setSelectedTab(index)}
                >
                  <ListItemIcon>{tab.icon}</ListItemIcon>
                  <ListItemText primary={tab.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem key="Log Out" disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                onClick={() => {
                  props.setUser("");
                  setSelectedTab(0);
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </div>
  );
}
