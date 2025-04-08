# commands/apply_migrations.py
import os, importlib.util
from app.database import Connection

MIGRATIONS_DIR = "migrations"


def rollback_migration():
    conn = Connection.get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "CREATE TABLE IF NOT EXISTS migrations (migration_id INT AUTO_INCREMENT PRIMARY KEY, filename VARCHAR(255) NOT NULL UNIQUE, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP);"
    )
    conn.commit()

    cursor.execute("SELECT filename FROM migrations ORDER BY applied_at DESC, migration_id DESC LIMIT 1")
    last_row = cursor.fetchone()

    if not last_row:
        print("No hay migraciones aplicadas.")
        return
    
    filename = last_row[0]
    migration_module_name = filename[:-3]
    migration_path = os.path.join(MIGRATIONS_DIR, filename)

    print (f"Revirtiendo migración: {filename}")

    try:
        spec = importlib.util.spec_from_file_location(
            migration_module_name, migration_path
        )
        migration_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(migration_module)
        
        migration_module.downgrade(cursor)

        cursor.execute("DELETE FROM migrations WHERE filename = (%s)", (filename,))
        conn.commit()

        print(f"Reversión de migración {filename} completada.")

    except Exception as e:
        conn.rollback()
        print(f"Error al aplicar la migración {filename}: {e}")
    finally:
        cursor.close()
        conn.close()
        print("Migraciones completadas...")


if __name__ == "__main__":
    rollback_migration()
