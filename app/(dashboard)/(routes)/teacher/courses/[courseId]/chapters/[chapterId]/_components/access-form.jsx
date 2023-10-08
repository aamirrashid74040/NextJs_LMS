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
  FormField,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const AccessForm = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);
  const formSchema = z.object({
    isFree: z.boolean().default(false),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData?.isFree,
      // isFree: Boolean(initialData.isFree),
      // above both lines have same meaning
    },
  });

  // pulling the values from form state
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter access modified");
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
        Chapter access settings
        <Button onClick={toggleEdit} variant="ghost">
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-5 mr-2" />
              Edit access
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.isFree && "text-slate-600 italic"
          )}
        >
          {initialData.isFree && <>This chapter is free for preview</>}
          {!initialData.isFree && <>This chapter is not free for preview</>}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className="space-y-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-3 rounded-md border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check if this chapter is free of cost for preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                size="sm"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AccessForm;
