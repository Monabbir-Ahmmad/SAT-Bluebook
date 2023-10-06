import { S3_BUCKET_NAME, s3 } from "../config/s3.config";

import { randomUUID } from "crypto";

export const storeBase64AsFile = async (base64: string) => {
  const arr = base64.split(",");

  if (arr.length < 2) throw new Error("Invalid base64 format");

  const mimeArr = arr[0].match(/:(.*?);/);

  if (!mimeArr || mimeArr.length < 2) throw new Error("Invalid mime type");

  const buffer = Buffer.from(arr[1], "base64");

  const fileExtension = mimeArr[1].split("/")[1];

  const fileName = `${randomUUID()}.${fileExtension}`;

  const uploadedFile = await s3
    .upload({
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: mimeArr[1],
    })
    .promise();

  return uploadedFile.Location;
};
