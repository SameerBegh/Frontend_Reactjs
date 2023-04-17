import axios from "axios";
import { toast } from "react-toastify";

const URL = "http://localhost:8000";

const notify = (message) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const createTournament = async (data) => {
  try {
    return await axios.post(`${URL}/Create`, data);
  } catch (error) {
    notify(error.response.data.error);
  }
};

export const getTournament = async () => {
  try {
    return await axios.get(`${URL}/Tournaments`);
  } catch (error) {
    notify(error.response.data.error);
  }
};

export const getDetailTournament = async (id) => {
  try {
    return await axios.get(`${URL}/Tournament/${id}`);
  } catch (error) {
    notify(error.response.data.error);
  }
};

export const updateTournament = async (data) => {
  try {
    return axios.put(`${URL}/update_Tournament`, data);
  } catch (error) {
    notify(error.response.data.error);
  }
};

export const deleteTournament = async (id) => {
  try {
    return await axios.delete(`${URL}/deleteTournament/${id}`);
  } catch (error) {
    notify(error.response.data.error);
  }
};

export const addParticipant = async (data) => {
  try {
    return await axios.post(`${URL}/participant`, data);
  } catch (error) {
    notify(error.response.data.error);
  }
};

export const getParticipant = async (data) => {
  try {
    return await axios.get(`${URL}/getParticipant/${data._id}/${data.ID}`);
  } catch (error) {
    notify(error.response.data.error);
  }
};

export const editParticipant = async (data) => {
  try {
    return axios.put(`${URL}/update_Participant`, data);
  } catch (error) {
    notify(error.response.data.error);
  }
};

export const deleteParticipant = async (data) => {
  try {
    return axios.put(`${URL}/delete_Participant`, data);
  } catch (error) {
    notify(error.response.data.error);
  }
};
