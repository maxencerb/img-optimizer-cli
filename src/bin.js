#!/usr/bin/env node
import sharp from 'sharp'
import { createDirIfNotExist } from './file.js'
import { toAvifFiles, toWebpFiles } from './optimize.js'
import { Command } from 'commander'
import { generateSnippet } from './snip.js'
import fs from 'fs'

const FULL_SCREEN_SIZES = [320, 640, 1024, 1920, 2560]
const PARTIAL_SIZES = FULL_SCREEN_SIZES.map((size) => size / 2)

/**
 * 
 * @param {String} imageSrc 
 * @param {number[]} sizes
 */
async function createImages(imageSrc, sizes) {
  const sharpImage = sharp(imageSrc)

  // create a folder with the same name as the image
  const folder = imageSrc.split('.')[0]

  createDirIfNotExist(folder)

  const avifFolder = `${folder}/avif`
  const webpFolder = `${folder}/webp`

  createDirIfNotExist(avifFolder)
  createDirIfNotExist(webpFolder)

  await Promise.all([
    toAvifFiles(avifFolder, sharpImage, sizes),
    toWebpFiles(webpFolder, sharpImage, sizes),
  ])
}

/**
 * 
 * @param {string} imgSrc 
 * @param {"small" | "large"} size 
 * @param {boolean} noSnippet 
 */
function _generateSnippet(imgSrc, size, noSnippet) {
  if (noSnippet) return;
  const snip = generateSnippet(imgSrc, size);
  const filename = imgSrc.split('.')[0];
  const snippetFile = `${filename}/snippet.html`;
  createDirIfNotExist(filename);
  fs.writeFileSync(snippetFile, snip);
}


async function main() {

  const program = new Command();

  program
    .name(process.env.npm_package_name)
    .description('Create multiple images for web from a source image')
    .version(process.env.npm_package_version)

  program
    .command('optimize')
    .description('Create multiple images from a source image')
    .argument('<file>', 'The source image')
    .option('-l, --large', 'For images that will be displayed fullscreen')
    .option('-n, --no-snippet', 'Do not generate a snippet')
    .action(
      /**
       * 
       * @param {String} file 
       * @param {{large: boolean, noSnippet: boolean}} options 
       */
      async (file, options) => {
        try {
          const sizes = options.large ? FULL_SCREEN_SIZES : PARTIAL_SIZES
          _generateSnippet(file, options.large ? 'large' : 'small', options.noSnippet)
          console.log(`Creating images for ${file} with sizes ${sizes.join(', ')}`)

          await Promise.all([
            createImages(file, sizes),

          ])
          console.log('Done!')
        } catch (err) {
          console.error(err)
        }
      }
    )
  program.parse(process.argv);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })