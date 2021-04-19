import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import Residents from '../residents/residents.js'
import Vote from '../Vote/Vote.js'
import VoteStats from '../Votestats/VoteStats.js'

function Modal2({ typpe, show, setShow, modalData }) {
  //console.log("conti=", modalData,modalData['type']);
let type=modalData.type

  let strContent = "";
  if (typeof modalData.content === "string") strContent = modalData.content;
  else {
    strContent = modalData.content;
   
  }
  const handleClose = () => setShow(false);

  if (!show) return "";
  return (
    <Modal.Dialog show={show}>
      <Modal.Header closeButton   onClick={handleClose} >
        <Modal.Title>{modalData.title}</Modal.Title>          {/*eppen actualis fejlece az aktualis modalnak*/}
      </Modal.Header>

       { type === 'Residents' && <Residents data={modalData.data} title={modalData.title} />  }
       { type === 'Vote'      && <Vote      data={modalData.data} />  }
       { type === 'VoteStats' && <VoteStats  />                       }

      <Modal.Body>
        


      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(!show)}>           {/*variant=classname in bootstrap*/}
          Close
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default Modal2;
