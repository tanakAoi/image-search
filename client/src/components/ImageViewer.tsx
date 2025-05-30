import { IImage } from "../models/IImage";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { LikeButtonWithText } from "./ui/LikeButtonWithText";

interface ImageViewerProps {
  image: IImage;
  imageId?: string;
  onClose: () => void;
  mode: "add" | "remove";
}

export const ImageViewer = ({ image, onClose, mode, imageId }: ImageViewerProps) => {
  const isPortrait = image.image.width < image.image.height;

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div
        className={`viewer ${isPortrait ? "portrait" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="close-button"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, opacity: 0.9 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Close"
        >
          {/* TODO: light color if image is dark */}
          <Icon name={"close"} />
        </motion.button>

        {/* FIXME: Fix viewer width even when the image is wide */}
        <div className="main-image">
          <img src={image.link} alt={image.title} />
        </div>
        {/* TODO: Add source, like Google search etc. */}
        <div className="options">
          <h2>{image.title}</h2>
          <div className="options__buttons">
            <LikeButtonWithText
              image={image}
              isIcon={false}
              isMobile={false}
              mode={mode}
              imageId={imageId}
            />
            <motion.a
              href={image.image.contextLink}
              whileHover={{ scale: 1.05, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              className="button-round"
              target="_blank"
              rel="noopener noreferrer"
            >
              Original page
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
