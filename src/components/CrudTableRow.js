import React from "react";

export const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { id, name, constellation } = el;
  return (
    <tr>
      <td>{name}</td>
      <td>{constellation}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
};
