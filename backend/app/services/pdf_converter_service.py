# app/services/pdf_converter_service.py
import fitz, base64, re
from bs4 import BeautifulSoup

class PDFConverter:
    def __init__(self, pdf_file_path):
        self.pdf_file_path = pdf_file_path
    
    def convert_pdf_to_html(self):
        try:
            doc = fitz.open(self.pdf_file_path)
            pages = []

            for page_num in range(len(doc)):
                page = doc[page_num]
                raw_text = page.get_text("text")

                html_body = self.text_to_html_paragraphs(raw_text)

                img_refs = page.get_images(full=True)
                images = {}
                image_index = 0

                for img in img_refs:
                    xref = img[0]
                    base_image = doc.extract_image(xref)
                    image_bytes = base_image["image"]
                    image_ext = base_image["ext"]

                    b64 = base64.b64encode(image_bytes).decode("utf-8")
                    img_id = f"img_{page_num+1}_{image_index}.{image_ext}"
                    image_index += 1
                    images[img_id] = {"data": b64, "ext": image_ext}

                title = f"Página {page_num + 1}"

                pages.append({
                    "id": f"page_{page_num + 1}",
                    "title": title,
                    "body": f"{html_body}"
                })

            return pages
        except Exception as e:
            raise Exception(f"Error al convertir el PDF")
        
    def text_to_html_paragraphs(self, raw_text):
        lines = raw_text.splitlines()

        paragraphs = []
        current_paragraph = ""
        soup = BeautifulSoup("<div></div>", "html.parser")
        container = soup.div

        for line in lines:
            line = line.strip()
            if not line:
                if current_paragraph:
                    paragraphs.append(current_paragraph.strip())
                    current_paragraph = ""
                continue

            if current_paragraph:
                if line[0].islower() or not current_paragraph.endswith((".", "?", "!")):
                    current_paragraph += " " + line
                else:
                    paragraphs.append(current_paragraph.strip())
                    current_paragraph = line
            else:
                current_paragraph = line

        if current_paragraph:
            paragraphs.append(current_paragraph.strip())

        for p in paragraphs:
            p_tag = soup.new_tag("p")
            p_tag.string = p
            container.append(p_tag)
        
        return str(container)
