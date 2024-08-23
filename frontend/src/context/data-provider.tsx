import { FC, useState } from "react";
import { TCsvData } from "@/types/upload";
import { DataContext } from "./data-context";

interface IDataProviderProps {
  children: React.ReactNode;
}

const DataProvider: FC<IDataProviderProps> = ({ children }) => {
  const [postData, setPostData] = useState<TCsvData[]>([]);

  return (
    <DataContext.Provider value={{ postData, setPostData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
