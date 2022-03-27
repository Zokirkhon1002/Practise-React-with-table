import React, { useState, Fragment, useEffect } from "react";
import "./App.css";
import data from "./mockData.json";
import { v4 } from "uuid";
import OnlyRead from "./components/OnlyRead";
import Editable from "./components/Editable";

function App() {
  const [contacs, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);




  useEffect(()=> {
    localStorage.setItem("TableLists",JSON.stringify(contacs))
  },[contacs]);


  useEffect(() => {
    let savedData = JSON.parse(localStorage.getItem("TableLists"));
    if(savedData){
      setContacts(savedData);
    }
  },[])





  const hadnleAddFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };



  const handleEditFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    const { name, gender, phoneNumber, email } = addFormData;

    const newContact = {
      id: v4(),
      name,
      gender,
      phoneNumber,
      email,
    };
    const newContacts = [...contacs, newContact];
    setContacts(newContacts);
  };


  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const {name, gender, phoneNumber, email } = editFormData
    const editedContact= {
      id: editContactId,
      name,
      gender,
      phoneNumber,
      email,
    }

    const newContacts = [...contacs];
    const index = contacs.findIndex((contact)=> contact.id === editContactId);
    newContacts[index] = editedContact;
    

    setContacts(newContacts)
    setEditContactId(null);
  }

  const handleEditClick = (e, contact) => {
    e.preventDefault();
    const { id, name, gender, phoneNumber, email } = contact;
    setEditContactId(id);

    const formValues = {
      name,
      gender,
      phoneNumber,
      email,
    };

    setEditFormData(formValues);
  };



  const handleCancelClick = () => {
    setEditContactId(null)
  }



  const handleDeleteClick = (contactId) => {
    let newContacts = [...contacs];
    const index = contacs.findIndex(({id})=> id === contactId);

    newContacts.splice(index,1);

    setContacts(newContacts);
  }

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>gender</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacs.map((contact) => (
              <Fragment key={v4()}>
                {editContactId === contact.id ? (
                  <Editable
                  handleCancelClick={handleCancelClick}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                  />
                ) : (
                  <OnlyRead
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          onChange={hadnleAddFormChange}
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
        />
        <input
          onChange={hadnleAddFormChange}
          type="text"
          name="gender"
          required="required"
          placeholder="Enter a gender..."
        />
        <input
          onChange={hadnleAddFormChange}
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
        />
        <input
          onChange={hadnleAddFormChange}
          type="email"
          name="email"
          required="required"
          placeholder="Enter a email..."
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
