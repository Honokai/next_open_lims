import React from "react";
import { ChevronLeft, DeleteOutline, ExpandLess, ExpandMore, FolderCopyRounded, LocalShippingOutlined, NewReleasesOutlined, QueryStats, ScienceOutlined } from "@mui/icons-material";
import {Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled} from "@mui/material";
import { GenericObjectKeyType } from "../Helpers/TypeHelpers";
import { Box } from "@mui/system";
import Link from "next/link";

interface SidebarProps {
  handleDrawer: () => void
  open: boolean
}

const SideBarContainer = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.sidebar.main ? theme.palette.sidebar.main : "black",
  zIndex: "1500",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden", 
  height: "100vh", 
  position: "absolute", 
  top: "0", left: "0", transition: "ease-in-out 500ms", 
})
)
export const Sidebar = ({open, handleDrawer}: SidebarProps) => {
  const [section, setSection] = React.useState<GenericObjectKeyType>({samples: false, subSamples: false})

  function handleSection(expandSection: string)
  {
    setSection({...section, [expandSection]: !section[expandSection]})
  }

  return (
    <SideBarContainer style={{width: open ? "240px" : "0"}}>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <IconButton onClick={handleDrawer}>
          <ChevronLeft/>
        </IconButton>
      </div>
      <List sx={{color: "sidebar.contrastText"}}>
        <ListItem disableGutters>
          <ListItemButton id="samples" onClick={(e) => handleSection(e.currentTarget.id)}>
            <ListItemIcon>
              <ScienceOutlined sx={{color: "sidebar.contrastText"}}/>
            </ListItemIcon>
            <ListItemText>
              Samples
            </ListItemText>
            {section.samples ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={section.samples}>
          <List component="div" disablePadding>
            <ListItemButton LinkComponent={Link} href="/samples" sx={{ pl: 4 }}>
              <ListItemIcon>
                <NewReleasesOutlined sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="Created" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ScienceOutlined sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="All" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalShippingOutlined sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="In Transit" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <QueryStats sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="In Analysis" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DeleteOutline sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="Discarted" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem disableGutters>
          <ListItemButton id="subSamples" onClick={(e) => handleSection(e.currentTarget.id)}>
            <ListItemIcon>
              <FolderCopyRounded sx={{color: "sidebar.contrastText"}}/>
            </ListItemIcon>
            <ListItemText>
              SubSamples
            </ListItemText>
            {section.subSamples ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={section.subSamples}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <NewReleasesOutlined sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="Created" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ScienceOutlined sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="All" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalShippingOutlined sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="In Transit" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <QueryStats sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="In Analysis" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DeleteOutline sx={{color: "sidebar.contrastText"}}/>
              </ListItemIcon>
              <ListItemText primary="Discarted" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </SideBarContainer>
  )
}