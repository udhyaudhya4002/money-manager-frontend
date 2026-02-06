import axios from "axios";

const API_BASE_URL = "https://money-manager-backend-production-42dc.up.railway.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addTransaction = (data) =>
  api.post("/transactions", data);

export const editTransaction = (id, data) =>
  api.put(`/transactions/${id}`, data);

export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`);

export const getAllTransactions = () =>
  api.get("/transactions");

export const getAllAccounts = () =>
  api.get("/accounts");
export const getCategorySummary = () =>
  api.get("/transactions/summary/categories");


export default api;
