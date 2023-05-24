import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from '../styles/forms.module.css';
import { ContextGlobal } from './utils/global.context';
import axios from 'axios';
import Swal from 'sweetalert2'

let EMAIL_REGX = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

const schemaLogin = Yup.object().shape({
  email: Yup.string().matches(EMAIL_REGX, 'Ingrese un email valido').required('Este campo es obligatorio'),
  password: Yup.string().min(6, 'La contraseña es demasiado corta.').required('Este campo es obligatorio.')
})

const LoginForm = () => {

const [isVisible, setIsVisible] = useState(false);
const { state:{}, dispatch } = useContext(ContextGlobal)

const navigate = useNavigate();
const location = useLocation();

const prevPath = location.state && location.state?.previousPath;
const pathFromBooking = prevPath ? true : false;


const handlePasswordVisibility = () => {
  if (isVisible){
    setIsVisible(false)
    return false
  } else{
    setIsVisible(true)
  }
}

const handleLoginAPI = (username, pass) => {

  axios.post("http://3.141.200.56:8080/authenticate", {
    "username": username,
    "password": pass
    })
  .then( res => {
    if(res.status === 200){
      localStorage.setItem("token", res.data.jwt)    
      axios.get(`http://3.141.200.56:8080/api/usuarios/datos/${username}`)
      .then(res => { 
        localStorage.setItem("user", JSON.stringify({
          id: res.data.id,
          nombre: res.data.nombre,
          apellido: res.data.apellido,
          email: username,
          password: res.data.password,
          ciudad: res.data.ciudad,
          rolId: res.data.rol.id,
          reservas: res.data.reservas
        }))
        dispatch({ type: "USER", payload : {
          id: res.data.id,
          nombre: res.data.nombre,
          apellido: res.data.apellido,
          email: username,
          password: res.data.password,
          ciudad: res.data.ciudad,
          rolId: res.data.rol.id,
          reservas: res.data.reservas
        }})
        dispatch({type:"ISLOGGED", payload:true})
        pathFromBooking ? navigate(prevPath) : navigate("/", { replace: true });
      })    
      .catch((error) => {
        console.log(error);
      });
    }
  })
  .catch((error) => {
    if(error.response.status === 401){
      // CREDENCIALES INVALIDAS
      Swal.fire({
        icon: 'error',
        title: 'Credenciales Invalidas',
        text: 'Asegurese de haber ingresado los datos correctos'
      })
    } else{
      console.log(error);
    }    
  }); 
}

const handleSubmitLogin = (values) => { 

  handleLoginAPI(values.email, values.password)  

}

return (
  <div className={style.container}>
    {
      pathFromBooking ?
      <div className={style.failReserva}>
        <i className="fa-solid fa-circle-exclamation"></i>
        <p>Para realizar una reserva necesitas estar logueado</p>
    </div> : ""
    }
    <h2 className={style['titulo-login']}>Iniciar sesión</h2>

    <Formik
      initialValues = {{
        email : "",
        password : ""
    }}
    validationSchema={schemaLogin}
    onSubmit={values => {
      handleSubmitLogin(values)
    }}
    >      
      {({ errors, touched }) => (
        <Form className={style["login-form"]}>
          <div className={style['small-input-container']}>
          <label htmlFor='email'>Correo electrónico</label>
          <Field name="email" type="email" className={`${
            errors.email && touched.email ? style["error-input"] : ""} ${style["form-input"] }`}
            /> 
          <ErrorMessage id="errorEmail" name="email">{msg => <div className={style["error-msg"]}>{msg}</div>}</ErrorMessage>          
          </div>

            <div className={style["small-input-container"]}>
              <label htmlFor="password">Contraseña</label>
              <Field
                name="password"
                type={isVisible ? "text" : "password"}
                className={`${
                  errors.password && touched.password
                    ? style["error-input"]
                    : ""
                } ${style["form-input"]}`}
              />
              <ErrorMessage id="errorPass" name="password">
                {(msg) => (
                  <div
                    className={
                      errors.password && touched.password
                        ? style["error-msg"]
                        : ""
                    }
                  >
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <i
                onClick={handlePasswordVisibility}
                className={
                  isVisible
                    ? "fa-sharp fa-solid fa-eye-slash"
                    : "fa-sharp fa-solid fa-eye ojo-ver"
                }
              ></i>
            </div>
            <button className={style["submit-button"]} type="submit">
              Ingresar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
