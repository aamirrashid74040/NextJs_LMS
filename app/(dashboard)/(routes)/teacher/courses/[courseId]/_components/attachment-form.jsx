"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import FileUpload from "@/components/file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";

const AttachmentForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Attachment Uploaded");
      // reseting the state
      toggleEdit();
      // refresh the server component to refresh the title data

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // deleting the attachment
  const onDelete = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("File deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="bg-slate-100 p-4 rounded-md mt-5">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={toggleEdit} variant="ghost">
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
          {isEditing && <>Cancel</>}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData?.attachements?.length === 0 && (
            <p className="text-slate-500 italic text-sm mt-2">
              No files or attachments
            </p>
          )}
          {initialData?.attachements?.length > 0 && (
            <div className="space-y-2 mt-2">
              {initialData.attachements.map((attachement) => (
                <div
                  key={attachement.id}
                  className="flex items-center bg-sky-100 text-sky-700 p-3 w-full rounded-md border-sky-200 border space-x-2 group"
                >
                  <File className="h-4 w-4 md:h-5 md:w-5 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1 group-hover:underline">
                    {attachement.name}
                  </p>
                  {deletingId === attachement.id && (
                    <div>
                      <Loader2 className="h-4 y-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachement.id && (
                    <button
                      onClick={() => onDelete(attachement.id)}
                      className="hover:opacity-75 ml-auto"
                    >
                      <X className="h-4 y-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) onSubmit({ url });
            }}
          />
          <div className="text-sm text-muted-foreground mt-3 italic">
            Add attachment e.g. image, pdf, text file etc.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
