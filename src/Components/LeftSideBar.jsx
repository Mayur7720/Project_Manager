import { NavLink } from "react-router-dom";

function LeftSideBar() {
  return (
    <nav className="bg-slate-800 w-1/4  px-2 py-4">
      <h2 className="text-2xl text-gray-400 mb-4"> Quick Links</h2>
      <hr className="mb-4 bg-orange-300  border-none h-0.5" />
      <ul>
        <li className="text-white font-semibold mb-2 hover:text-orange-200 duration-300 border-2 border-transparent hover:border-b-orange-500 p-1">
          <NavLink
            className={(e) => {
              return e.isActive ? "text-orange-500    " : "";
            }}
            to="/"
          >
            TeamOverview
          </NavLink>
        </li>
        <li className="text-white font-semibold mb-2 hover:text-orange-200 duration-300 border-2 border-transparent hover:border-b-orange-500 p-1">
          <NavLink
            className={(e) => {
              return e.isActive ? "text-orange-500    " : "";
            }}
            to="project"
          >
            Projects
          </NavLink>
        </li>
        <li className="text-white font-semibold mb-2 hover:text-orange-200 duration-300 border-2 border-transparent hover:border-b-orange-500 p-1">
          <NavLink
            className={(e) => {
              return e.isActive ? "text-orange-500    " : "";
            }}
            to="single_task"
          >
            Single Task
          </NavLink>
        </li>
        <li className="text-white font-semibold mb-2 hover:text-orange-200 duration-300 border-2 border-transparent hover:border-b-orange-500 p-1">
          <NavLink
            className={(e) => {
              return e.isActive ? "text-orange-500    " : "";
            }}
            to="kanban_board"
          >
            Kanban Board
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default LeftSideBar;
