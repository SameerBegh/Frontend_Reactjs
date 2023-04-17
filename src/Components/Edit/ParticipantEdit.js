import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { DataContext } from "../Context/Context";
import { editParticipant } from "../API_Service/api";

const ParticipantEdit = ({ edit, setEdit, editID }) => {
  const {
    editParticipantName,
    setEditParticipantName,
    editEmail,
    setEditEmail,
    editMobile,
    setEditMobile,
  } = useContext(DataContext);

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

  const EditParticipant = async () => {
    if (editParticipantName === "") {
      notifyError("Please enter valid input for field");
      return;
    } else if (editParticipantName === " ") {
      notifyError("Please enter valid User name");
      return;
    } else if (!emailRegex.test(editEmail)) {
      notifyError("Please enter a valid email address");
      return;
    } else if (!mobileregex.test(editMobile)) {
      notifyError("Please enter valid Mobile number");
      return;
    }

    const response = await editParticipant({
      _id: editID._id,
      id: editID.id,
      name: editParticipantName,
      email: editEmail,
      mobile: editMobile,
    });

    if (!response) return setEdit(!edit);
    notifysuccess(response.data.message);
    setEdit(!edit);
  };

  const handleClose = () => {
    setEdit(false);
  };

  return (
    <>
      <Dialog open={edit} onClose={handleClose}>
        <DialogTitle
          sx={{
            textAlign: "center",
            color: "#1976d2",
            fontWeight: "550",
            fontSize: "22px",
          }}
        >
          Edit Form
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
            label="Name"
            variant="outlined"
            value={editParticipantName}
            onChange={(e) => setEditParticipantName(e.target.value)}
            sx={{ m: "1rem 0", width: "265px" }}
          />
          <TextField
            id="outlined-size-small"
            size="small"
            label="Email"
            variant="outlined"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            sx={{ m: "1rem 0", width: "265px" }}
          />

          <TextField
            autoFocus
            id="outlined-size-small"
            size="small"
            label="Mobile Number"
            variant="outlined"
            value={editMobile}
            type="number"
            className="number"
            onChange={(e) => setEditMobile(e.target.value)}
            sx={{ m: "1rem 0", width: "265px" }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: "10px" }}>
          <Button
            onClick={EditParticipant}
            variant="contained"
            sx={{ width: "120px", marginRight: "1rem" }}
          >
            Edit
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

export default ParticipantEdit;
