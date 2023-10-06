"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import FileUpload from "@/components/file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";

const ImageForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Image Uploaded");
      // reseting the state
      toggleEdit();
      // refresh the server component to refresh the title data

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="bg-slate-100 p-4 rounded-md mt-5">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button onClick={toggleEdit} variant="ghost">
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-5 mr-2" />
              Edit Image
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {isEditing && <>Cancel</>}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 border-dashed rounded-md">
            <ImageIcon className="h-12 w-12 text-sky-700" />
          </div>
        ) : (
          <div className="aspect-video relative mt-2">
            <Image
              className="object-cover rounded-md"
              fill
              alt="course image"
              src={initialData.imageUrl}
              sizes=""
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) onSubmit({ imageUrl: url });
            }}
          />
          <div className="text-sm text-muted-foreground mt-3 italic">
            16:9 aspect ratio is recommended for course image
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
