// Resizes/compresses any image under images/ that's larger than the target,
// in place. Run automatically by .github/workflows/optimize-images.yml on
// every push — you should never need to run this yourself.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_DIM = 2000;       // long edge for the full-size (lightbox) image
const THUMB_DIM = 600;      // long edge for the grid thumbnail
const JPEG_QUALITY = 82;
const THUMB_QUALITY = 74;
const THUMB_SUFFIX = '-thumb';
const ROOT = path.join(__dirname, '..', 'images');

function isThumb(filename){
  return new RegExp(`${THUMB_SUFFIX}\\.(jpe?g|png)$`, 'i').test(filename);
}
function thumbPathFor(file){
  return file.replace(/(\.[a-zA-Z]+)$/, `${THUMB_SUFFIX}$1`);
}

function walk(dir){
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })){
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full));
    // Skip thumbnails themselves — they're generated output, not source photos.
    else if (/\.(jpe?g|png)$/i.test(entry.name) && !isThumb(entry.name)) out.push(full);
  }
  return out;
}

async function ensureFullSize(file){
  const before = fs.statSync(file).size;
  const meta = await sharp(file).metadata();
  const needsResize = meta.width > MAX_DIM || meta.height > MAX_DIM;
  const isJpeg = /\.jpe?g$/i.test(file);

  if (!needsResize && before < 600 * 1024) return false;

  let pipeline = sharp(file).rotate(); // auto-applies EXIF orientation
  if (needsResize){
    pipeline = pipeline.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true });
  }
  pipeline = isJpeg ? pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
                     : pipeline.png({ quality: 82, compressionLevel: 9 });

  const buffer = await pipeline.toBuffer();
  if (buffer.length < before){
    fs.writeFileSync(file, buffer);
    console.log(`optimized ${path.relative(ROOT, file)}: ${(before/1024).toFixed(0)}KB -> ${(buffer.length/1024).toFixed(0)}KB`);
    return true;
  }
  return false;
}

async function ensureThumb(file){
  const thumbFile = thumbPathFor(file);
  const isJpeg = /\.jpe?g$/i.test(file);

  // Regenerate the thumb if it's missing or older than the source photo.
  if (fs.existsSync(thumbFile)){
    const srcTime = fs.statSync(file).mtimeMs;
    const thumbTime = fs.statSync(thumbFile).mtimeMs;
    if (thumbTime >= srcTime) return false;
  }

  let pipeline = sharp(file).rotate()
    .resize({ width: THUMB_DIM, height: THUMB_DIM, fit: 'inside', withoutEnlargement: true });
  pipeline = isJpeg ? pipeline.jpeg({ quality: THUMB_QUALITY, mozjpeg: true })
                     : pipeline.png({ quality: 74, compressionLevel: 9 });

  const buffer = await pipeline.toBuffer();
  fs.writeFileSync(thumbFile, buffer);
  console.log(`thumbnail created: ${path.relative(ROOT, thumbFile)} (${(buffer.length/1024).toFixed(0)}KB)`);
  return true;
}

(async () => {
  if (!fs.existsSync(ROOT)){ console.log('No images/ folder found — nothing to do.'); return; }
  const files = walk(ROOT);
  let changed = 0;
  for (const file of files){
    try{
      const resized = await ensureFullSize(file);
      const thumbed = await ensureThumb(file);
      if (resized || thumbed) changed++;
    }catch(err){
      console.error(`Failed on ${file}:`, err.message);
    }
  }
  console.log(`Done. ${changed} file(s) touched out of ${files.length}.`);
})();
