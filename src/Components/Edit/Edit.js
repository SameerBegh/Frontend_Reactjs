import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { updateTournament } from "../API_Service/api";
import { DataContext } from "../Context/Context";
import { Button, Table, TableCell, TableRow } from "@mui/material";
import { toast } from "react-toastify";

const Edit = ({ open, setOpen }) => {
  const {
    editID,
    editName,
    setEditName,
    editStartDate,
    setEditStartDate,
    editEndDate,
    setEditEndDate,
  } = useContext(DataContext);

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
  const notifyError = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const editTournament = async () => {
    // form input valid
    if (!editName) {
      notifyError("Please enter valid input for field");
      return;
    } else if (editName === " ") {
      notifyError("Please enter valid Tournament name");
      return;
    } else if (!editStartDate) {
      notifyError("Please enter valid Start-Date");
      return;
    } else if (!editEndDate) {
      notifyError("Please enter valid End-Date");
      return;
    }
    let response = await updateTournament({
      _id: editID,
      name: editName,
      startDate: editStartDate,
      endDate: editEndDate,
    });
    if (!response) return setOpen(!open);
    notifysuccess(response.data.message);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            textAlign: "center",
            color: "#1976d2",
            fontWeight: "550",
            fontSize: "22px",
          }}
        >
          {" "}
          Edit Tournament
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
            label="Enter Tournament name"
            variant="outlined"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ m: "1rem 0", width: "265px" }}
          />

          <Table>
            <TableRow>
              <TableCell
                style={{
                  border: "none",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                Start-Date
              </TableCell>
              <TableCell style={{ border: "none", textAlign: "center" }}>
                <input
                  type="date"
                  value={editStartDate}
                  onChange={(e) => setEditStartDate(e.target.value)}
                  style={{
                    height: "35px",
                    width: "150px",
                    textAlign: "center",
                    fontSize: "16px",
                    borderRadius: "3px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{
                  border: "none",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                End-Date
              </TableCell>
              <TableCell style={{ border: "none", textAlign: "center" }}>
                <input
                  type="date"
                  value={editEndDate}
                  onChange={(e) => setEditEndDate(e.target.value)}
                  style={{
                    height: "35px",
                    width: "150px",
                    textAlign: "center",
                    fontSize: "16px",
                    borderRadius: "3px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                />
              </TableCell>
            </TableRow>
          </Table>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: "10px" }}>
          <Button
            onClick={editTournament}
            variant="contained"
            sx={{ width: "100px" }}
          >
            Edit
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ width: "100px" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Edit;
