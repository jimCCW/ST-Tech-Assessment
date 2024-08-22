import request from "supertest";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import app from "../../app";

describe("POST /data/upload", () => {
  const testFilePath = path.join(__dirname, "../../data/test.csv");

  beforeAll(() => {
    // Create a test CSV file
    const csvContent =
      "postId,id,name,email,body\n1,1,Doe,test@test.com,testing\n2,2,John,test@test.com,";
    fs.writeFileSync(testFilePath, csvContent);
  });

  afterAll(() => {
    // Delete test CSV and uploaded file if exists
    fs.unlinkSync(testFilePath);
    const uploadedFilePath = path.join(__dirname, "../../data/data.csv");
    if (fs.existsSync(uploadedFilePath)) {
      fs.unlinkSync(uploadedFilePath);
    }
  });

  it("should return 400 if no file is uploaded", async () => {
    const response = await request(app).post("/data/upload");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success");
    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("No file uploaded.");
  });

  it("should return 200 and processed data", async () => {
    const response = await request(app)
      .post("/data/upload")
      .attach("file", testFilePath);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success");
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual([
      {
        postId: "1",
        id: "1",
        name: "Doe",
        email: "test@test.com",
        body: "testing",
      },
      {
        postId: "2",
        id: "2",
        name: "John",
        email: "test@test.com",
        body: "",
      },
    ]);
  });

  it("should return 400 if the file format is not csv", async () => {
    const response = await request(app)
      .post("/data/upload")
      .attach("file", path.join(__dirname, "../data/invalid.txt"));

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success");
    expect(response.body.success).toBe(false);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Only CSV files are allowed.");
  });
});
