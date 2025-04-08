# migrations/20250408_154451_create_categories_table.py


# Migración: create_categories_table
# Fecha de creación: 20250408_154451

def upgrade(cursor):
    # Aquí va el código para aplicar la migración
    cursor.execute(
        """
        CREATE TABLE categories (
        category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        document_id INT NOT NULL,
        category_name VARCHAR(50) NOT NULL UNIQUE,
        CONSTRAINT categories_document_id FOREIGN KEY (document_id) REFERENCES documents(document_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
        );
        """
    )
    pass

def downgrade(cursor):
    # Aquí va el código para revertir la migración
    cursor.execute("ALTER TABLE categories DROP FOREIGN KEY categories_document_id;")
    cursor.execute("DROP TABLE IF EXISTS categories;")
    pass
