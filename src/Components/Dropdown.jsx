import React, { useEffect, useRef } from "react";

function Dropdown(props) {
  const dropdownRef = useRef();
  const handleClick = (e) => {
    if (dropdownRef && !dropdownRef?.current?.contains(e?.target)) {
      if (props.onClose) {
        props.onClose();
        console.log("dropdown", props.onClose);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  });
  return (
    <div
      ref={dropdownRef}
      className={`top-[2.3rem] right-[2rem] bg-white border absolute rounded w-36 text-blue-600 font-semibold p-2 shadow-slate-200 shadow-md z-10`}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
