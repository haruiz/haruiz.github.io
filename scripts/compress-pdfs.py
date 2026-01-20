import fitz  # PyMuPDF
from pathlib import Path
from tqdm import tqdm
import subprocess

def compress_pdf(input_file, output_file, quality="screen"):
    # quality: screen, ebook, printer, prepress, default
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

posters_folder = "/Users/haruiz/Library/CloudStorage/GoogleDrive-henry.ruiz@tamu.edu/My Drive/Research/Posters/"
for poster in tqdm(Path(posters_folder).glob("*.pdf")):
    output_compressed_file =  poster.with_name(f"{poster.stem}_compressed.pdf")
    if not output_compressed_file.exists() and "compressed" not in poster.stem:
        print(f"Compressing {poster.name}...")
        compress_pdf(poster, output_compressed_file, quality="ebook")
        print(f"Saved compressed version as {output_compressed_file}")
    #compress_pdf(poster,, quality="ebook")
    # doc = fitz.open(poster)
    #
    # for page in doc:
    #     page.get_pixmap(dpi=50)  # Reduces image quality to screen-level
    #
    # doc.save(poster.with_name(f"{poster.stem}_compressed.pdf"), garbage=4, deflate=True)
    # print(f"Saved compressed version as {poster.with_name(f'{poster.stem}_compressed.pdf')}")
