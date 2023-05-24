import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "../styles/bookingUserData.module.css";

const schemaRegister = Yup.object().shape({
  name: Yup.string().required("Este campo es obligatorio"),
  lastName: Yup.string().required("Este campo es obligatorio"),
  email: Yup.string()
    .email("Ingrese un email valido")
    .required("Este campo es obligatorio"),
  ciudad: Yup.string().required("Este campo es obligatorio")
});

const BookingUserData = ({}) => {

  const [user, setUser] = useState({
    nombre: "Pepe",
    apellido: "Lota",
    email: "pepe@digitalbooking.com",
    ciudad: ""
  })

  return (
    <div>
      <Formik
        initialValues={{
          name: user.nombre,
          lastName: user.apellido,
          email: user.email,
          ciudad: "",
        }}
        validationSchema={schemaRegister}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={style["register-form"]}>
            <div className={style["containerInputs"]}>

              <div className={style["small-input-container"]}>
                <label htmlFor="name">Nombre</label>
                <Field
                  disabled={true}
                  name="name"
                  type="text"
                  className={`${
                    errors.name && touched.name ? style["error-input"] : ""
                  } ${style["form-small-input"]}`}
                />
                <ErrorMessage name="name">
                  {(msg) => <div className={style["error-msg"]}>{msg}</div>}
                </ErrorMessage>
              </div>

              <div className={style["small-input-container"]}>
                <label htmlFor="lastName">Apellido</label>
                <Field
                  disabled={true}
                  name="lastName"
                  type="text"
                  className={`${
                    errors.lastName && touched.lastName
                      ? style["error-input"]
                      : ""
                  } ${style["form-small-input"]}`}
                />
                <ErrorMessage style="visibility:hidden;" name="lastName">
                  {(msg) => <div className={style["error-msg"]}>{msg}</div>}
                </ErrorMessage>
              </div>
              
            </div>
            <div className={style["containerInputs"]}>
              
              <div className={style["small-input-container"]}>
                <label htmlFor="email">Correo electrónico</label>
                <Field
                  disabled={true}
                  name="email"
                  type="email"
                  className={`${
                    errors.email && touched.email ? style["error-input"] : ""
                  } ${style["form-input"]}`}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className={style["error-msg"]}>{msg}</div>}
                </ErrorMessage>
              </div>

              <div className={style["small-input-container"]}>
                <label htmlFor="ciudad">Ciudad</label>
                <Field
                  name="ciudad"
                  type="text"
                  className={`${
                    errors.ciudad && touched.ciudad ? style["error-input"] : ""
                  } ${style["form-input"]}`}
                />
                <ErrorMessage name="ciudad">
                  {(msg) => <div className={style["error-msg"]}>{msg}</div>}
                </ErrorMessage>
              </div>
              
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingUserData;
