import { createContext } from "react";
import { TCsvData } from "@/types/upload";

export type TDataContext = {
  postData: TCsvData[];
  setPostData: (csvData: TCsvData[]) => void;
};

export const DataContext = createContext<TDataContext>({
  postData: [],
  setPostData: (csvData: TCsvData[]) => {},
});
