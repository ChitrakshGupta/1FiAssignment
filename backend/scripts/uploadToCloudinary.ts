import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function main() {
  const imagesDir = path.resolve(__dirname, "../../frontend/public/images/products");
  const files = fs.readdirSync(imagesDir).filter((f) => f.endsWith(".jpg"));

  console.log(`Found ${files.length} images to upload to Cloudinary...`);
  const uploadedMap: Record<string, string> = {};

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const publicId = path.parse(file).name;
    console.log(`Uploading ${file} as public_id: 1fi_products/${publicId}...`);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "1fi_products",
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
      });

      console.log(`✅ Uploaded ${file} -> ${result.secure_url}`);
      uploadedMap[file] = result.secure_url;
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err);
    }
  }

  const outputPath = path.resolve(__dirname, "../cloudinary-urls.json");
  fs.writeFileSync(outputPath, JSON.stringify(uploadedMap, null, 2));
  console.log(`Saved URLs map to ${outputPath}`);
}

main().catch(console.error);
