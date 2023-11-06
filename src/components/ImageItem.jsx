/* eslint-disable react/prop-types */
import { SortableItem } from "react-easy-sort";

// ImageItem component responsible for rendering each individual image in the gallery.
const ImageItem = ({
  image,
  isImageFirst,
  handleMouseEnter,
  handleMouseLeave,
  toggleCheckbox,
  showHoverOverlay,
  showCheckedOverlay,
  showCheckbox,
}) => {
  // Rendering the ImageItem component for each image
  return (
    <SortableItem key={image.id}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${
          isImageFirst
            ? "lg:col-span-2 lg:row-span-2 border-[3px] border-neutral-200 rounded-lg relative"
            : "border-[3px] border-neutral-200 shadow-sm rounded-lg relative"
        } hover:cursor-pointer`}
      >
        {/* Conditional rendering of hover and checked overlays */}
        {showHoverOverlay && (
          <div className="bg-black absolute w-full h-full rounded-lg opacity-30"></div>
        )}
        {showCheckedOverlay && (
          <div className="bg-neutral-300 absolute w-full h-full rounded-lg opacity-30"></div>
        )}
        {/* Rendering the image */}
        <img
          src={image.imageUrl}
          className="rounded-lg w-full h-full"
          alt="gallery"
        />
        <div>
          {/* Rendering the checkbox if needed */}
          {showCheckbox && (
            <input
              className="absolute top-5 left-5 lg:scale-150"
              type="checkbox"
              name="checkbox"
              checked={image.checked}
              onChange={toggleCheckbox}
            />
          )}
        </div>
      </div>
    </SortableItem>
  );
};

export default ImageItem;
