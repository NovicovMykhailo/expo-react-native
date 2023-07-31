// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAll = createAsyncThunk(
  "posts/getAllPosts",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/posts");
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const addContact = createAsyncThunk(
  "posts/addPost",

  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("/posts", obj);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);


