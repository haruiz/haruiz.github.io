import fitz  # PyMuPDF
from pathlib import Path
from tqdm import tqdm
import subprocess

def compress_pdf(input_file, output_file, quality="screen"):
    # quality options: screen, ebook, printer, prepress, default
    cmd = [
        "gs",
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        f"-dPDFSETTINGS=/{quality}",
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        f"-sOutputFile={output_file}",
        input_file,
    ]
    subprocess.run(cmd, check=True)

# Set paths
pdfs_folder = Path("/Users/haruiz/Desktop/Jobs/transcripts")
compressed_files = []

# Compress each PDF
for pdf_file in tqdm(pdfs_folder.glob("*.pdf"), desc="Compressing PDFs"):
    compressed_path = pdfs_folder / f"{pdf_file.stem}_compressed.pdf"
    compress_pdf(str(pdf_file), str(compressed_path), quality="ebook")
    compressed_files.append(compressed_path)

# Merge all compressed PDFs
output_merged_path = pdfs_folder / "merged_compressed_pdfs.pdf"
merged_doc = fitz.open()

for pdf_path in tqdm(compressed_files, desc="Merging PDFs"):
    with fitz.open(pdf_path) as doc:
        merged_doc.insert_pdf(doc)

merged_doc.save(output_merged_path)
merged_doc.close()

print(f"Merged PDF saved to: {output_merged_path}")
