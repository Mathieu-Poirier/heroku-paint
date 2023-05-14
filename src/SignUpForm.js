import React from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

function SignUpForm() {
  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Get the form data
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Prepare the request body
    const requestBody = {
      username,
      email,
      password,
    };

    try {
      // Send the POST request to the backend
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the request was successful
      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log("User signed up successfully");
        // Reset the form
        event.target.reset();
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to sign up");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error occurred", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" align="center">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          {/* Form fields */}
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
          />

          {/* Submit button */}
          <Button fullWidth type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUpForm;
