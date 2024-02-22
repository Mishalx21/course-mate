"use client";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UserProfilePage = () => {
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [showPhotoUpdate, setShowPhotoUpdate] = useState(false);

  const handleProfileClick = () => {
    setShowProfileUpdate(true);
    setShowPhotoUpdate(false);
  };

  const handlePhotoClick = () => {
    setShowProfileUpdate(false);
    setShowPhotoUpdate(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ width: 100, height: 100, my: 2 }} />
                <Typography variant="h6">User Name</Typography>
                <Button onClick={handleProfileClick} sx={{ my: 1 }}>
                  Profile
                </Button>
                <Button onClick={handlePhotoClick} sx={{ my: 1 }}>
                  Photo
                </Button>
              </Box>
            </Paper>
          </Grid>
          {/* Content */}
          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ p: 2 }}>
              {/* Profile Update */}
              {showProfileUpdate && (
                <Box>
                  <Typography variant="h5">Profile Update</Typography>
                  {/* Your profile update form or components */}
                </Box>
              )}
              {/* Photo Update */}
              {showPhotoUpdate && (
                <Box>
                  <Typography variant="h5">Photo Update</Typography>
                  {/* Your photo update form or components */}
                </Box>
              )}
              {/* Other contents */}
              {!showProfileUpdate && !showPhotoUpdate && (
                <Box>
                  <Typography variant="h5">Other Contents</Typography>
                  {/* Other contents of the page */}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
