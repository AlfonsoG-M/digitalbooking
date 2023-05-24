import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LogoDb from "../assets/media/Db.svg";
import style from "../styles/navbar.module.css";
import { ContextGlobal } from "./utils/global.context";
import UserOptions from "./UserOptions";

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { state:{isLogged},dispatch } = useContext(ContextGlobal);
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email.slice(0,-19);
  const [ width, setWidth ] = useState()
  const [shouldUpdateWidth, setShouldUpdateWidth] = useState(true);
  const [options, setOptions] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);


  useEffect(() => {
    const handleResize = () => setShouldUpdateWidth(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

  useEffect(() => {
    if(shouldUpdateWidth){
      const width = window.innerWidth;
      setWidth(width)
      setShouldUpdateWidth(false);
      if(width > 600){
        navRef.current.classList.remove(`${style.responsiveNav}`)
      }
    }
  },[shouldUpdateWidth]);

  const showNavbar = () => {
    navRef.current.classList.toggle(`${style.responsiveNav}`);
  };



  const goAdministration = () => {
    navigate("/administracion/nuevo-producto")
    showNavbar();
  }

  const goReservs = () => {
    navigate(`/usuario/${userEmail}/reserva`)
    showNavbar();
  }

  const goFavs = () => {
    navigate(`/usuario/${userEmail}/favoritos`)
    showNavbar();
  }

  const toggleOptions = () => {
    setOptions(!options)
  }

  const handleMouseEnter = () => {
    setMouseOver(true);
  };
  
  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  useEffect(() => {
    let timeoutId;
    if (!mouseOver) {
      timeoutId = setTimeout(() => {
        setOptions(false);
      }, 500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [mouseOver]);

  const logOut = () => {
    dispatch({type: "ISLOGGED", payload: !isLogged});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("favs")
    if(location.pathname.slice(-7) === "reserva" || location.pathname.slice(-14) === "administracion" || location.pathname.slice(-9) === "favoritos"){
      navigate("/")
    };
  }

  const locationPath = (location) => {
    if (user) {


      if(user.rolId === 2){
        return (
          <div className={style.containUser} onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            {options ? <UserOptions/> : null}
            <div className={style.isAdmin}>
              <p className={style.reservsAndFavs} onClick={goFavs}>Favoritos</p>
              <p className={style.reservsAndFavs} onClick={goReservs}>Reservas</p>
              <p className={style.administration} onClick={goAdministration}>Administración</p>
              <hr className={style.verticalHr}/>
              <div className={style.user}>
                <p onClick={toggleOptions} className={style.capitalLetters}>{`${user.nombre.charAt(0)}${user.apellido.charAt(0)}`}</p>
                <div className={style.userHiDiv}>
                  <i className="fa-solid fa-times" onClick={logOut}></i>
                  <p className={style.userHi}>Hola,</p>
                  <p onClick={toggleOptions} className={style.userName}>{`${user.nombre} ${user.apellido}`}</p>
                </div>
              </div>
            </div>
            <div className={style.signOff}>
              <p>¿Deseas <span onClick={logOut}>cerrar sesión</span>?</p>
              <hr className={style.hr}/>
            </div>
          </div>
        );
      }else{
        return (
          <div className={style.containUser} onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            {options ? <UserOptions/> : null}
            <div className={style.isAdmin}>
              <p className={style.reservsAndFavs} onClick={goFavs}>Favoritos</p>
              <p className={`${style.reservsAndFavs} ${style.marginReservs}`} onClick={goReservs}>Reservas</p>
              <div className={style.user}>
                <p onClick={toggleOptions} className={style.capitalLetters}>{`${user.nombre.charAt(0)}${user.apellido.charAt(0)}`}</p>
                <div className={style.userHiDiv}>
                  <i className="fa-solid fa-times" onClick={logOut}></i>
                  <p className={style.userHi}>Hola,</p>
                  <p onClick={toggleOptions} className={style.userName}>{`${user.nombre} ${user.apellido}`}</p>
                </div>
              </div>
            </div>
            <div className={style.signOff}>
              <p>¿Deseas <span onClick={logOut}>cerrar sesión</span>?</p>
              <hr className={style.hr}/>
            </div>
          </div>
        );
      }


    } else {
      if (location.pathname.includes("iniciar-sesion")) {
        return (
          <div className={style.containUser}>
            <div className={style.menuHbgr}>
              <p>MENÚ</p>
            </div>
            <Link
              className={style.link}
              to={"/crear-cuenta"}
              onClick={showNavbar}
            >
              Crear cuenta
            </Link>
          </div>
        );
      } else if (location.pathname.includes("crear-cuenta")) {
        return (
          <div className={style.containUser}>
            <div className={style.menuHbgr}>
              <p>MENÚ</p>
            </div>
            <Link
              className={style.link}
              to={"/iniciar-sesion"}
              onClick={showNavbar}
            >
              Iniciar sesion
            </Link>
          </div>
        );
      } else {
        return (
          <div className={style.containUser}>
            <div className={style.menuHbgr}>
              <p>MENÚ</p>
            </div>
            <Link
              className={style.link}
              to={"/crear-cuenta"}
              onClick={showNavbar}
            >
              Crear cuenta
            </Link>
            <hr className={style.hrMiddle}/>
            <Link className={style.link} to={"/iniciar-sesion"} onClick={showNavbar}>
              Iniciar sesion
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <header>
      <div className={style.container}>
        <div className={style.graphicIdentity}>
          <Link to={"/"}>
            <img role="img" src={LogoDb} alt="logo Db" />
          </Link>
          <Link to={"/"}>
            <p className={style.phraseOut}>Sentite como en tu hogar</p>
          </Link>
        </div>
        <nav ref={navRef}>
          {locationPath(location)}
          <div className={style.icons}>
            <a /* href="" */ rel="noreferrer" target="_blank">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a /* href="" */ rel="noreferrer" target="_blank">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a /* href="" */ rel="noreferrer" target="_blank">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a /* href="" */ rel="noreferrer" target="_blank">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
          <button
            className={`${style.navBtnClose} ${style.navCloseBtn}`}
            onClick={showNavbar}
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </nav>
        <button className={`${style.navBtnOpen}`} onClick={showNavbar}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
