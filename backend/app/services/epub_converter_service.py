# app/services/epub_converter.py
from ebooklib import epub
from bs4 import BeautifulSoup
from mimetypes import guess_type
import ebooklib, re, base64, os


class EpubConverter:
    def __init__(self, epub_file_path):
        self.epub_file_path = epub_file_path

    def convert_to_html(self):
        try:
            book = epub.read_epub(self.epub_file_path, options={"ignore_ncx": False})

            images = {}
            for item in book.get_items_of_type(ebooklib.ITEM_IMAGE):
                image_data = base64.b64encode(item.get_content()).decode("utf-8")
                images[item.get_name()] = image_data

            pages = []
            page_number = 1
            for item_id, _ in book.spine:
                item = book.get_item_with_id(item_id)
                if item.get_type() == ebooklib.ITEM_DOCUMENT:
                    soup = BeautifulSoup(item.content, "html.parser")
                    body = soup.body 
                    css_styles = ""

                    for item in book.get_items():
                        if item.get_type() == ebooklib.ITEM_STYLE:
                            css_styles += item.get_content().decode("utf-8") + "\n"
                    
                    for img in body.find_all("img"):
                        src = img.get("src")
                        if src:
                            filename = os.path.basename(src)
                            if filename in images:
                                mime_type, _ = guess_type(filename)
                                ext = mime_type.split("/")[1] if mime_type else "jpeg"
                                img["src"] = f"data:image/{ext};base64,{images[filename]}"

                    if not body or not body.get_text(strip=True):
                        continue

                    title_tag = soup.find(["h1", "h2"]) or soup.find("title")

                    if title_tag and title_tag.get_text(strip=True):
                        raw_title = title_tag.get_text(separator="", strip=True)
                        preview = re.sub(
                            r"\b([A-Z])\s+([A-Z])\b", r"\1\2", raw_title
                        )
                        title_text = " ".join(preview.split())
                    else:
                        words = body.get_text(strip=True).split()
                        preview = (
                            " ".join(words[:10]) + "..."
                            if len(words) > 10
                            else " ".join(words)
                        )
                        title_text = preview

                    body_content = "".join(str(tag) for tag in body.contents)

                    pages.append({"id": item_id, "title": title_text, "body": body_content, "styles": css_styles})
                    page_number += 1

            return pages
        except Exception as e:
            return {"message": "Error al convertir el EPUB en HTML", "success": False}
