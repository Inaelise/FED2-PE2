import { load } from "../components/storage/load";

export const API_KEY = "c498996c-21dc-480e-979a-7cd703127955";

export const headers = (contentType) => {
  const token = load("token");
  const headers = {};

  if (API_KEY) {
    headers["X-Noroff-API-KEY"] = API_KEY;
  }

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
