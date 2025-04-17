# app/services/epub_converter.py
from ebooklib import epub
from bs4 import BeautifulSoup
import ebooklib
import os


class EpubConverter:
    def __init__(self, epub_file_path):
        self.epub_file_path = epub_file_path

    def convert_to_html(self):
        book = epub.read_epub(self.epub_file_path)

        html_content = []
        for item in book.get_items():
            if item.get_type() == ebooklib.ITEM_DOCUMENT:
                soup = BeautifulSoup(item.content, "html.parser")
                html_content.append(str(soup))

        full_html = "\n".join(html_content)

        return full_html
