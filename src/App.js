import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import SignUpForm from "./SignUpForm";

import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  Search as SearchIcon,
  PlaylistPlay as PlaylistIcon,
  AccountCircle as AccountIcon,
} from "@mui/icons-material";

function App() {
  const handleSignUpFormClose = () => {
    // Logic to handle the close event of the SignUpForm
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={<SignUpForm onClose={handleSignUpFormClose} />}
          />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  const [browseAnchorEl, setBrowseAnchorEl] = useState(null);
  const [newsAnchorEl, setNewsAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const handleBrowseClick = (event) => {
    setBrowseAnchorEl(event.currentTarget);
  };

  const handleNewsClick = (event) => {
    setNewsAnchorEl(event.currentTarget);
  };

  const handleSearchClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleBrowseClose = () => {
    setBrowseAnchorEl(null);
  };

  const handleNewsClose = () => {
    setNewsAnchorEl(null);
  };

  const handleSearchClose = () => {
    setSearchAnchorEl(null);
  };

  const handleAccountClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div>
            {/* Browse */}
            <Button color="inherit" onClick={handleBrowseClick}>
              Browse
            </Button>
            <Menu
              anchorEl={browseAnchorEl}
              open={Boolean(browseAnchorEl)}
              onClose={handleBrowseClose}
            >
              <MenuItem onClick={handleBrowseClose}>Manga</MenuItem>
              <MenuItem onClick={handleBrowseClose}>Games</MenuItem>
              <MenuItem onClick={handleBrowseClose}>Store</MenuItem>
            </Menu>
            <Button color="inherit">Manga</Button>
            <Button color="inherit">Games</Button>
            <Button color="inherit">Store</Button>

            {/* News */}
            <Button color="inherit" onClick={handleNewsClick}>
              News
            </Button>
            <Menu
              anchorEl={newsAnchorEl}
              open={Boolean(newsAnchorEl)}
              onClose={handleNewsClose}
            >
              <MenuItem onClick={handleNewsClose}>News Item 1</MenuItem>
              <MenuItem onClick={handleNewsClose}>News Item 2</MenuItem>
              <MenuItem onClick={handleNewsClose}>News Item 3</MenuItem>
            </Menu>
          </div>

          <div>
            {/* Search */}
            <IconButton color="inherit" onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
            <Menu
              anchorEl={searchAnchorEl}
              open={Boolean(searchAnchorEl)}
              onClose={handleSearchClose}
            >
              <MenuItem>
                <InputBase placeholder="Search..." />
              </MenuItem>
            </Menu>

            {/* Playlist */}
            <IconButton color="inherit">
              <PlaylistIcon />
            </IconButton>

            {/* Account */}
            <IconButton
              color="inherit"
              onClick={handleAccountClick}
              aria-controls="account-menu"
              aria-haspopup="true"
            >
              <AccountIcon />
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={accountAnchorEl}
              open={Boolean(accountAnchorEl)}
              onClose={handleAccountClose}
            >
              <MenuItem component={Link} to="/signup">
                Sign Up
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
