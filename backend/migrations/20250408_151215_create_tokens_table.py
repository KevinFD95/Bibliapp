# migrations/20250408_151215_create_tokens_table.py


# Migración: create_tokens_table
# Fecha de creación: 20250408_151215


def upgrade(cursor):
    # Aquí va el código para aplicar la migración
    cursor.execute(
        """
        CREATE TABLE tokens (
        token_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        token TEXT NOT NULL,
        device VARCHAR(255) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        CONSTRAINT tokens_username FOREIGN KEY (username) REFERENCES users(username)
        ON DELETE RESTRICT ON UPDATE CASCADE
        ) CHARACTER SET utf8 COLLATE utf8_general_ci;
        """
    )
    pass


def downgrade(cursor):
    # Aquí va el código para revertir la migración
    cursor.execute("ALTER TABLE tokens DROP FOREIGN KEY tokens_username;")
    cursor.execute("DROP TABLE IF EXISTS tokens;")
    pass
