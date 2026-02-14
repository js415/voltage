import pdfplumber
import sys
import json
import io

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF file"""
    text_content = []
    try:
        with pdfplumber.open(pdf_path) as pdf:
            print(f"\n{'='*60}")
            print(f"Extracting from: {pdf_path}")
            print(f"Total pages: {len(pdf.pages)}")
            print(f"{'='*60}\n")
            
            for i, page in enumerate(pdf.pages, 1):
                try:
                    text = page.extract_text()
                    if text and text.strip():
                        text_content.append({
                            'page': i,
                            'text': text
                        })
                        print(f"Page {i}:")
                        # Handle encoding issues
                        try:
                            print(text[:500] + "..." if len(text) > 500 else text)
                        except UnicodeEncodeError:
                            print(text[:500].encode('utf-8', errors='ignore').decode('utf-8') + "...")
                        print("-" * 60)
                    else:
                        print(f"Page {i}: No text found (likely image-based PDF)")
                        print("-" * 60)
                except Exception as e:
                    print(f"Error on page {i}: {str(e)}")
        
        return text_content
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {str(e)}")
        return None

if __name__ == "__main__":
    pdf_files = ["CLASSIC COOLER.pdf", "classic.pdf"]
    
    all_extracted_data = {}
    
    for pdf_file in pdf_files:
        try:
            extracted = extract_text_from_pdf(pdf_file)
            if extracted:
                all_extracted_data[pdf_file] = extracted
        except Exception as e:
            print(f"Failed to process {pdf_file}: {str(e)}")
    
    # Save to JSON file
    with open("extracted_pdf_data.json", "w", encoding="utf-8") as f:
        json.dump(all_extracted_data, f, indent=2, ensure_ascii=False)
    
    print("\n" + "="*60)
    print("Extraction complete! Data saved to extracted_pdf_data.json")
    print("="*60)
