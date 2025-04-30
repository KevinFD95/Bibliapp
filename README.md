# Bibliapp

Bibliapp es una innovadora aplicación multiplataforma diseñada para transformar la forma en que organizamos y disfrutamos nuestras colecciones de libros y ebooks. Inspirada en la experiencia de las bibliotecas físicas, Bibliapp combina funcionalidad y diseño para ofrecer una experiencia digital única y personalizada.

## Requisitos de desarrollo
- **Frontend**: Node.js versión 22.13.0
- **Backend**: Python versión 3.13.2
>[!IMPORTANT]
> Es necesario desarrollar todo el equipo con la misma versión de tecnologías.

### Herramientas de Desarrollo

- **Visual Studio Code**: Para desarrollo en React Native.
- **MySQL Workbench**: Para el mantenimiento y control de la Base de Datos.
- **Control de versiones**: Git y GitHub para la colaboración y gestión del código fuente.

## Descripción Técnica

### Tecnologías Utilizadas

- **Frontend**: React Native (para desarrollo nativo en Android e iOS).
- **Backend**: Python con Flask.
- **Base de datos**: MySQL, optimizada para consultas avanzadas y manejo de grandes volúmenes de datos.
- **Diseño de interfaz**: Herramientas de diseño UI/UX como Figma.
- **Integraciones**: Servicios de terceros para autenticación y almacenamiento de archivos (e.g., Firebase, AWS S3).

### Patrón Arquitectónico

- **Modelo-Vista-Controlador (MVC)**:
  - **Modelo**: Representa la capa de datos y su lógica de gestión, implementados en el backend de Python.
  - **Vista**: Desarrollada con React Native para interfaces gráficas atractivas y responsivas.
  - **Controlador**: Implementado en Python con Flask para manejar la lógica de negocio y la comunicación entre la vista y el modelo.

### Principales Módulos

1. **Gestión de Colecciones**: Funciones para crear, editar y eliminar estanterías virtuales y libros.
2. **Búsqueda y Filtros Avanzados**: Algoritmos optimizados para búsquedas por título, autor, género, etc.
3. **Recomendaciones Personalizadas**: Implementación de un motor de recomendaciones basado en preferencias del usuario y aprendizaje automático.
4. **Gestión de Usuarios**: Registro, inicio de sesión y perfiles personalizados.
5. **Lectura de Ebooks**: Visualizador de PDF y EPUB integrado.

### Seguridad

- **Autenticación**: Uso de JWT para garantizar la seguridad en el acceso a la aplicación.
- **Cifrado de datos**: Información sensible protegida con protocolos de cifrado como Bcrypt y SSL.

### Metodología de Desarrollo

- **SCRUM**: Implementación de un enfoque ágil para garantizar entregas iterativas y una constante mejora basada en el feedback del cliente.

---

_Disfruta organizando y explorando tu biblioteca personal con Bibliapp, tu solución digital para la gestión de libros._

**Bibliapp © 2025 by Kevin Fuentes and Francisco Ojeda is licensed under CC BY-NC-ND 4.0**
