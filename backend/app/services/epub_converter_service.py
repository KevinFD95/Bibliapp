# app/services/epub_converter.py
from ebooklib import epub
from bs4 import BeautifulSoup
import ebooklib
import re


class EpubConverter:
    def __init__(self, epub_file_path):
        self.epub_file_path = epub_file_path

    def convert_to_html(self):
        try:
            book = epub.read_epub(self.epub_file_path, options={"ignore_ncx": False})

            chapters = []
            chapter_number = 1
            for item_id, _ in book.spine:
                item = book.get_item_with_id(item_id)
                if item.get_type() == ebooklib.ITEM_DOCUMENT:
                    soup = BeautifulSoup(item.content, "html.parser")
                    body = soup.body 
                    css_styles = ""

                    for item in book.get_items():
                        if item.get_type() == ebooklib.ITEM_STYLE:
                            css_styles += item.get_content().decode("utf-8") + "\n"

                    # Bucle para eliminar las clases de dentro del body
                    # for tag in body.find_all(True):
                    #     tag.attrs.pop("class", None)

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

                    # if not title_text.startswith("Capítulo"):
                    #     title_text = f"Capítulo {chapter_number} - {title_text}"

                    body_content = "".join(str(tag) for tag in body.contents)

                    chapters.append({"id": item_id, "title": title_text, "body": body_content, "styles": css_styles})
                    chapter_number += 1

            return chapters
        except Exception as e:
            print(f"Error al convertir el EPUB en HTML: {e}")
            return {"message": "Error al convertir el EPUB en HTML", "success": False}
