/* eslint-disable react/prop-types */

import { handleHeaderCheckboxChangeUtil, handleDeleteUtil } from "../utils";

export default function Header({
  images,
  setImages,
  setCheckedCount,
  checkedCount,
}) {
  const handleHeaderCheckboxChange = () => {
    handleHeaderCheckboxChangeUtil(
      checkedCount,
      images,
      setImages,
      setCheckedCount
    );
  };

  const handleDelete = () => {
    handleDeleteUtil(images, setImages, setCheckedCount);
  };

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

  if (checkedCount === 0) {
    return <h2 className="text-2xl font-bold text-black mb-3">Gallery</h2>;
  } else {
    return (
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-2xl font-bold text-black mb-3">
          <input
            className="lg:scale-150"
            type="checkbox"
            checked={checkedCount > 0}
            onChange={handleHeaderCheckboxChange}
          />{" "}
          {checkedCount} {checkedCount === 1 ? "File" : "Files"} Selected
        </div>
        <div onClick={handleDelete} className="text-2xl font-bold text-black">
          {renderDeleteButton()}
        </div>
      </div>
    );
  }
}
