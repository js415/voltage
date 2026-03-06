# Extracting Sticker from img1.webp

## Option 1: Using Python Script

1. Install Pillow: `pip install Pillow`
2. Open the image in an image editor to find the sticker coordinates
3. Edit `extract_sticker.py` and uncomment the crop line with coordinates:
   ```python
   extract_sticker('img1.webp', 'sticker_extracted.png', crop_box=(x1, y1, x2, y2))
   ```
4. Run: `python extract_sticker.py`
5. Update `index.html` to use `sticker_extracted.png` instead of `img1.webp`

## Option 2: Using CSS object-position

Edit `styles.css` and adjust the `.sticker-image` `object-position` property:
- `object-position: top left;` - shows top-left area
- `object-position: top right;` - shows top-right area  
- `object-position: center;` - shows center area
- `object-position: 30% 20%;` - custom position (30% from left, 20% from top)

## Option 3: Manual Crop

1. Open `img1.webp` in an image editor
2. Crop the sticker portion
3. Save as `sticker.png`
4. Update `index.html` to use the new file

## Current Image Info
- Size: 800 x 475 pixels
- Format: WebP
