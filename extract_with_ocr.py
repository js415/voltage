from pdf2image import convert_from_path
import pytesseract
import json
import os

# Try to use OCR for image-based PDFs
def extract_with_ocr(pdf_path):
    """Extract text using OCR for image-based PDFs"""
    try:
        print(f"\n{'='*60}")
        print(f"Attempting OCR extraction from: {pdf_path}")
        print(f"{'='*60}\n")
        
        # Convert PDF to images
        images = convert_from_path(pdf_path, dpi=300)
        
        text_content = []
        for i, image in enumerate(images, 1):
            print(f"Processing page {i}...")
            # Extract text using OCR
            text = pytesseract.image_to_string(image, lang='eng')
            if text.strip():
                text_content.append({
                    'page': i,
                    'text': text
                })
                print(f"Page {i} extracted:")
                print(text[:500] + "..." if len(text) > 500 else text)
                print("-" * 60)
        
        return text_content
    except Exception as e:
        print(f"OCR Error: {str(e)}")
        print("Note: Tesseract OCR might not be installed. Skipping OCR extraction.")
        return None

if __name__ == "__main__":
    # Try OCR for classic.pdf
    result = extract_with_ocr("classic.pdf")
    if result:
        with open("extracted_classic_ocr.json", "w", encoding="utf-8") as f:
            json.dump({"classic.pdf": result}, f, indent=2, ensure_ascii=False)
        print("\nOCR extraction saved to extracted_classic_ocr.json")
