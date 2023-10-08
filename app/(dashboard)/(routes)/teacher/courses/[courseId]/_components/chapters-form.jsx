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
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import ChapterList from "./chapters-list";

const formSchema = z.object({
  title: z.string().min(1, { message: "Chapter's title is required" }),
});
const ChapterForm = ({ initialData, courseId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  // pulling the values from form state
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chpater created");
      // reseting the state
      toggleCreating();
      // refresh the server component to refresh the title data
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const onReorder = async (updatedData) => {
    // console.log(updatedData);
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updatedData,
      });
      toast.success("Chapter was reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };
  const onEdit = (chapterId) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
  };
  return (
    <div className="bg-slate-100 p-4 rounded-md mt-5 relative">
      {isUpdating && (
        <div className="absolute h-full w-full flex items-center justify-center rounded-md bg-slate-500/20 top-0 right-0 text-sky-700">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button onClick={toggleCreating} variant="ghost">
          {!isCreating ? (
            <>
              <PlusCircle className="h-4 w-5 mr-2" />
              Add a chapter
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Intro to react...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size="sm" type="submit" disabled={!isValid || isSubmitting}>
              Create Chapter
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length && "No chapter available"}

          <ChapterList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs mt-4 text-muted-foreground">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
