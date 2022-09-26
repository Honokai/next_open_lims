import React from "react";
import { AppBar, ClickAwayListener, Grow, IconButton, Link, MenuItem, MenuList, Paper, Popper, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useTema } from "../contexts/useTheme";
import { Sidebar } from "./Sidebar";

const Navbar = () => {
  const { handleTheme } = useTema()
  const [ menuStatus, setMenuStatus ] = React.useState({principalOpen: false, drawerOpen: false})
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  function handleMenu()
  {
    setMenuStatus({...menuStatus, principalOpen: !menuStatus.principalOpen})
  }

  function handleDrawer()
  {
    setMenuStatus({...menuStatus, drawerOpen: !menuStatus.drawerOpen})
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawer}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link underline="none" href={"/"} sx={{color: "primary.contrastText"}}>
              {`${process.env.NEXT_PUBLIC_REACT_APP_NAME}`}
            </Link>
          </Typography>
          <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            ref={anchorRef}
            onClick={handleMenu}
          >
            <MenuIcon/>
          </IconButton>
          <Popper
            open={menuStatus.principalOpen}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleMenu}>
                    <MenuList
                      autoFocusItem={menuStatus.principalOpen}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                    >
                      <MenuItem>
                        Sample
                      </MenuItem>
                      <MenuItem onClick={handleMenu}>
                        SubSample
                      </MenuItem>
                      <MenuItem onClick={handleMenu}>
                        Users
                      </MenuItem>
                      <MenuItem onClick={handleMenu}>
                          Tests
                      </MenuItem>
                      <MenuItem component={Link} underline="none" href={"/login"} onClick={handleMenu}>
                        Login
                      </MenuItem>
                      <MenuItem onClick={() => {
                        handleMenu()
                        handleTheme()
                      }}>
                        Tema
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>
      <Sidebar open={menuStatus.drawerOpen} handleDrawer={handleDrawer}/>
    </>
  )
}

export default Navbar