# commands/apply_migrations.py
import os, importlib.util
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
        if filename.endswith(".py") and filename not in applied:
            migration_module_name = filename[:-3]
            migration_path = os.path.join(MIGRATIONS_DIR, filename)

            spec = importlib.util.spec_from_file_location(migration_module_name, migration_path)
            migration_module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(migration_module)

            print(f"Ejecutando migración: {filename}")

            try:
                migration_module.upgrade(cursor)

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
