# migrations/20250410_144816_create_cart_table.py


# Migración: create_cart_table
# Fecha de creación: 20250410_144816

def upgrade(cursor):
    # Aquí va el código para aplicar la migración
    cursor.execute(
        """
        CREATE TABLE cart (
        cart_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        document_id INT NOT NULL,
        CONSTRAINT cart_username FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT cart_document_id FOREIGN KEY (document_id) REFERENCES documents(document_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
        );        
        """
    )
    pass

def downgrade(cursor):
    # Aquí va el código para revertir la migración
    cursor.execute("ALTER TABLE cart DROP FOREIGN KEY cart_document_id;")
    cursor.execute("ALTER TABLE cart DROP FOREIGN KEY cart_username;")
    cursor.execute("DROP TABLE IF EXISTS cart;")
    pass
