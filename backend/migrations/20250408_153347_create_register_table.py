# migrations/20250408_153347_create_register_table.py


# Migración: create_register_table
# Fecha de creación: 20250408_153347

def upgrade(cursor):
    # Aquí va el código para aplicar la migración
    cursor.execute(
        """
        CREATE TABLE registers (
        register_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        document_id INT NOT NULL,
        favorite BOOLEAN DEFAULT FALSE,
        readed BOOLEAN DEFAULT FALSE,
        progress INT(3) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT registers_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT registers_document_id FOREIGN KEY (document_id) REFERENCES documents(document_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
        );
        """
    )
    pass

def downgrade(cursor):
    # Aquí va el código para revertir la migración
    cursor.execute("ALTER TABLE registers DROP FOREIGN KEY registers_user_id;")
    cursor.execute("ALTER TABLE registers DROP FOREIGN KEY registers_document_id;")
    cursor.execute("DROP TABLE IF EXISTS registers;")
    pass
