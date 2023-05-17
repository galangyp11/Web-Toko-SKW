import { Modal } from "react-bootstrap";

const ModalCheck = ({isShow, setIsShow}) => {

    const handleTutup = () => {
        setIsShow(false)
    }
    return ( 
            <Modal isShow={isShow} onClick={handleTutup}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>Woohoo, you're reading this text in a modal!

                </Modal.Body>
                
                <Modal.Footer>
                    <button variant="secondary" onClick={handleTutup}>
                        Close
                    </button>
                    <button variant="primary" onClick={handleTutup}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
     );
}
 
export default ModalCheck;