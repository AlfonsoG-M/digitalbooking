import React, { useEffect, useState } from "react";
import "../styles/atributes.css";
import axios from "axios";

const Atributes = ({ setAtributos, atributos }) => {
  const [atributosDB, setAtributosDB] = useState([]);

  useEffect(() => {
    axios
      .get("http://3.141.200.56:8080/api/caracteristicas")
      .then((res) => setAtributosDB(res.data));
  }, []);

  const add = (e) => {
    setAtributos([...atributos, e]);
  };
  return (
    <div className="atContainerDiv">
      <h3>Agregar atributos</h3>
      <div className="divIcons">
        <div className="container">
        {atributosDB.map((atributo) => {
          return (
            <div className="row" key={atributo.nombre}>
              <label>
                <input type="checkbox" name="" />
                <div
                  className="icon-box"
                  onClick={() => {
                    add(atributo);
                  }}
                >
                  <i className={atributo.icono} aria-hidden="true"></i>
                  <span>{atributo.nombre}</span>
                </div>
              </label>
            </div>
          );
        })}
      </div>
      </div>
      
    </div>
  );
};

export default Atributes;
