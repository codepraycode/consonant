import { Asset } from "@/types";

const cloudinary = require('cloudinary');


const cloudStore = cloudinary.v2;

// Return "https" URLs by setting secure: true
cloudStore.config({
  secure: true
});



function parseAsset(asset:Record<string, any>): Asset {
    return {
        asset_id: asset.asset_id,
        public_id: asset.public_id,
        created_at: asset.created_at,
        format: asset.format,
        url: asset.url,
        secure_url: asset.secure_url
    }
}

// Log the configuration
// console.log(cloudStore.config());

export const upload = async (filePath: string): Promise<Asset> => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(filePath, options);
        //   console.log(result);
        //   return result.public_id;
        return parseAsset(result);

    } catch (error) {
      console.error(error);

      throw new Error("Upload unsuccessful")
    }
};


export const fetchResource = async (asset_id: string): Promise<Asset> => {

    // ? Uses asset id to query file
    const options = {};

    try {
        // Upload the image
        const result = await cloudinary.api.resource(asset_id, options);
        //   console.log(result);
        //   return result.public_id;
        return parseAsset(result);
    } catch (error) {
      console.error(error);

      throw new Error("Resource fetch unsuccessful")
    }
};

