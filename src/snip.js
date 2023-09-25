const LARGE_SNIP = `<picture>
  <!-- AVIF images -->
  <source
    type="image/avif"
    srcset="
      /[FILENAME]/avif/320w.avif   320w,
      /[FILENAME]/avif/640w.avif   640w,
      /[FILENAME]/avif/1024w.avif 1024w,
      /[FILENAME]/avif/1920w.avif 1920w,
      /[FILENAME]/avif/2560w.avif 2560w
    "
    sizes="(max-width: 320px) 320px,
          (max-width: 640px) 640px,
          (max-width: 1024px) 1024px,
          (max-width: 1920px) 1920px,
          2560px"
  />

  <!-- WebP images -->
  <source
    type="image/webp"
    srcset="
      /[FILENAME]/webp/320w.webp   320w,
      /[FILENAME]/webp/640w.webp   640w,
      /[FILENAME]/webp/1024w.webp 1024w,
      /[FILENAME]/webp/1920w.webp 1920w,
      /[FILENAME]/webp/2560w.webp 2560w
    "
    sizes=" (max-width: 320px) 320px,
            (max-width: 640px) 640px,
            (max-width: 1024px) 1024px,
            (max-width: 1920px) 1920px,
            2560px"
  />

  <!-- Raw image fallback -->
  <img src="[RAW_FILE]" alt="[IMAGE_DESCRIPTION]" />
</picture>
`

const SMALL_SNIP = `<picture>
  <!-- AVIF images -->
  <source
    type="image/avif"
    srcset="
      /[FILENAME]/avif/160w.avif   160w,
      /[FILENAME]/avif/320w.avif   320w,
      /[FILENAME]/avif/512w.avif   512w,
      /[FILENAME]/avif/960w.avif   960w,
      /[FILENAME]/avif/1280w.avif 1280w
    "
    sizes="(max-width: 160px) 160px,
          (max-width: 320px) 320px,
          (max-width: 512px) 512px,
          (max-width: 960px) 960px,
          1280px"
  />

  <!-- WebP images -->
  <source
    type="image/webp"
    srcset="
      /[FILENAME]/webp/160w.webp   160w,
      /[FILENAME]/webp/320w.webp   320w,
      /[FILENAME]/webp/512w.webp   512w,
      /[FILENAME]/webp/960w.webp   960w,
      /[FILENAME]/webp/1280w.webp 1280w
    "
    sizes=" (max-width: 160px) 160px,
            (max-width: 320px) 320px,
            (max-width: 512px) 512px,
            (max-width: 960px) 960px,
            1280px"
  />

  <!-- Raw image fallback -->
  <img src="[RAW_FILE]" alt="[IMAGE_DESCRIPTION]" />
</picture>
`

/**
 * 
 * @param {import('sharp').Sharp} sharpImage 
 * @param {String} imgSrc
 * @param {"small" | "large"} size 
 */
export function generateSnippet(imgSrc, size) {
  const snip = size === 'large' ? LARGE_SNIP : SMALL_SNIP;
  const filename = imgSrc.split('.')[0];
  return snip
    .replace(/\[FILENAME\]/g, filename)
    .replace(/\[RAW_FILE\]/g, imgSrc)
}