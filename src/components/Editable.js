import React from "react";

const Editable = ({ editFormData, handleEditFormChange,handleCancelClick }) => {
  const { name, gender, phoneNumber, email } = editFormData;

  return (
    <tr>
      <td>
        <input
          value={name}
          onChange={handleEditFormChange}
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
        />
      </td>
      <td>
        <input
          value={gender}
          onChange={handleEditFormChange}
          type="text"
          name="gender"
          required="required"
          placeholder="Enter a gender..."
        />
      </td>
      <td>
        <input
          value={phoneNumber}
          onChange={handleEditFormChange}
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
        />
      </td>
      <td>
        <input
          value={email}
          onChange={handleEditFormChange}
          type="email"
          name="email"
          required="required"
          placeholder="Enter a email..."
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button onClick={handleCancelClick} type="button">Cancel</button>
      </td>
    </tr>
  );
};

export default Editable;
