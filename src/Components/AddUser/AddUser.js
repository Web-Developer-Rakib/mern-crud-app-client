import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const AddUser = () => {
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  //Post data
  const user = { name, email, description };
  const handleAddUser = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || description === "") {
      toast.warn("Field's should not be empty.");
    } else {
      fetch("http://localhost:5000/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success(`${data.name}'s info added successfuly.`);
          console.log(data);
        })
        .catch(() => {
          toast.error("Failed to add user.");
        });
    }
  };

  return (
    <div className="mx-auto mt-5 w-50">
      <h1 className="mb-2">Add new user</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <FloatingLabel controlId="floatingTextarea2" label="Description">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FloatingLabel>
        <Form.Group className="my-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Check to procced"
            onClick={(e) => setCheck(e.target.checked)}
          />
        </Form.Group>
        {check ? (
          <Button variant="success" type="submit" onClick={handleAddUser}>
            Add
          </Button>
        ) : (
          <Button variant="danger">Add</Button>
        )}
      </Form>
    </div>
  );
};

export default AddUser;
