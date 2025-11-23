import React, { useRef, useState } from "react";
import { ReactCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function CropperModal({ src, onClose, onCropDone }) {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;

    const initialCrop = centerCrop(
      makeAspectCrop(
        { unit: "%", width: 90 },
        1, // aspect ratio 1:1
        width,
        height
      ),
      width,
      height
    );

    setCrop(initialCrop);
  };

  const createCroppedImage = () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement("canvas");

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const fileURL = URL.createObjectURL(blob);
      onCropDone(fileURL); // send back to Upload.jsx
      onClose();
    }, "image/jpeg");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[2000] overflow-auto">
      <div className="bg-white p-4 rounded-xl w-[90%] max-w-[500px] my-4">
        <h2 className="text-lg font-semibold mb-3">Crop Image</h2>

        <div className="w-full">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img ref={imgRef} src={src} onLoad={onImageLoad} />
          </ReactCrop>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={createCroppedImage}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default CropperModal;
