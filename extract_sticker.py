from PIL import Image
import sys

def extract_sticker(input_image, output_image, crop_box=None):
    """
    Extract sticker from image
    crop_box: (left, top, right, bottom) tuple or None to show image info
    """
    try:
        img = Image.open(input_image)
        print(f"Image size: {img.size}")
        print(f"Image mode: {img.mode}")
        
        if crop_box:
            left, top, right, bottom = crop_box
            # Crop the image
            sticker = img.crop((left, top, right, bottom))
            sticker.save(output_image)
            print(f"Sticker extracted and saved to {output_image}")
            print(f"Cropped size: {sticker.size}")
        else:
            # Just show image info
            print("\nTo extract sticker, provide crop coordinates:")
            print("Usage: extract_sticker('img1.webp', 'sticker.png', (x1, y1, x2, y2))")
            print(f"\nImage dimensions: {img.size[0]} x {img.size[1]}")
            print("You can use an image editor to find the coordinates of the sticker area")
            
    except Exception as e:
        print(f"Error: {str(e)}")
        print("Note: PIL (Pillow) library is required. Install with: pip install Pillow")

if __name__ == "__main__":
    input_file = "img1.webp"
    output_file = "sticker_extracted.png"
    
    # If you know the crop coordinates, uncomment and adjust:
    # extract_sticker(input_file, output_file, crop_box=(x1, y1, x2, y2))
    
    # Otherwise, just show image info
    extract_sticker(input_file, output_file)
