import React from "react";
import UploadFile from "./components/upload-file/upload-file";
import ListData from "./components/list-data/list-data";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <main className="w-full max-w-7xl p-3 m-auto">
      <UploadFile />
      <Separator className="mt-5" />
      <ListData />
    </main>
  );
}

export default App;
