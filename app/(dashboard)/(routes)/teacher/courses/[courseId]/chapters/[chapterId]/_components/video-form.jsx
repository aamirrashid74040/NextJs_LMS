"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, PlusCircle, Video } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import * as z from "zod";
import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";

const formSchema = z.object({
  videoUrl: z.string().min(1),
});
const VideoForm = ({ initialData, courseId, chapterId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Video Uploaded");
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
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-5 mr-2" />
              Edit Vidoe
            </>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Video
            </>
          )}
          {isEditing && <>Cancel</>}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 border-dashed rounded-md">
            <Video className="h-12 w-12 text-sky-700" />
          </div>
        ) : (
          <div className="aspect-video relative mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) onSubmit({ videoUrl: url });
            }}
          />
          <div className="text-sm text-muted-foreground mt-3 italic">
            Upload the chapter video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-3">
          Videos can take a while to upload, please refresh the page if video
          does not apear
        </div>
      )}
    </div>
  );
};

export default VideoForm;
