# app/helpers/strings_helper.py

# creacion de slugs, conversiones de strings...
def generate_slug(text):
    slug = text.replace(" ", "-").lower()
    return slug