import { createSlice } from "@reduxjs/toolkit";
import TeamMember from "../TeamMembers";

const team = TeamMember();

const initialState = {
  project: [
    {
      projectID: 1,
      name: "Redux",
      description: " this is a Redux toolkit",
      startDate: "24/2/4",
      dueDate: "24/2/5",
      taskDone: 1,
      totalTask: 3,
      selectedMembers: [1, 2],
      finalDays: 1,
    },
    {
      projectID: 2,
      name: "Nodejs",
      description: " this is a Nodejs",
      startDate: "24/2/5",
      dueDate: "24/2/6",
      taskDone: 3,
      totalTask: 3,
      selectedMembers: [3, 4, 5],
      finalDays: 1,
    },
    {
      projectID: 3,
      name: "Flask",
      description: " this is a Flask",
      startDate: "24/2/5",
      dueDate: "24/2/6",
      taskDone: 1,
      totalTask: 10,
      selectedMembers: [1, 3, 4, 5],
      finalDays: 9,
    },
  ],
  members: [
    {
      name: "Mahesh Jadhav",
      memberID: 1,
      position: "Administrator",
      memberImg: `${team[6]}`,
      selected: false,
    },
    {
      name: "Pritam Shinde",
      memberID: 2,
      position: "Manager",
      memberImg: `${team[5]}`,
      selected: false,
    },
    {
      name: "Rahul Yadhav",
      memberID: 3,
      position: "Developer",
      memberImg: `${team[2]}`,
      selected: false,
    },
    {
      name: "Amit Sigha",
      memberID: 4,
      position: "Sales",
      memberImg: `${team[3]}`,
      selected: false,
    },
    {
      name: "Akash Vishvakarma",
      memberID: 5,
      position: "Designer",
      memberImg: `${team[4]}`,
      selected: false,
    },
  ],
};

export const projectSlice = createSlice({
  name: "Project",
  initialState: initialState,
  reducers: {
    addProject: (state, action) => {
      state.project.push(action.payload);
    },
    removeProject: (state, action) => {
      const memberData = state.members;
      state = state.project.filter((val) => val.projectID !== action.payload);
      return { project: state, members: memberData };
    },
  },
});

//Action creater generated for each case reducer function
export const { addProject, removeProject, filterProject } =
  projectSlice.actions;
export default projectSlice.reducer;
