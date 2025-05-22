# app/helpers/filedownload_helper.py
import gdown

def download_file_from_url(url, dest_path):
    gdown.download(url, dest_path, quiet=False)
