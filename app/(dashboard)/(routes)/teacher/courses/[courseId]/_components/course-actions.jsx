"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import ConfirmModal from "@/components/modals/confirm-model";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

const CourseActoins = ({ disabled, isPublished, courseId }) => {
  // console.log(disabled, isPublished, courseId);
  const [isLoading, setIsLoding] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    console.log("Handle delete...");
    try {
      setIsLoding(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      router.push("/teacher/courses");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoding(false);
    }
  };
  const publishHandler = async () => {
    try {
      setIsLoding(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
        router.refresh();
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoding(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        // disabled={disabled}
        disabled={isLoading || disabled}
        variant="outline"
        size="sm"
        onClick={publishHandler}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={handleDelete}>
        <Button disabled={isLoading} variant="destructive" size="sm">
          <Trash className="h-5 w-5" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseActoins;
