import { UploadDropzone } from "@/lib/uploadthing";
import React from "react";
import toast from "react-hot-toast";

const FileUpload = ({ onChange, endpoint }) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};

export default FileUpload;
