import "./App.css";
import LeftSideBar from "./Components/LeftSideBar";
import RightSideBar from "./Pages/RightSideBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Project from "./Pages/Project";
import KanbanBoard from "./Pages/KanbanBoard";
import SingleTask from "./Pages/SingleTask";
import RootLayout from "./Pages/RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <RightSideBar /> },
        { path: "project", element: <Project /> },
        { path: "kanban_board", element: <KanbanBoard /> },
        { path: "single_task", element: <SingleTask /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
