export const handleDeleteUtil = (images, setImages, setCheckedCount) => {
  const updatedImages = images.filter((image) => !image.checked);
  setImages(updatedImages);
  setCheckedCount(0);
};

export const handleCheckboxChangeUtil = (
  id,
  images,
  setImages,
  setCheckedCount
) => {
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

  const newCheckedCount = updatedImages.filter((image) => image.checked).length;

  setImages(updatedImages);
  setCheckedCount(newCheckedCount);
};

export const handleHeaderCheckboxChangeUtil = (
  checkedCount,
  images,
  setImages,
  setCheckedCount
) => {
  const newCheckedStatus = checkedCount === 0;
  const updatedImages = images.map((image) => ({
    ...image,
    checked: newCheckedStatus,
  }));

  setImages(updatedImages);
  setCheckedCount(newCheckedStatus ? images.length : 0);
};

export const handleAddImageUtil = (e, images, setImages) => {
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
