/* eslint-disable react/prop-types */

// Header component responsible for rendering the header of the image gallery, including checkbox controls and delete functionality.
import { handleHeaderCheckboxChangeUtil, handleDeleteUtil } from "../utils";

export default function Header({
  images,
  setImages,
  setCheckedCount,
  checkedCount,
}) {
  // Function for handling changes in the header checkbox
  const handleHeaderCheckboxChange = () => {
    handleHeaderCheckboxChangeUtil(
      checkedCount,
      images,
      setImages,
      setCheckedCount
    );
  };

  // Function for handling deletion of selected images
  const handleDelete = () => {
    handleDeleteUtil(images, setImages, setCheckedCount);
  };

  // Function for rendering the delete button based on the checked count
  const renderDeleteButton = () => {
    if (checkedCount === 0) {
      return null;
    } else {
      return (
        <h2
          onClick={handleDelete}
          className="font-semibold text-xl text-red-600 border-red-600 rounded-xl p-2 px-4 hover:underline cursor-pointer"
        >
          {checkedCount === 1 ? "Delete File" : "Delete Files"}
        </h2>
      );
    }
  };

  // Conditional rendering based on the checked count
  if (checkedCount === 0) {
    return <h2 className="text-2xl font-bold text-black mb-3">Gallery</h2>;
  } else {
    return (
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-2xl font-bold text-black mb-3">
          {/* Checkbox input for header checkbox */}
          <input
            className="lg:scale-150"
            type="checkbox"
            checked={checkedCount > 0}
            onChange={handleHeaderCheckboxChange}
          />{" "}
          {checkedCount} {checkedCount === 1 ? "File" : "Files"} Selected
        </div>
        {/* Rendering the delete button */}
        <div onClick={handleDelete} className="text-2xl font-bold text-black">
          {renderDeleteButton()}
        </div>
      </div>
    );
  }
}
