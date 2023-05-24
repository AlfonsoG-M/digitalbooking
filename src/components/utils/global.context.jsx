import { createContext, useReducer } from "react";

export const ContextGlobal = createContext(undefined);

export const initialState = {
    Ciudades: [],
    Productos: [],
    Categorias: [],
    ProductoE: [],
    CategoriaPE: [],
    ProductosF: [],
    CiudadPE: [],
    ImagenesPE: [],
    CaracteristicasPE: [],
    PoliticasPE: [],
    SelectedCity: "",
    SelectedDateRange: [],
    Reservas: [],
    user: {
        id: null,
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        ciudad: "",
        rolId: 0,
        reservas: []
    },
    isLogged: false,
    favs: [],
    fav: true
}

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "CIUDADES":
      return { ...state, Ciudades: action.payload };
    case "PRODUCTOS":
      return { ...state, Productos: action.payload };
    case "PRODUCTOSR":
      return { ...state, ProductosR: action.payload };
    case "PRODUCTOSF":
      return { ...state, ProductosF: action.payload };
    case "CATEGORIAS":
      return { ...state, Categorias: action.payload };
    case "SELECTEDCITY":
      return { ...state, SelectedCity: action.payload };
    case "SELECTEDDATERANGE":
      return { ...state, SelectedDateRange: action.payload };
    case "PRODUCTOE":
      return {
        ...state,
        ProductoE: action.payload,
        CategoriaPE: action.payload?.categoria,
        CiudadPE: action.payload?.ciudad,
        ImagenesPE: action.payload?.imagenes.sort((a, b) => a.id - b.id),
        CaracteristicasPE: action.payload?.caracteristicas.sort(
          (a, b) => a.id - b.id
        ),
        PoliticasPE: action.payload?.politicas.sort((a, b) => a.id - b.id),
      };
    case "RESERVAS":
      return { ...state, Reservas: action.payload };
    case "USER":
      return { ...state, user: action.payload };
    case "ISLOGGED":
      return { ...state, isLogged: action.payload };
    case "FAVS":
      return { ...state, favs: action.payload };
    case "FAV":
      return { ...state, fav: action.payload };
    default:
      return { ...state };
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const store = {
    state,
    dispatch,
  };

  return (
    <ContextGlobal.Provider value={store}>
      <div>{children}</div>
    </ContextGlobal.Provider>
  );
};

export default ContextProvider;
