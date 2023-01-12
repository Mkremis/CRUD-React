import React, { useState, useEffect } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";
const CrudApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataBase, setDataBase] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  let api = helpHttp(),
    url = "https://9s6j7l-5000.preview.csb.app/santos";
  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setError(null);
          setDataBase(res);
        } else {
          setError(res);
          setDataBase(null);
        }
        setLoading(false);
      });
  }, [url]);
  // CRUD FUNCTIONS:
  const createData = (data) => {
    data.id = Date.now();
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api
      .post(url, options)
      .then((res) =>
        !res.err ? setDataBase([...dataBase, res]) : setError(res)
      );
  };

  const updateData = (data) => {
    let endPoint = `${url}/${data.id}`;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.put(endPoint, options).then((res) => {
      if (!res.err) {
        let newData = dataBase.map((el) => (el.id === data.id ? data : el));
        setDataBase(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let endPoint = `${url}/${id}`;
    let options = {
      headers: { "content-type": "application/json" },
    };
    let isDelete = confirm(`estas seguro de eliminar el registro id ${id}?`);
    if (isDelete) {
      api.del(endPoint, options).then((res) => {
        if (!res.err) {
          setDataBase(dataBase.filter((obj) => obj.id !== id));
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>CRUD API</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status} : ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {dataBase && (
          <CrudTable
            data={dataBase}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </div>
  );
};
export default CrudApi;
