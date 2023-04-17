import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tournamentlist from "./Tournamentlist";
import { createTournament, getTournament } from "./API_Service/api";
import { DataContext } from "./Context/Context";
import { Box, Table, TableCell, TableRow, Typography } from "@mui/material";
import { toast } from "react-toastify";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Addtournament = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { tournamentData, setTournamentData } = useContext(DataContext);
  const GetTournaments = useRef();

  // Toastify for error and success msgs alert
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    GetTournaments.current();
  }, [tournamentData]);

  const Tournaments = async () => {
    const response = await getTournament();
    if (response.status === 200) {
      if (response.data === null) {
        return;
      } else {
        setTournamentData(response.data);
      }
    }
  };

  GetTournaments.current = Tournaments;

  const addTournament = async () => {
    // form input valid
    if (!name) {
      notifyError("Please enter valid input for field");
      return;
    } else if (name === " ") {
      notifyError("Please enter valid Tournament name");
      return;
    } else if (!startDate) {
      notifyError("Please enter valid Start-Date");
      return;
    } else if (!endDate) {
      notifyError("Please enter valid End-Date");
      return;
    }
    let response = await createTournament({
      name: name,
      startDate: startDate,
      endDate: endDate,
    });
    if (!response) return;
    notifysuccess(response.data.message);
    // Tournaments();
    setOpen(false);
    setName("");
    setStartDate("");
    setEndDate("");
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <Box>
        <Button
          variant="contained"
          startIcon={<AddIcon style={{ fontSize: "28px" }} />}
          onClick={handleClickOpen}
          sx={{
            margin: "25px auto 10px",
            display: "flex",
            padding: "12px 15px",
            fontSize: "17px",
            backgroundColor: "#111",
          }}
        >
          Add New tournament
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              color: "#1976d2",
              fontWeight: "550",
              fontSize: "22px",
            }}
          >
            {" "}
            New Tournament
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
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
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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
              onClick={addTournament}
              variant="contained"
              sx={{ width: "100px" }}
            >
              Add
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
      </Box>
      <Box>
        <Tournamentlist data={tournamentData} />;
      </Box>
      {tournamentData?.length ? null : (
        <Typography sx={{ textAlign: "center", fontSize: "22px" }}>
          No Tournaments!
        </Typography>
      )}
    </>
  );
};

export default Addtournament;
