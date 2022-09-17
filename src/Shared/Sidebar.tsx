import React from "react";
import { ChevronLeft, ExpandLess, ExpandMore, FolderCopyRounded, InboxRounded, StarBorder } from "@mui/icons-material";
import {Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { GenericObjectKeyType } from "../Helpers/TypeHelpers";

interface SidebarProps {
  handleDrawer: () => void
  open: boolean
}

export const Sidebar = ({open, handleDrawer}: SidebarProps) => {
  const [section, setSection] = React.useState<GenericObjectKeyType>({section1: false, section2: false})

  function handleSection(expandSection: string)
  {
    setSection({...section, [expandSection]: !section[expandSection]})
  }
  return (
    <div style={{backgroundColor: "#525", zIndex: "1500", display: "flex", flexDirection: "column", width: open ? "240px" : "0", overflow: "hidden", height: "100vh", position: "absolute", top: "0", left: "0", transition: "ease-in-out 500ms", }}>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <IconButton onClick={handleDrawer}>
          <ChevronLeft/>
        </IconButton>
      </div>
      <List>
        <ListItem disableGutters>
          <ListItemButton>
            <ListItemIcon>
              <InboxRounded/>
            </ListItemIcon>
            <ListItemText>
              Entrar
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton id="section1" onClick={(e) => handleSection(e.currentTarget.id)}>
            <ListItemIcon>
              <FolderCopyRounded/>
            </ListItemIcon>
            <ListItemText>
              Entrar
            </ListItemText>
            {section.section1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={section.section1}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  )
}