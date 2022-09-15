import React from "react";
import { AppBar, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useTema } from "../contexts/useTheme";
import styled from "@emotion/styled";


// export const NoStyleLink = styled(Link)`
//   text-decoration: none;
//   color: inherit;
// `

const Navbar = () => {
  const { handleTheme } = useTema()
  const [ aberto, setAberto ] = React.useState<boolean>(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  function handleMenu()
  {
    setAberto(!aberto)
  }

  return (
    
      <AppBar position="fixed">
        <Toolbar>
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
            open={aberto}
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
                      autoFocusItem={aberto}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                    >
                      <MenuItem disableGutters>
                          Sample
                      </MenuItem>
                      <MenuItem disableGutters onClick={handleMenu}>
                          SubSample
                      </MenuItem>
                      <MenuItem disableGutters onClick={handleMenu}>
                        Users
                      </MenuItem>
                      <MenuItem disableGutters onClick={handleMenu}>
                          Tests
                      </MenuItem>
                      <MenuItem disableGutters>
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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{`${process.env.NEXT_PUBLIC_REACT_APP_NAME}`}</Typography>
        </Toolbar>
      </AppBar>
    
  )
}

export default Navbar