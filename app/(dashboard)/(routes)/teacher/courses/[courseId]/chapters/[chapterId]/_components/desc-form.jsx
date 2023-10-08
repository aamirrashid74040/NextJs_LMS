"use client";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import TextEditor from "@/components/text-editor";
import TextPreview from "@/components/text-preview";

const DescForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  const formSchema = z.object({
    description: z.string().min(1, {
      message: "Chapter description is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData?.description || "" },
  });

  // pulling the values from form state
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter description modified");
      // reseting the state
      toggleEdit();
      // refresh the server component to refresh the title data
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="bg-slate-100 p-4 rounded-md mt-5">
      <div className="font-medium flex items-center justify-between">
        Chapter Description
        <Button onClick={toggleEdit} variant="ghost">
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-5 mr-2" />
              Edit Description
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-600 italic"
          )}
        >
          {!initialData.description && "No Description"}
          {initialData.description && (
            <TextPreview value={initialData.description} />
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                size="sm"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Save Description
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DescForm;
