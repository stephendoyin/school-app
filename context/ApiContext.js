import { createContext, useState, useEffect } from "react";
import Api from "../pages/api/api";

export const ApiContext = createContext();

export const ApiProvider = (props) => {
  const [isSearching, setIsSearching] = useState(false);

  const getRequest = async (number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get(
        `${Api.ENDPOINTS.url}/school/applications?page=${number}`,
        token
      );
      const data = response;
      return data;
    } catch (err) {
      throw err;
    }
  };

  const searchRequest = async (pageNumber, searchQuery) => {
    try {
      setIsSearching(true);
      const token = localStorage.getItem("token");
      const response = await Api.post(
        `${Api.ENDPOINTS.url}/school/requests?page=${pageNumber}`,
        searchQuery,
        token
      );
      setIsSearching(false);
      const data = response;
      return data;
    } catch (err) {
      throw err;
    }
  };

  const api = {
    getRequest,
    searchRequest,
    isSearching,
  };

  return (
    <ApiContext.Provider value={{ api }}>{props.children}</ApiContext.Provider>
  );
};