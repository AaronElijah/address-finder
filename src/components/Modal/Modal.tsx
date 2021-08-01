import { useContext } from "react";
import { createPortal } from "react-dom";
import { Context } from "../../context/Context";
import { actionTypes as contextActionTypes } from "../../context/reducer";
import "./Modal.css";

interface ModalProps {
  isVisible: boolean;
  content: { title: string; subheading: string };
}

export const Modal = ({ isVisible, content }: ModalProps) => {
  const contextDispatch = useContext(Context);
  const hideModal = () => {
    contextDispatch({
      type: contextActionTypes.updateModal,
      payload: { isVisible: false, title: "", subheading: "" },
    });
  };
  return isVisible ? (
    createPortal(
      <div className="modal">
        <div className="title">{content.title}</div>
        <div className="subheading">{content.subheading}</div>
        <button
          className="close-button"
          onClick={(e) => {
            e.preventDefault();
            hideModal();
          }}
        >
          {"Close"}
        </button>
      </div>,
      document.body
    )
  ) : (
    <div />
  );
};
