# apply_migrations.py
import os
from app.database import Connection

MIGRATIONS_DIR = "migrations"


def apply_migrations():
    conn = Connection.get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "CREATE TABLE IF NOT EXISTS migrations (migration_id INT AUTO_INCREMENT PRIMARY KEY, filename VARCHAR(255) NOT NULL UNIQUE, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP);"
    )
    conn.commit()

    cursor.execute("SELECT filename FROM migrations")
    applied = set(row[0] for row in cursor.fetchall())

    for filename in sorted(os.listdir(MIGRATIONS_DIR)):
        if filename.endswith(".sql") and filename not in applied:
            filepath = os.path.join(MIGRATIONS_DIR, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                sql = f.read()

                print(f"Ejecutando migración: {filename}")

                try:
                    for statement in sql.strip().split(";"):
                        if statement.strip():
                            cursor.execute(statement.strip())

                    cursor.execute(
                        "INSERT INTO migrations (filename) VALUES (%s)", (filename,)
                    )
                    conn.commit()
                except Exception as e:
                    conn.rollback()
                    print(f"Error al aplicar la migración {filename}: {e}")

    cursor.close()
    conn.close()
    print("Migraciones completadas...")


if __name__ == "__main__":
    apply_migrations()
