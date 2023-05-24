import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from '../styles/forms.module.css';
import axios from 'axios';
import Swal from 'sweetalert2'

let EMAIL_REGX = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;


const schemaRegister = Yup.object().shape({
  name: Yup.string().required('Este campo es obligatorio'),
  lastName: Yup.string().required('Este campo es obligatorio'),
  email: Yup.string().matches(EMAIL_REGX, 'Ingrese un mail valido').required('Este campo es obligatorio'),
  password: Yup.string().min(6, 'La contraseña es demasiado corta.').required('Este campo es obligatorio.'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'),null], "Las contraseñas no coinciden.").required('Este campo es obligatorio.')
})

const RegisterForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  
  const prevPath = location.state && location.state?.previousPath;
  const pathFromRegister = prevPath ? true : false;


  const handleSubmitRegister = (values) => {
    console.log(values)
    axios.post("http://3.141.200.56:8080/api/usuarios", {
      nombre: values.name,
      apellido: values.lastName,
      email: values.email,    
      password: values.password,
      rol: {
        id: 1,
        tipo: "ROLE_USER"
      }
    }).then(res =>{
      axios.post("http://localhost:8080/enviarCorreo", {
        "destinatario": values.email,
        "remitente": "grupo1.digitalbooking@gmail.com",
        "asunto": "Confirmación de registro en DigitalBooking",
        "contenido": "<h1 style='color:red'>TE REGISTRASTE SIIIIUUUUUUUU</h1> <h2>CONFIRMA ACA: <a>LINK</a></h2> <h3 style='color:'red''> JE</h3>"
    }).then(res=> console.log("SE ENVIO EL MAIL"))
        pathFromRegister ? navigate(prevPath) : navigate("/iniciar-sesion", { replace: true });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha registrado con exito',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(err => {
      console.log(err)
    })
  }


  const handlePasswordVisibility = () => {
    if (isVisible == true){
      setIsVisible(false)
    } else{
      setIsVisible(true)
    }
  }
  return (
  <div className={style.container}>

    <h2>Crear Cuenta</h2>
    <Formik
      initialValues = {{
        name: "",
        lastName: "",
        email : "",
        password : "",
        confirmPassword: ""
    }}
    validationSchema={schemaRegister}
    onSubmit={values => {
      handleSubmitRegister(values)
    }}
    >      
      {({ errors, touched }) => (
        <Form className={style["register-form"]}>
            <div className={style['nombre-apellido']}>
                <div className={style['small-input-container']}>
                <label htmlFor='name'>Nombre</label>
                <Field name="name" type="text" className={`${
                errors.name && touched.name ? style["error-input"] : ""} ${style["form-small-input"] }`}/>
                <ErrorMessage name="name">{msg => <div className={style["error-msg"]}>{msg}</div>}</ErrorMessage>
                </div>
                <div className={style['small-input-container']}>

                <label htmlFor='lastName'>Apellido</label>
                <Field name="lastName" type="text" className={`${
                errors.lastName && touched.lastName ? style["error-input"] : ""} ${style["form-small-input"] }`}/>
                <ErrorMessage style="visibility:hidden;" name="lastName">{msg => <div className={style["error-msg"]}>{msg}</div>}</ErrorMessage>
                </div>
            </div>
            
            <div className={style['small-input-container']}>
            <label htmlFor='email'>Correo electrónico</label>
            <Field name="email" type="email" className={`${
              errors.email && touched.email ? style["error-input"] : ""} ${style["form-input"] }`} /> 
            <ErrorMessage name="email">{msg => <div className={style["error-msg"]}>{msg}</div>}</ErrorMessage>
            </div>

            <div className={style['small-input-container']}>
            <label htmlFor='password'>Contraseña</label>
            <Field name="password" type= {isVisible ? "text" : "password"} className={`${
              errors.password && touched.password ? style["error-input"] : ""} ${style["form-input"] }`}/>            
            <ErrorMessage name="password">{msg => <div className={              
              errors.password && touched.password ? style["error-msg"] : ""}>{msg}</div>}</ErrorMessage>
              <i onClick={handlePasswordVisibility} className={isVisible ? "fa-sharp fa-solid fa-eye" : "fa-sharp fa-solid fa-eye-slash"}></i>
            </div>
            
            <div className={style['small-input-container']}>
            <label htmlFor='confirmPassword'>Confirmar contraseña</label>
            <Field name="confirmPassword" type="password" className={`${
            errors.confirmPassword && touched.confirmPassword ? style["error-input"] : ""} ${style["form-input"] }`}/>
            <ErrorMessage name="confirmPassword">{msg => <div className={style["error-msg"]}>{msg}</div>}</ErrorMessage>
            </div>

            <button className={style['submit-button']} type="submit">Crear cuenta</button>
        </Form>
      )}
    </Formik>
    <p className={style["link-login"]}>¿Ya tienes una cuenta? <Link className='link' to={'/iniciar-sesion'}>Iniciar sesión</Link></p>
  </div>  
);
}

export default RegisterForm;
