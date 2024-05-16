import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import "../../App.css";
import "./Editable.css";
function Editable(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  return (
    <div
      className={`editable my-1 drop-shadow-md hover:border hover:border-black `}
    >
      {showEdit ? (
        <form
          className={`editable_edit ${props.editClass || ""}`}
          onSubmit={(event) => {
            event.preventDefault();
            if (props.onSubmit) {
              props.onSubmit(inputValue);
            }
            setShowEdit(false)
            setInputValue("")
          }}
        >
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={props.placeholder || "Enter item"}
          />

          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
            <XMarkIcon className="w-6 h-6" onClick={() => setShowEdit(false)} />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${props.displayClass || ""}`}
          onClick={() => setShowEdit(true)}
        >
          {props.text || "Add Card"}
        </p>
      )}
    </div>
  );
}

export default Editable;
