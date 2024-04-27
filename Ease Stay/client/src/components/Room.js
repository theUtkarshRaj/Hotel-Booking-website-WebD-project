
import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({ room,fromDate , toDate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='row shadow-lg p-2 mt-8 g-[#F0EFF4] rounded-3xl bg-white'>
      <div className="col-md-4">
        <img src={room.imageurls[0]} className='smallimg rounded-md' alt={room.name} />
      </div>
      <div className="col-md-7 text-left">
        <h1 className='text-xl font-bold'>{room.name}</h1>
        <p className='text-base'><span className='font-bold'>Max count:</span> {room.maxcount}</p>
        <h3 className='text-base'><span className='font-bold'>Phone Number:</span> {room.phonenumber}</h3>
        <h4 className='text-base'><span className='font-bold'>Type:</span> {room.type}</h4>

        <div style={{ float: 'right' }}>
          {(fromDate &&toDate)&&(
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
             <button className='btn bg-first btn-dark text-white mx-2'>Book Now</button>
           </Link>
          )}
         
          <button className='btn bg-first btn-dark' onClick={handleShow}>View details</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-lg">{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100 bigimg" src={url} alt={`Image ${index}`} />
              </Carousel.Item>
            ))}
          </Carousel>
          <p className='text-base mt-4'>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;


