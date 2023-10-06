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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const DescForm = ({ initialData, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  const formSchema = z.object({
    description: z.string().min(1, {
      message: "Description is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  // pulling the values from form state
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course title modified");
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
        Course Description
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
      {!isEditing ? (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-600 italic"
          )}
        >
          {initialData.description || "No Description"}
        </p>
      ) : (
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
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="e.g. 'This is course is ultimate...'"
                      {...field}
                    />
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
