import { v2 as cloudinary } from 'cloudinary';

let configured = false;

export function getCloudinary() {
  if (configured) return cloudinary;

  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      'Cloudinary API is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local (Dashboard → Settings → API Keys).',
    );
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
  });
  configured = true;
  return cloudinary;
}

export async function pingCloudinary() {
  return getCloudinary().api.ping();
}

export async function listRootFolders() {
  return getCloudinary().api.root_folders();
}

export async function getFolder(path) {
  return getCloudinary().api.sub_folders(path);
}
