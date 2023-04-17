import React, { forwardRef } from "react";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import { deleteParticipant } from "../API_Service/api";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ParticipantDelete = ({ open, setOpen, Data }) => {
  const notifysuccess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const Remove = async (id) => {
    const response = await deleteParticipant({ _id: Data._id, id: id });
    if (!response) return setOpen(false);
    notifysuccess(response.data.message);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Remove Participant"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this participant?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-around" }}>
          <Button
            variant="contained"
            sx={{ width: "150px" }}
            onClick={handleClose}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            sx={{ width: "150px", "&:hover": { backgroundColor: "red" } }}
            onClick={() => Remove(Data.id)}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ParticipantDelete;
