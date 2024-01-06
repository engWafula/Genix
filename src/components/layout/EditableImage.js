
"use client"
import { useState } from "react";
import Image from "next/image";
export default function EditableImage({link, setLink}) {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');

  async function handleFileChange(ev) {
    // const files = ev.target.files;
    // if (files?.length === 1) {
    //   const data = new FormData;
    //   data.set('file', files[0]);

    //   const uploadPromise = fetch('/api/upload', {
    //     method: 'POST',
    //     body: data,
    //   }).then(response => {
    //     if (response.ok) {
    //       return response.json().then(link => {
    //         setLink(link);
    //       })
    //     }
    //     throw new Error('Something went wrong');
    //   });

    //   await toast.promise(uploadPromise, {
    //     loading: 'Uploading...',
    //     success: 'Upload complete',
    //     error: 'Upload error',
    //   });
    // }

    const selectedFile = ev.target.files[0];

    setFile(selectedFile);
    setFilename(selectedFile.name);

    ev.preventDefault();

    // setFile(ev.target.files[0]);
    // setFilename(ev.target.files[0].name);

    ev.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile); // Use the updated file directly
    formData.append("upload_preset", "upload");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ultronic-software-developers/image/upload",
        {
         method: 'POST',
         body:  formData,
        }
      );
            setLink(response.data.url);

      //             await toast.promise(response, {
      //   loading: 'Uploading...',
      //   success: 'Upload complete',
      //   error: 'Upload error',
      // });

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input id="file" type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  );
}