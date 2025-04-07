# commands/make_migration.py
import os
from datetime import datetime
import sys

MIGRATIONS_DIR = "migrations"

def make_migration(name):
    if not os.path.exists(MIGRATIONS_DIR):
        os.makedirs(MIGRATIONS_DIR)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{name}.py"
    filepath = os.path.join(MIGRATIONS_DIR, filename)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# Migración: {name}")
        f.write(f"\n# Fecha: {timestamp}\n\n")
        f.write("def upgrade(cursor):\n")
        f.write("    # Aquí va el código para aplicar la migración\n")
        f.write("    cursor.execute()\n")
        f.write("    pass\n\n")
        f.write("def downgrade(cursor):\n")
        f.write("    # Aquí va el código para revertir la migración\n")
        f.write("    cursor.execute()\n")
        f.write("    pass\n")

    print(f"Archivo de migración creado: {filepath}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Debes proporcionar el nombre para la migración")
        print("Uso: flask make:migration <nombre de la migración>")
    else:
        name = "_".join(sys.argv[1:]).lower()
        make_migration(name)