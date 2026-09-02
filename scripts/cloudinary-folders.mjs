import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { v2: cloudinary } = require('cloudinary');

const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

if (!cloud_name || !api_key || !api_secret) {
  console.error(
    'Missing Cloudinary credentials. Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local (Dashboard → Settings → API Keys).',
  );
  process.exit(1);
}

cloudinary.config({ cloud_name, api_key, api_secret, secure: true });

const LOOKUP = ['YCA', 'Gholap', 'Maharaja Jewellers'];

const ping = await cloudinary.api.ping();
console.log(`Connected to Cloudinary (${cloud_name}). status: ${ping.status}`);

const { folders = [] } = await cloudinary.api.root_folders();
const names = folders.map((folder) => folder.name);

console.log(`\nRoot folders (${names.length}):`);
for (const name of names) console.log(`  - ${name}`);

console.log('\nRequested folders:');
for (const name of LOOKUP) {
  const exact = names.includes(name);
  const close = names.filter((n) => n.toLowerCase().includes(name.toLowerCase()));
  if (exact) {
    console.log(`  ${name}: found`);
  } else if (close.length) {
    console.log(`  ${name}: not an exact match; similar: ${close.join(', ')}`);
  } else {
    console.log(`  ${name}: not found`);
  }
}
