import React, { FC } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Loader2Icon } from "lucide-react";

interface IPageLoaderProps {
  isOpen: boolean;
}

const PageLoader: FC<IPageLoaderProps> = ({ isOpen }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription className="w-full h-full flex flex-col justify-center items-center gap-2">
            <Loader2Icon size={52} className="animate-spin" />
            <span className="text-3xl font-bold">Loading</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PageLoader;
