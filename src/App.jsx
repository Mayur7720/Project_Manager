import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Project from "./Pages/Project";
import KanbanBoard from "./Pages/KanbanBoard";
import SingleTask from "./Pages/SingleTask";
import RootLayout from "./Pages/RootLayout";
import TeamOverview from "./Pages/TeamOverview";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <TeamOverview /> },
        { path: "project", element: <Project /> },
        { path: "kanban_board", element: <KanbanBoard /> },
        { path: "single_task", element: <SingleTask /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
