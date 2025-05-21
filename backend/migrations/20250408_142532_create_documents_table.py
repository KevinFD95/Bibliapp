# migrations/20250408_142532_create_documents_table.py


# Migración: create_documents_table
# Fecha de creación: 20250408_142532


def upgrade(cursor):
    # Aquí va el código para aplicar la migración
    cursor.execute(
        """
        CREATE TABLE documents (
        document_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        publication_year INT NOT NULL,
        document_type VARCHAR(50) NOT NULL,
        num_pages INT NOT NULL,
        saga VARCHAR(75),
        prequel VARCHAR(75),
        sequel VARCHAR(75),
        synopsis TEXT,
        category_1 VARCHAR(25) NOT NULL,
        category_2 VARCHAR(25),
        price DECIMAL(10, 2) NOT NULL,
        url_image VARCHAR(255),
        url_document VARCHAR(255),
        slug VARCHAR(255) NOT NULL UNIQUE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
        ) CHARACTER SET utf8 COLLATE utf8_general_ci;
        """
    )
    pass


def downgrade(cursor):
    # Aquí va el código para revertir la migración
    cursor.execute("DROP TABLE IF EXISTS documents;")
    pass
