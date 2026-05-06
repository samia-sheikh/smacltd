import { useEffect, useState } from "react";

export const useImagePreview = (imageFile, type) => {
  const [previewFile, setPreviewFile] = useState([]);

  useEffect(() => {
    if (type && imageFile?.length) {
      //to handle multiple images at once
      let data = [];
      for (let i = 0; i < imageFile.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile[i]);
        reader.onloadend = () => {
          //console.log(reader.result);
          data.push({
            url: reader.result,
            name: imageFile[i].name,
          });
        };
        // data.push({
        //   url: window.URL.createObjectURL(imageFile[i]),
        //   name: imageFile[i].name,
        // });
      }
      setTimeout(() => {
        setPreviewFile(data);
      }, 500);
    } else if (imageFile && !type) {
      //to handle single image
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => setPreviewFile(reader.result);
    } else {
      setPreviewFile("");
    }
  }, [imageFile]);

  return previewFile;
};
