import { useState } from "react";
import { arrayMoveImmutable } from "array-move";
import SortableList from "react-easy-sort";
import { imageData, addImagePlaceholder } from "../data/imageData";
import ImageItem from "./ImageItem";
import Header from "./ImageHeader";
import { handleCheckboxChangeUtil, handleAddImageUtil } from "../utils";

export default function ImageGallery() {
  const [images, setImages] = useState(imageData);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [checkedCount, setCheckedCount] = useState(0);

  const onSortEnd = (oldIndex, newIndex) => {
    setImages((prevImages) =>
      arrayMoveImmutable(prevImages, oldIndex, newIndex)
    );
  };

  const handleCheckboxChange = (id) => {
    handleCheckboxChangeUtil(id, images, setImages, setCheckedCount);
  };

  const handleAddImage = (e) => {
    handleAddImageUtil(e, images, setImages);
  };

  const renderImages = () => {
    return images.map((image) => {
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

  return (
    <section className="container mx-auto lg:p-10 p-4 mt-10 bg-white rounded-lg">
      <div className=" border-b-[3px]  border-neutral-200 mb-5 ">
        <Header
          images={images}
          setImages={setImages}
          setCheckedCount={setCheckedCount}
          checkedCount={checkedCount}
        />
      </div>
      <SortableList items={images} onSortEnd={onSortEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {renderImages()}

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
