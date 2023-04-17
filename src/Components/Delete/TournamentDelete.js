import React, { forwardRef, useContext } from "react";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { DataContext } from "../Context/Context";
import { Button } from "@mui/material";
import { deleteTournament } from "../API_Service/api";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TournamentDelete = () => {
  const { setDetail, deleteID, setRemove, remove } = useContext(DataContext);

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
    const response = await deleteTournament(id);
    if (!response) return;
    notifysuccess(response.data.message);
    setDetail(response.data);
    setRemove(!remove);
  };

  const handleClose = () => {
    setRemove(false);
  };
  return (
    <>
      <Dialog
        open={remove}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Remove Tournament"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this tournament?
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
            onClick={() => Remove(deleteID)}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TournamentDelete;
