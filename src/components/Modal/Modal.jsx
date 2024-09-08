import "../../App.css";

const Modal = ({ element, onClose }) => {
  if (!element) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <div className="comics-modal">
          <div>
            <h2>{element.title || element.name}</h2>
            <img
              src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
              alt={element.title}
            />
          </div>
          <p>{element.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
