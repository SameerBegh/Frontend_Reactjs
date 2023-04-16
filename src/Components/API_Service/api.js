import axios from "axios";

const URL = "http://localhost:8000";

export const createTournament = async (data) => {
  try {
    return await axios.post(`${URL}/Create`, data);
  } catch (error) {
    console.log(error);
  }
};

export const getTournament = async () => {
  try {
    return await axios.get(`${URL}/Tournaments`);
  } catch (error) {
    console.log(error);
  }
};

export const getDetailTournament = async (id) => {
  try {
    return await axios.get(`${URL}/Tournament/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateTournament = async (data) => {
  try {
    axios.put(`${URL}/update_Tournament`, data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTournament = async (id) => {
  try {
    return await axios.delete(`${URL}/deleteTournament/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const addParticipant = async (data) => {
  try {
    return await axios.post(`${URL}/participant`, data);
  } catch (error) {
    console.log(error);
  }
};

export const editParticipant = async (data) => {
  try {
    axios.put(`${URL}/update_Participant`, data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteParticipant = async (data) => {
  try {
    axios.put(`${URL}/delete_Participant`, data);
  } catch (error) {
    console.log(error);
  }
};
