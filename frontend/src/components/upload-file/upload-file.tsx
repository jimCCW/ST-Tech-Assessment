import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/ui/page-loader";
import apiData from "@/services/api-data";
import { DataContext } from "@/context/data-context";

const uploadFileFormSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((file: FileList) => file?.length || 0, "File is required")
    .refine((file: FileList) => {
      return file?.length > 0 && file[0].type === "text/csv";
    }, "File must be a csv file format"),
});

const UploadFile = () => {
  const { setPostData } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof uploadFileFormSchema>>({
    resolver: zodResolver(uploadFileFormSchema),
  });

  const fileRef = form.register("file");

  const onSubmit = async (values: z.infer<typeof uploadFileFormSchema>) => {
    setIsLoading(true);
    try {
      const res = await apiData.upload(values);

      if (res.success) {
        setPostData(res.data);
        toast.success("File Uploaded!");
      } else {
        toast.error(res?.mesasge || "Error upload file");
      }
    } catch (error: any) {
      toast.error("Upload file failed: " + error);
    }

    setIsLoading(false);
  };

  return (
    <section className="w-full max-w-xl m-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase font-bold">
                  Upload CSV data file
                </FormLabel>
                <FormControl>
                  <Input type="file" placeholder="choose a file" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Upload
          </Button>
        </form>
      </Form>
      <PageLoader isOpen={isLoading} />
    </section>
  );
};

export default UploadFile;
