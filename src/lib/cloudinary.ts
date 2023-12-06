import { Asset } from "@/types";

import { v2 as cloudStore } from 'cloudinary'

// Return "https" URLs by setting secure: true
cloudStore.config({
  secure: true
});


const isDev = process.env.NODE_ENV === 'development';

const folder = isDev ? 'test-assets' : 'assets';




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

export const upload = async (file: string): Promise<Asset> => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      // use_filename: true,
      // display_name: display_name,
      // unique_filename: false,
      // overwrite: true,
      folder
    };

    try {
      // Upload the image
      const result = await cloudStore.uploader.upload(file, options);
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
        const result = await cloudStore.api.resource(asset_id, options);
        //   console.log(result);
        //   return result.public_id;
        return parseAsset(result);
    } catch (error) {
      console.error(error);

      throw new Error("Resource fetch unsuccessful")
    }
};



// ? https://cloudinary.com/documentation/image_upload_api_reference