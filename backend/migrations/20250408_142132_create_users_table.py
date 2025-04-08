# migrations/20250408_142132_create_users_table.py


# Migración: create_users_table
# Fecha de creación: 20250408_142132


def upgrade(cursor):
    # Aquí va el código para aplicar la migración
    cursor.execute(
        """
        CREATE TABLE users (
        user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(50) NOT NULL,
        user_lastname VARCHAR(50) NOT NULL,
        username VARCHAR(30) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        user_password VARCHAR(60) NOT NULL,
        user_role VARCHAR(10) DEFAULT 'user',
        user_sub INT(2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        """
    )
    pass


def downgrade(cursor):
    # Aquí va el código para revertir la migración
    cursor.execute("DROP TABLE IF EXISTS users;")
    pass
