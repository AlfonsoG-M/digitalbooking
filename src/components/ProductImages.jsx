import React, { useContext, useState, useEffect } from "react";
import { ContextGlobal } from "./utils/global.context";
import styles from "../styles/productImages.module.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import ImageCarousel from "./ImageCarousel";
import '../styles/productImages.css'


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ProductImages = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  const {
    state: { ImagenesPE },
  } = useContext(ContextGlobal);

  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect (()=>{
    if (width <= 900 ){
      setIsOpen(false)
    }
  }, [width])

  function openModal() {
    setIsOpen(true);
  }

  

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      {
        width > 900 ? <div className={styles.imagesDescriptionContainer}>
        {ImagenesPE.map((image, index) => {
          return (
            <div
              key={index}
              className={
                image.titulo === "imgFacadeReception"
                  ? styles.principalImgContainer
                  : styles.secundaryImg
              }
            >
              <img
                className={styles.productImg}
                src={image.urlImagen}
                alt={image.titulo}
              />
              {index == 4 && (
                <Link>
                  <p className={styles.verMasP} onClick={openModal}>
                    ver más
                  </p>
                </Link>
              )}
            </div>
          );
        })}
      </div> : <div><ImageCarousel closeModal={closeModal} width={width} /></div>
      }
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <ImageCarousel closeModal={closeModal} width={width} />
        </div>
      </Modal>
    </div>
  );
};

export default ProductImages;
