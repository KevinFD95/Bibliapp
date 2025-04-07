import os
from app.database import Connection

MIGRATIONS_DIR = "migrations"


def migration_status():
    if not os.path.exists(MIGRATIONS_DIR):
        print(f"El directorio de migraciones '{MIGRATIONS_DIR}' no existe.")
        return

    conn = Connection.get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "CREATE TABLE IF NOT EXISTS migrations (migration_id INT AUTO_INCREMENT PRIMARY KEY, filename VARCHAR(255) NOT NULL UNIQUE, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP);"
    )
    conn.commit()

    cursor.execute("SELECT filename FROM migrations")
    applied = set(row[0] for row in cursor.fetchall())

    all_files = sorted([f for f in os.listdir(MIGRATIONS_DIR) if f.endswith(".py")])

    print("Estado de Migraciones: \n")
    print("✅ Aplicadas:")
    for f in all_files:
        if f in applied:
            print(f" - {f}")

    print("\n❌ Pendientes:")
    for f in all_files:
        if f not in applied:
            print(f" - {f}")

    cursor.close()
    conn.close()


if __name__ == "__main__":
    migration_status()
