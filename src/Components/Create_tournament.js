import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tournament_list from "./Tournament_list";
import { createTournament, getTournament } from "./API_Service/api";
import { DataContext } from "./Context/Context";

const Create_tournament = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { tournamentData, setTournamentData } = useContext(DataContext);

  const [open, setOpen] = useState(false);
  const GetTournaments = useRef();

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
    let response = await createTournament({
      name: name,
      startDate: startDate,
      endDate: endDate,
    });
    if (!response) return;
    Tournaments();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleClickOpen}
          sx={{
            m: "20px auto",
            display: "flex",
            padding: "12px 15px",
          }}
        >
          Add New tournament
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle> New Tournament</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              width: "300px",
              flexDirection: "column",
              padding: "30px",
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
              sx={{ m: "1rem 0", width: "240px" }}
            />

            <table style={{ margin: "20px, 0" }}>
              <tr>
                <td>Start-Date</td>
                <tr>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </tr>
              </tr>
              <tr>
                <td>End-Date</td>
                <td>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </td>
              </tr>
            </table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addTournament} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Tournament_list data={tournamentData} />;
      </div>
    </>
  );
};

export default Create_tournament;
