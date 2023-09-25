# Web Image optimizer

The goal here is to create multiple image formats and sizes to optimize web page loading.

The image formats are:

- AVIF
- WEBP
- Raw

There are 2 types of sizes:

- `small` for file that are supposed to be displayed in small size (like thumbnails max half of the wiewport)
- `large` for file that are supposed to be displayed in large size (like full screen images)

The image sizes are defined according to these 2 types.

A snippet for usage is generated for each image.

The folder structure is as follows:

- `raw_img_src.extension`
- raw_img_src
  - avif
    - [sizes].avif
  - webp
    - [sizes].webp
  - snippet.html

## Usage

### Get help on the package

```bash
npx img-optimizer-cli help
```

### Create an image optimization

```bash
npx img-optimizer-cli optimize test.png
```
