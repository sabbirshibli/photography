// Resizes/compresses any image under images/ that's larger than the target,
// in place. Run automatically by .github/workflows/optimize-images.yml on
// every push — you should never need to run this yourself.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAX_DIM = 2000;      // long edge, in pixels
const JPEG_QUALITY = 82;
const ROOT = path.join(__dirname, '..', 'images');

function walk(dir){
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })){
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full));
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

async function processFile(file){
  const before = fs.statSync(file).size;
  const img = sharp(file);
  const meta = await img.metadata();

  const needsResize = meta.width > MAX_DIM || meta.height > MAX_DIM;
  const isJpeg = /\.jpe?g$/i.test(file);

  // Skip files that are already small and don't need resizing.
  if (!needsResize && before < 600 * 1024) return false;

  let pipeline = sharp(file).rotate(); // rotate() auto-applies EXIF orientation
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

(async () => {
  if (!fs.existsSync(ROOT)){ console.log('No images/ folder found — nothing to do.'); return; }
  const files = walk(ROOT);
  let changed = 0;
  for (const file of files){
    try{
      if (await processFile(file)) changed++;
    }catch(err){
      console.error(`Failed on ${file}:`, err.message);
    }
  }
  console.log(`Done. ${changed} file(s) optimized out of ${files.length}.`);
})();
