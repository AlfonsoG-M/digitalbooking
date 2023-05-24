import React, { useContext} from "react";
import { ContextGlobal } from "./utils/global.context";
import { Carousel } from "react-carousel-minimal";
import "../styles/carousel.css";

const ImageCarousel = ({ closeModal, width }) => {
  

  const {
    state: { ImagenesPE },
  } = useContext(ContextGlobal);

  const info = ImagenesPE.map((image) => {
    return { image: image.urlImagen, caption: "" };
  });

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };

  const slideNumberStyle = {
    fontSize: "16px",
    fontWeight: "700",
    color: "white",
    right: "0px",
    bottom: "0px",
    top: "inherit",
    left: "inherit",
    padding: "17px 0px",
  };

  return (
    <div className="imageCarouselContainer">
      <div className="carouselImg">
        <div
          style={{
            borderRadius: "10px",
          }}
        >
          <button className="buttonConflict" onClick={closeModal}>
            <i className="fa-sharp fa-solid fa-xmark iConflict"></i>
          </button>
          <Carousel
            z-index="2"
            data={info}
            width="100%"
            height="100%"
            captionStyle={captionStyle}
            radius=""
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="black"
            pauseIconSize="80px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            time={3000}
            thumbnails={width <=900 ? false : true}
            thumbnailWidth="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
