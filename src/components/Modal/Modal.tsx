import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
  isVisible: boolean;
  content: { title: string; subheading: string };
  hideModal: () => void;
}

export const Modal = ({ isVisible, content, hideModal }: ModalProps) => {
  return isVisible ? (
    createPortal(
      <div className="modal">
        <div className="title">{content.title}</div>
        <div className="subheading">{content.subheading}</div>
        <button className="close-button">{"Close Modal"}</button>
      </div>,
      document.body
    )
  ) : (
    <div />
  );
};
