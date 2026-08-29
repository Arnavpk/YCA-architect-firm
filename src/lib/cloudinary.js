const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dmjaisk94';

export const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

export function cloudinaryImage(publicId, width) {
  const transform = width ? `w_${width},q_auto,f_auto` : 'q_auto,f_auto';
  return `${CLOUDINARY_BASE}/${transform}/${publicId}`;
}
