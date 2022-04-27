import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import useFetch from "../../Hooks/useFetch";

const CardBody = ({ user, Reload, setReload }) => {
  const [users, setUsers] = useFetch();
  const { _id, name, email, description } = user;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uDescription, setUDescription] = useState("");

  const updatedData = { uName, uEmail, uDescription };

  const handleUpdate = (id) => {
    fetch(`http://localhost:5000/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(`${data.name}'s info updated successfuly.`);
        setShow(false);
        setReload(!Reload);
      })
      .catch(() => {
        toast.error("Failed to update user.");
      });
  };
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount === 1) {
          toast.success("Deleted successfuly.");
          const remaining = users.filter((u) => u._id !== id);
          setUsers(remaining);
          setReload(!Reload);
        } else {
          toast.warn("Data is not deleted.");
        }
      });
  };
  return (
    <Card
      key={_id}
      border="primary"
      style={{ width: "18rem" }}
      className="m-2 shadow p-3 mb-5 bg-white rounded"
    >
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>{email}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-around">
          <Button variant="danger" onClick={() => handleDelete(_id)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button variant="info" onClick={handleShow}>
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </div>
      </Card.Body>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(e) => setUName(e.target.value)}
                type="text"
                placeholder="Enter Name"
                defaultValue={name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => setUEmail(e.target.value)}
                type="text"
                placeholder="Enter Email"
                defaultValue={email}
              />
            </Form.Group>
            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control
                onChange={(e) => setUDescription(e.target.value)}
                as="textarea"
                placeholder="Leave a comment here"
                defaultValue={description}
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={() => handleUpdate(_id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default CardBody;
