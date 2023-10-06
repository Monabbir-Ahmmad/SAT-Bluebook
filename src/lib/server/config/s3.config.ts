import { S3 } from "aws-sdk";

const S3_REGION = process.env.S3_REGION || "";
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || "";
const S3_SECRET_KEY = process.env.S3_SECRET_KEY || "";

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";

export const s3 = new S3({
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
});
