import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { addParticipant } from "./API_Service/api";
import "../App.css"

const Register = ({ joinOpen, setJoinOpen, ID }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Toastify for error and success msgs alert
  const notifysuccess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notifyError = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  // validating an email/Phone/password with Regex
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const mobileregex = /^(?:(?:\+|0{0,2})91(\s*[/-]\s*)?|[0]?)?[6789]\d{9}$/;

  const Participant = async () => {
    if (name === "") {
      notifyError("Please enter valid input for field");
      return;
    } else if (name === " ") {
      notifyError("Please enter valid User name");
      return;
    } else if (!emailRegex.test(email)) {
      notifyError("Please enter a valid email address");
      return;
    } else if (!mobileregex.test(mobile)) {
      notifyError("Please enter valid Mobile number");
      return;
    }

    const response = await addParticipant({
      _id: ID,
      name,
      email,
      mobile,
    });

    if (!response) return setJoinOpen(!joinOpen);
    notifysuccess(response.data.message);
    setJoinOpen(!joinOpen);
  };

  const handleClose = () => {
    setJoinOpen(false);
  };

  return (
    <>
      <Dialog open={joinOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            textAlign: "center",
            color: "#1976d2",
            fontWeight: "550",
            fontSize: "22px",
          }}
        >
          Registration Form
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            width: "300px",
            flexDirection: "column",
            padding: "30px",
            alignItems: "center",
          }}
        >
          <TextField
            autoFocus
            id="outlined-size-small"
            size="small"
            label="Enter Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ m: "1rem 0", width: "265px" }}
          />
          <TextField
            id="outlined-size-small"
            size="small"
            label="Enter Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ m: "1rem 0", width: "265px" }}
          />

          <TextField
            id="outlined-size-small"
            size="small"
            label="Enter  Mobile Number"
            variant="outlined"
            value={mobile}
            type="number"
            className="number"
            onChange={(e) => setMobile(e.target.value)}
            sx={{ m: "1rem 0", width: "265px" }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: "10px" }}>
          <Button
            onClick={Participant}
            variant="contained"
            sx={{ width: "120px", marginRight: "1rem" }}
          >
            Register
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ width: "120px" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Register;
