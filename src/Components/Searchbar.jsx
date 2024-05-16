import React from "react";

function Searchbar({handleChange}) {
  return (
    <div>
      <input
        type="text"
        className="float-right mt-1 rounded-full w-1/3 px-6 py-[0.4rem] border outline-none  ring-1 ring-transparent focus:border-transparent  focus:ring-blue-400 "
        placeholder="Filter tasks "
        onChange={handleChange}
      />
    </div>
  );
}

export default Searchbar;
