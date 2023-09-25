/**
 * 
 * @param {String} avifFolder 
 * @param {import('sharp').Sharp} sharpImage 
 * @param {number[]} sizes 
 */
export async function toAvifFiles(avifFolder, sharpImage, sizes) {
  const avifFiles = sizes.map((size) => `${avifFolder}/${size}.avif`)
  const avifPromises = sizes.map((size, index) => {
    return sharpImage
      .clone()
      .avif()
      .resize(size)
      .toFile(avifFiles[index])
  })
  await Promise.all(avifPromises)
  return avifFiles
}

/**
 * 
 * @param {String} webpFolder 
 * @param {import('sharp').Sharp} sharpImage 
 * @param {number[]} sizes 
 */
export async function toWebpFiles(webpFolder, sharpImage, sizes) {
  const webpFiles = sizes.map((size) => `${webpFolder}/${size}.webp`)
  const webpPromises = sizes.map((size, index) => {
    return sharpImage
      .clone()
      .webp()
      .resize(size)
      .toFile(webpFiles[index])
  })
  await Promise.all(webpPromises)
  return webpFiles
}
