import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const storeBase64AsFile = async (base64: string) => {
  const arr = base64.split(",");

  if (arr.length < 2) throw new Error("Invalid base64 format");

  const mimeArr = arr[0].match(/:(.*?);/);

  if (!mimeArr || mimeArr.length < 2) throw new Error("Invalid mime type");

  const buffer = Buffer.from(arr[1], "base64");

  const fileExtension = mimeArr[1].split("/")[1];

  const filePath = path.join("images", `${randomUUID()}.${fileExtension}`);

  await fs.writeFile(path.join(process.cwd(), "public", filePath), buffer);

  return filePath;
};

export const deleteFile = async (filePath: string) => {
  await fs.unlink(path.join(process.cwd(), "public", filePath));
};

export const deleteFiles = async (filePaths: string[]) => {
  await Promise.all(
    filePaths.map(async (filePath) => await deleteFile(filePath))
  );
};
