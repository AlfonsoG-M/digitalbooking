import React, { useEffect, useState } from "react";
import { useFormik, ErrorMessage } from "formik";
import Headers from "../components/Headers"
import style from "../styles/administracion.module.css";
import axios from "axios";
import Atributes from "../components/Atributes";
import * as Yup from "yup";
import Swal from 'sweetalert2'
import SuccessfulProductCreation from "../components/SuccessfulProductCreation"


const Administration = () => {
  const schemaRegister = Yup.object().shape({
    name: Yup.string().required("Este campo es obligatorio."),
    category: Yup.string().required("Este campo es obligatorio."),
    direction: Yup.string().required("Este campo es obligatorio."),
    city: Yup.string().required("Este campo es obligatorio."),
    latitud: Yup.string().required("Este campo es obligatorio."),
    longitud: Yup.string().required("Este campo es obligatorio."),
    description: Yup.string().required("Este campo es obligatorio."),
    politics: Yup.array().required("Este campo es obligatorio."),
  });

  const [ciudades, setCiudades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [politicas, setPoliticas] = useState([]);
  const [images, setImages] = useState([]);
  const [normasSelect, setNormasSelect] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [atributos, setAtributos] = useState([]);

  useEffect(() => {
    axios
      .get("http://3.141.200.56:8080/api/ciudades")
      .then((res) => setCiudades(res.data));
    axios
      .get("http://3.141.200.56:8080/api/categorias")
      .then((res) => setCategorias(res.data));
    axios
      .get("http://3.141.200.56:8080/api/politicas")
      .then((res) => setPoliticas(res.data));
  }, []);

  const deleteImage = (img) => {
    const newArray = images.filter((element) => element !== img);
    setImages(newArray);
  };

  let normas = politicas.slice(0, 9);
  let saludYSeguridad = politicas.slice(10, 14);
  let politicasCancelacion = politicas.slice(15, 20);

  const submitProduct = (data) => {
    let datos = {
      titulo: data.name,
      descripcion: data.description,
      direccion: data.direction,
      puntuacion: 6,
      clasificacion: 3,
      latitud: data.latitud,
      longitud: data.longitud,
      categoria: JSON.parse(data.category),
      ciudad: JSON.parse(data.city),
      politicas: normasSelect,
      imagenes: [{
        titulo: "img1",
        urlImagen: imageUrl
      }],
      caracteristicas: atributos,
      precio: 20,      
    };
    axios.post("http://3.141.200.56:8080/api/productos", datos)
    .then(res =>{
      console.log("FASDJKLÑGSDLGJSDKL")
      if(res.status === 200){
        /* REDIRECCIONAME PABLITO A LA VISTA DE "SE CREO UN PRODUCTO EXITOSAMENTE" */
        setSuccess(!success)
        console.log(res)
      }
    })    
    .catch(err => console.log(err))
    console.log(datos)
  };

  const [ success, setSuccess] = useState(false)  
  /* const [successful, setSuccessful] = useState(false); */
  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      category: "",
      direction: "",
      city: "",
      latitud: "",
      longitud: "",
      description: "",
      politics: [],
    },
    validationSchema: schemaRegister,
    onSubmit: submitProduct,
  });

  return (
    <div className={style.divContainerAll}>
    {success ? <SuccessfulProductCreation setSuccessful={setSuccess} /> : null}
    <Headers />    
    <div className={style.containerAdm}>
      <h2>Crear Propiedad</h2>
      <form className={style["register-form"]} onSubmit={handleSubmit}>
        <div className={style.mainInfoDiv}>
          <div className={style["inputContainer"]}>
            <div className={style["smallInputContainer"]}>
              <label htmlFor="name">Nombre de la propiedad</label>
              <input
                name="name"
                type="text"
                className={`${
                  errors.name && values.name ? style["error-input"] : ""
                } ${style["form-small-input"]}`}
                onChange={handleChange}
                value={values.name}
              />
              {errors.name && <span>{errors.name}</span>}
            </div>
            <div className={style["smallInputContainer"]}>
              <label htmlFor="category">Categoría</label>
              <select
                name="category"
                className={`${
                  errors.category && values.category ? style["error-input"] : ""
                } ${style["form-small-input"]}`}
                onChange={handleChange}
                value={values.category}
              >
                {categorias.map((categoria) => {
                  return (
                    <option value={JSON.stringify(categoria)} key={categoria.titulo}>
                      {" "}
                      {`${categoria.titulo}`}{" "}
                    </option>
                  );
                })}
              </select>
              {errors.category && <span>{errors.category}</span>}
            </div>
          </div>
          <div className={style["inputContainer"]}>
            <div className={style["smallInputContainer"]}>
              <label htmlFor="direction">Dirección</label>
              <input
                name="direction"
                type="text"
                className={`${
                  errors.direction && values.direction
                    ? style["error-input"]
                    : ""
                } ${style["form-small-input"]}`}
                onChange={handleChange}
                value={values.direction}
              />
              {errors.direction && <span>{errors.direction}</span>}
            </div>
            <div className={style["smallInputContainer"]}>
              <label htmlFor="city">Ciudad</label>
              <select
                name="city"
                className={`${
                  errors.city && values.city ? style["error-input"] : ""
                } ${style["form-small-input"]}`}
                onChange={handleChange}
                value={values.city}
              >
                {ciudades.map((city) => {
                  return (
                    <option value={JSON.stringify(city)} key={city.nombre}>
                      {" "}
                      {`${city.nombre}, ${city.pais} `}{" "}
                    </option>
                  );
                })}
              </select>
              {errors.city && <span>{errors.city}</span>}
            </div>
          </div>
          <div className={style["inputContainer"]}>
            <div className={style["smallInputContainer"]}>
              <label htmlFor="latitud">Latitud</label>
              <input
                name="latitud"
                type="text"
                className={`${
                  errors.latitud && values.latitud ? style["error-input"] : ""
                } ${style["form-small-input"]}`}
                onChange={handleChange}
                value={values.latitud}
              />
              {errors.latitud && <span>{errors.latitud}</span>}
            </div>
            <div className={style["smallInputContainer"]}>
              <label htmlFor="longitud">Longitud</label>
              <input
                name="longitud"
                type="text"
                className={`${
                  errors.longitud && values.longitud ? style["error-input"] : ""
                } ${style["form-small-input"]}`}
                onChange={handleChange}
                value={values.longitud}
              />
              {errors.longitud && <span>{errors.longitud}</span>}
            </div>
          </div>
        </div>
        <div className={style.descripcionDiv}>
          <div className={style["smallInputContainer"]}>
            <label htmlFor="description">Descripción</label>
            <input
              name="description"
              type="textarea"
              className={`${
                errors.description && values.description
                  ? style["error-input"]
                  : ""
              } ${style["descripcionInput"]}`}
              onChange={handleChange}
              value={values.description}
            />
            {errors.description && <span>{errors.description}</span>}
          </div>
        </div>
        <Atributes setAtributos={setAtributos} atributos={atributos} />
        <div className={style.politicasDiv}>
          <h3>Políticas del producto</h3>
          <div className={style.politicasContainerDiv}>
            <div className={style.politicasUnitDiv}>
              <h4>Normas de la casa</h4>
              <label htmlFor="description">Descripción</label>
              <select
                name="politics"
                className={`${
                  errors.politics && values.politics ? style["error-input"] : ""
                } ${style["form-small-input"]}`}
                onChange={(e) => {
                  setNormasSelect([...normasSelect, JSON.parse(e.target.value)]);
                }}
              >
                {normas.map((norma) => {
                  return (
                    <option value={JSON.stringify(norma)} key={norma.detalle}>
                      {" "}
                      {`${norma.detalle} `}{" "}
                    </option>
                  );
                })}
              </select>
              {errors.politics && <span>{errors.politics}</span>}
            </div>
            <div className={style.politicasUnitDiv}>
              <h4>Salud y seguridad</h4>
              <label htmlFor="description">Descripción</label>
              <select
                name="politics"
                className={`${
                  errors.politics && values.politics ? style["error-input"] : ""
                } ${style["form-small-input"]}`}
                onChange={(e) => {
                  setNormasSelect([...normasSelect, JSON.parse(e.target.value)]);
                }}
              >
                {saludYSeguridad.map((norma) => {
                  return (
                    <option value={JSON.stringify(norma)} key={norma.detalle}>
                      {" "}
                      {`${norma.detalle} `}{" "}
                    </option>
                  );
                })}
              </select>
              {errors.politics && <span>{errors.politics}</span>}
            </div>
            <div className={style.politicasUnitDiv}>
              <h4>Politica de cancelación</h4>
              <label htmlFor="description">Descripción</label>
              <select
                name="politics"
                className={`${
                  errors.politics && values.politics ? style["error-input"] : ""
                } ${style["form-small-input"]}`}
                onChange={(e) => {
                  setNormasSelect([...normasSelect, JSON.parse(e.target.value)]);
                }}
              >
                {politicasCancelacion.map((norma) => {
                  return (
                    <option value={JSON.stringify(norma)} key={norma.detalle}>
                      {" "}
                      {`${norma.detalle} `}{" "}
                    </option>
                  );
                })}
              </select>
              {errors.politics && <span>{errors.politics}</span>}
            </div>
          </div>
        </div>
        <div className={style.imagenesDiv}>
          <h3>Cargar imágenes</h3>
          <div className={style["smallInputContainerImg"]}>
            <input
              name="imagenes"
              type="text"
              className={`${
                errors.imagenes && values.imagenes ? style["error-input"] : ""
              } ${style["form-small-inputImg"]}`}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
            <button
              className={style["addImg"]}
              type="button"
              onClick={() => {
                setImages([...images, imageUrl]);
                setImageUrl("");
              }}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div >
            {images.map((e) => {
              return (
                <div key={e} className={style["smallInputContainerImg"]}>
                  <input
                    type="text"
                    className={`${
                      errors.imagenes && values.imagenes
                        ? style["error-input"]
                        : ""
                    } ${style["form-small-inputImg"]}`}
                    value={e}
                  />
                  <button
                    className={style["addImg"]}
                    type="button"
                    onClick={() => {
                      deleteImage(e);
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.divButton}>
          <button className={style["submit-button"]} type="submit">
            Crear
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Administration;
