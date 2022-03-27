import React from 'react'

const OnlyRead = ({contact,handleEditClick,handleDeleteClick}) => {
    const { id, name, gender, phoneNumber, email } = contact;
    return (
        <tr>
              <td>{name}</td>
              <td>{gender}</td>
              <td>{phoneNumber}</td>
              <td>{email}</td>
              <td>
                  <button onClick={(e)=> handleEditClick(e,contact)} type="button">
                    Edit
                  </button>
                  <button onClick={()=> handleDeleteClick(id)} type="button">
                    Delete
                  </button>
              </td>
            </tr>
    )
}

export default OnlyRead
