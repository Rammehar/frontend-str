import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { User } from "../models/User";
import { userService } from "../services";

type StatusType = "idle" | "loading" | "succeeded" | "failed";
export interface UserState {
  users: User[] | null;
  user: User | null;
  createUserStatus: StatusType;
  fetchUserStatus: StatusType;
  fetchUsersStatus: StatusType;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  createUserStatus: "idle",
  fetchUserStatus: "idle",
  fetchUsersStatus: "idle",
  error: null,
};

// get all users
export const getAllUsers = createAsyncThunk<User[], void, { state: RootState }>(
  "user/getAllUsers",
  async (req, thunkAPI) => {
    try {
      const result = await userService.getAllUsers();
      if (result.isLeft()) {
        const error: string = result.value;
        return thunkAPI.rejectWithValue(error);
      } else {
        return result.value.getValue();
      }
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//get user profile after login
export const getUserById = createAsyncThunk<
  User,
  { userId: string },
  { state: RootState }
>("user/getUserById", async (req, thunkAPI) => {
  const result = await userService.getUserById(req.userId);
  if (result.isLeft()) {
    const error: string = result.value;
    return thunkAPI.rejectWithValue(error);
  } else {
    return result.value.getValue();
  }
});

export const createUser = createAsyncThunk<
  void,
  { firstName: string; email: string; password: string },
  { rejectValue: string }
>("user/createUser", async (data, thunkAPI) => {
  const result = await userService.createUser(
    data.firstName,
    data.email,
    data.password
  );
  if (result.isLeft()) {
    const error: string = result.value;
    return thunkAPI.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.createUserStatus = "loading";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserStatus = "failed";
        if (action.payload) {
          state.error = action.payload as string;
        }
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.createUserStatus = "succeeded";
      })
      .addCase(getUserById.pending, (state) => {
        state.fetchUserStatus = "loading";
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.fetchUserStatus = "failed";
        if (action.payload) {
          state.error = action.payload as string;
        }
      })

      .addCase(getUserById.fulfilled, (state, action) => {
        state.fetchUserStatus = "succeeded";
        state.user = action.payload;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.fetchUsersStatus = "loading";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.fetchUsersStatus = "failed";
        if (action.payload) {
          state.error = action.payload as string;
        }
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.fetchUsersStatus = "succeeded";
        state.users = action.payload;
      });
  },
});

export default userSlice.reducer;
