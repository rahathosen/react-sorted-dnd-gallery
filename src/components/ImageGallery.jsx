// ImageGallery component for displaying and managing a gallery of images.
// Manages image sorting, checkbox states, and image addition.
import { useState } from "react";
import { arrayMoveImmutable } from "array-move";
import SortableList from "react-easy-sort";
import { imageData, addImagePlaceholder } from "../data/imageData"; // Importing necessary data and components
import ImageItem from "./ImageItem";
import Header from "./ImageHeader";
import { handleCheckboxChangeUtil, handleAddImageUtil } from "../utils"; // Importing utility functions

// ImageGallery component function
export default function ImageGallery() {
  // Setting up component state
  const [images, setImages] = useState(imageData);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [checkedCount, setCheckedCount] = useState(0);

  // Function for handling image sorting and
  // Utilizing arrayMoveImmutable to maintain immutability when updating arrays in React.
  const onSortEnd = (oldIndex, newIndex) => {
    setImages((prevImages) =>
      arrayMoveImmutable(prevImages, oldIndex, newIndex)
    );
  };

  // Function for handling checkbox state changes
  const handleCheckboxChange = (id) => {
    handleCheckboxChangeUtil(id, images, setImages, setCheckedCount);
  };

  // Function for handling image addition
  const handleAddImage = (e) => {
    handleAddImageUtil(e, images, setImages);
  };

  // Function for rendering the list of images
  const renderImages = () => {
    return images.map((image) => {
      // Setting up necessary event handlers and conditional rendering properties
      const isImageFirst = images.findIndex((img) => img.id === image.id) === 0;
      const handleMouseEnter = () => {
        setHoveredItem(image.id);
      };
      const handleMouseLeave = () => {
        setHoveredItem(null);
      };
      const toggleCheckbox = () => {
        handleCheckboxChange(image.id);
      };
      const showHoverOverlay = hoveredItem === image.id;
      const showCheckedOverlay = image.checked;
      const showCheckbox = showHoverOverlay || showCheckedOverlay;
      // Rendering ImageItem component with necessary props
      return (
        <ImageItem
          key={image.id}
          image={image}
          isImageFirst={isImageFirst}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          toggleCheckbox={toggleCheckbox}
          showHoverOverlay={showHoverOverlay}
          showCheckedOverlay={showCheckedOverlay}
          showCheckbox={showCheckbox}
        />
      );
    });
  };

  // JSX structure for the ImageGallery component
  return (
    <section className="container mx-auto lg:p-10 p-4 mt-10 bg-white rounded-lg">
      <div className=" border-b-[3px]  border-neutral-200 mb-5 ">
        {/* Rendering the Header component */}
        <Header
          images={images}
          setImages={setImages}
          setCheckedCount={setCheckedCount}
          checkedCount={checkedCount}
        />
      </div>
      {/* Rendering the SortableList component for image sorting */}
      <SortableList items={images} onSortEnd={onSortEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Rendering the list of images */}
          {renderImages()}

          {/* Rendering the element for adding a new image */}
          <div className="border-2 border-neutral-300 shadow-sm rounded-lg relative hover:cursor-pointer">
            <label
              htmlFor="file-upload"
              className="w-full h-full rounded-lg bg-gray-200"
            >
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAddImage}
              />
              <img
                src={addImagePlaceholder.imageUrl}
                alt="placeholder"
                className="rounded-lg w-full h-full"
              />
            </label>
          </div>
        </div>
      </SortableList>
    </section>
  );
}
