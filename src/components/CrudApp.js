import React, { useState } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
const initialDB = [
  { id: 1, name: "Seiya", constellation: "Pegaso" },
  { id: 2, name: "Shiryu", constellation: "Dragon" },
  { id: 3, name: "Hyoga", constellation: "Cisne" },
  { id: 4, name: "Shun", constellation: "Andromeda" },
  { id: 5, name: "Ikki", constellation: "Fenix" }
];
const CrudApp = () => {
  const [dataBase, setDataBase] = useState(initialDB);
  const [dataToEdit, setDataToEdit] = useState(null);
  // CRUD FUNCTIONS:
  const createData = ({ name, constellation, id }) => {
    id = Date.now();
    setDataBase([...dataBase, { name, constellation, id }]);
  };

  const updateData = (data) => {
    let newData = dataBase.map((el) => (el.id === data.id ? data : el));
    setDataBase(newData);
  };

  const deleteData = (id) => {
    let isDelete = confirm(`estas seguro de eliminar el registro id ${id}?`);
    isDelete ? setDataBase(dataBase.filter((obj) => obj.id !== id)) : false;
  };

  return (
    <div>
      <h2>CRUD App</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <CrudTable
          data={dataBase}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      </article>
    </div>
  );
};
export default CrudApp;
