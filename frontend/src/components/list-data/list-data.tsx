import React, { useContext } from "react";
import { DataTable } from "../ui/data-table";
import { csvDataColumns } from "@/lib/data-table/columns";
import { DataContext } from "@/context/data-context";

const ListData = () => {
  const { postData } = useContext(DataContext);

  return (
    <div className="mx-auto py-5">
      <DataTable columns={csvDataColumns} data={postData} />
    </div>
  );
};

export default ListData;
