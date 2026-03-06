from PIL import Image
import numpy as np

def extract_sticker_with_transparency(input_image, output_image, crop_box=None, bg_color=None):
    """
    Extract sticker from image with transparent background
    """
    try:
        img = Image.open(input_image)
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        print(f"Original image size: {img.size}")
        
        # Crop if coordinates provided
        if crop_box:
            left, top, right, bottom = crop_box
            img = img.crop((left, top, right, bottom))
            print(f"Cropped to: {img.size}")
        
        # Create transparent background
        # Convert to numpy array for processing
        data = np.array(img)
        
        # If bg_color is provided, make that color transparent
        if bg_color:
            r, g, b = bg_color
            # Find pixels matching background color (with tolerance)
            mask = (data[:,:,0] == r) & (data[:,:,1] == g) & (data[:,:,2] == b)
            data[mask] = [0, 0, 0, 0]  # Make transparent
        
        # Alternative: Make white/light backgrounds transparent
        # This makes pixels that are very light (close to white) transparent
        if not bg_color:
            # Create alpha channel based on brightness
            # Pixels close to white (RGB > 240) become transparent
            alpha = data[:,:,3].copy()
            white_threshold = 240
            light_pixels = (data[:,:,0] > white_threshold) & (data[:,:,1] > white_threshold) & (data[:,:,2] > white_threshold)
            alpha[light_pixels] = 0
            data[:,:,3] = alpha
        
        # Convert back to PIL Image
        result = Image.fromarray(data)
        
        # Save as PNG with transparency
        result.save(output_image, 'PNG')
        print(f"Sticker saved to {output_image} with transparent background")
        print(f"  Size: {result.size}")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        print("\nNote: Install required libraries:")
        print("  pip install Pillow numpy")

if __name__ == "__main__":
    input_file = "img1.webp"
    output_file = "jse-sticker.png"
    
    # Extract the full image first, then you can adjust crop_box if needed
    # crop_box format: (left, top, right, bottom)
    # For now, we'll process the whole image and make light backgrounds transparent
    
    print("Extracting sticker from img1.webp...")
    print("Making light/white backgrounds transparent...")
    
    extract_sticker_with_transparency(
        input_file, 
        output_file,
        crop_box=None,  # Set to (x1, y1, x2, y2) to crop specific area
        bg_color=None   # Set to (r, g, b) to remove specific color
    )
    
    print("\nDone! Update index.html to use 'jse-sticker.png'")
