import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import csv from "csv-parser";

const dataFilePathname = "data";
const dataFilename = "data.csv";

let uploadedData: any[] = [];

// Read and parse CSV
const processCSV = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const data: any[] = [];
    fs.createReadStream(filePath)
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.trim(),
        })
      )
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data))
      .on("error", (err) => reject(err));
  });
};

// Move file to temp folder
const moveFile = (file: any, targetPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    file.mv(targetPath, (err: any) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const dataUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || !req.files.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded." });
  }

  const file = req.files.file as any;

  // Check file extension and MIME type
  const fileExtension = path.extname(file.name).toLowerCase();
  const mimeType = file.mimetype;

  if (fileExtension !== ".csv" || mimeType !== "text/csv") {
    return res
      .status(400)
      .json({ success: false, message: "Only CSV files are allowed." });
  }

  const fileDir = path.join(__dirname, "/../" + dataFilePathname);
  const filePath = path.join(fileDir, dataFilename);

  // Check directory exist. If not create one
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }

  try {
    await moveFile(file, filePath);

    uploadedData = await processCSV(filePath);
    res.status(200).json({
      success: true,
      data: uploadedData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error processing file:" + error?.message,
    });
  }
};
