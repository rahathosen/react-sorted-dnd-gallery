import { useState } from "react";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";
import { imageData, addImagePlaceholder } from "../data/imageData";

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
    const updatedImages = images.map((image) => {
      if (image.id === id) {
        return {
          ...image,
          checked: !image.checked,
        };
      } else {
        return image;
      }
    });

    const newCheckedCount = updatedImages.filter(
      (image) => image.checked
    ).length;

    setImages(updatedImages);
    setCheckedCount(newCheckedCount);
  };

  const handleDelete = () => {
    const updatedImages = images.filter((image) => !image.checked);
    setImages(updatedImages);
    setCheckedCount(0);
  };

  const renderHeader = () => {
    const handleHeaderCheckboxChange = () => {
      const newCheckedStatus = checkedCount === 0;
      const updatedImages = images.map((image) => ({
        ...image,
        checked: newCheckedStatus,
      }));

      setImages(updatedImages);
      setCheckedCount(newCheckedStatus ? images.length : 0);
    };

    if (checkedCount === 0) {
      return <h2 className="text-3xl font-bold text-black mb-3">Gallery</h2>;
    } else {
      return (
        <h2 className="text-2xl font-bold text-black mb-3">
          <input
            className="lg:scale-150"
            type="checkbox"
            checked={checkedCount > 0}
            onChange={handleHeaderCheckboxChange}
          />{" "}
          {checkedCount} {checkedCount === 1 ? "File" : "Files"} Selected
        </h2>
      );
    }
  };

  const renderDeleteButton = () => {
    if (checkedCount === 0) {
      return null;
    } else {
      return (
        <h2 className="font-semibold text-xl text-red-600 border-red-600 rounded-xl p-2 px-4 hover:underline cursor-pointer">
          {checkedCount === 1 ? "Delete File" : "Delete Files"}
        </h2>
      );
    }
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
            {showHoverOverlay && (
              <div className="bg-black absolute w-full h-full rounded-lg opacity-30"></div>
            )}
            {showCheckedOverlay && (
              <div className="bg-neutral-300 absolute w-full h-full rounded-lg opacity-30"></div>
            )}
            <img
              src={image.imageUrl}
              className="rounded-lg w-full h-full"
              alt="gallery"
            />
            <div>
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
    });
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const id = images.length + 1;
        const newImage = {
          id: id,
          imageUrl: event.target.result,
          checked: false,
        };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="container mx-auto lg:p-10 p-4 mt-10 bg-white rounded-lg">
      <div className="flex justify-between items-center border-b-[3px]  border-neutral-200 mb-5 b">
        {renderHeader()}
        <div onClick={handleDelete} className="text-center lg:text-left">
          {renderDeleteButton()}
        </div>
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
