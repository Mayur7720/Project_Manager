import { createPortal } from "react-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ Open, setOpen, children, header, footer, height = "30rem" }) {
  return createPortal(
    <div
      onClick={() => setOpen(false)}
      className={`fixed py-4 inset-0 bg-black/50 z-10 flex justify-center items-center overflow-auto  ${
        Open ? "" : "hidden"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white w-2/6  mt-20 rounded-md overflow-y-hidden"
      >
        <div className=" bg-blue-500  font-semibold text-xl p-5 ">
          {header}
          <XCircleIcon
            className="inline float-end stroke-gray-700/50 fill-white cursor-pointer"
            width="2.3rem"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className={`w-full h-[${height}rem] overflow-y-auto no-scrollbar`}>
      
          {children}
        </div>
        <div className="p-3 text-center bg-gray-400 rounded-b ">{footer}</div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
