// historyApi.ts
import axios, { AxiosError } from "axios";
import History from "../interface/history";
const baseUrl = "http://localhost:5000";

const historyApi = {
  saveHistory: async (history: History) => {
    try {
      const response = await axios.post(`${baseUrl}/save-history`, history);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError.response?.data;
    }
  },

  getHistory: async () => {
    try {
      const response = await axios.get(`${baseUrl}/load-history`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError.response?.data;
    }
  },
};

export default historyApi;
