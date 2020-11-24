import React from "react";
import { Button, TextField } from "@material-ui/core";

function Signup() {
  return (
    <div>
      <TextField id="outlined-basic" label="Display Name" variant="outlined" />
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <TextField id="outlined-basic" label="Password" variant="outlined" />
      <Button variant="contained" color="primary">
        Submit
      </Button>
      <Button variant="contained" color="primary">
        SignUp with Google
      </Button>
    </div>
  );
}

export default Signup;
