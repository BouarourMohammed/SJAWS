import axios from "axios";
import { apiData } from "./appinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export const create = async (data: any, url: any) => {
  try {
    const token = await getToken();
    return await axios.post(`${apiData.REACT_APP_API}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// used in calculate screen
export const editByIdAuth = async (values: any, url: any, id: any) => {
  try {
    const token = await getToken();
    return await axios.put(`${apiData.REACT_APP_API}/${url}/${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllAuth = async (url: any) => {
  try {
    const token = await getToken();
    return await axios.get(`${apiData.REACT_APP_API}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getByIdAuth = async (url: any, id: any) => {
  try {
    const token = await getToken();
    return await axios.get(`${apiData.REACT_APP_API}/${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// used in calculate screen
export const createCalculation = async (values: any, url: any) => {
  try {
    const token = await getToken();
    return await axios.post(`${apiData.REACT_APP_API}/${url}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteByIdAuth = async (url: any, id: any) => {
  try {
    const token = await getToken();

    return await axios.delete(`${apiData.REACT_APP_API}/${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//used in results screens
export const getResults = async (url: any) => {
  try {
    const token = await getToken();
    return await axios.get(`${apiData.REACT_APP_API}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
