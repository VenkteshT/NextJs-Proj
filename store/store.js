import { createSlice, configureStore } from "@reduxjs/toolkit";

const users = createSlice({
  name: "user",
  initialState: {
    userData: {
      users: [],
      currentUser: "",
    },
    userExist: false,
  },
  reducers: {
    userSignUp(s, a) {
      const data = {
        ...a.payload,
        tasks: [],
      };
      s.userData.users.push(data);
    },
    addtask(s, a) {
      console.log(a.payload);
      console.log(s.user.tasks);
    },
    updateUser(s, a) {
      const { isExist } = a.payload;
      s.userExist = isExist;
    },
    updateCurrentUser(s, a) {
      const { name } = a.payload;
      s.userData.currentUser = name;
    },
  },
});

export const userActions = users.actions;

const store = configureStore({
  reducer: {
    user: users.reducer,
  },
});

export default store;
