export const epubToHtml = ({ title, styles, body }) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            ${styles}

            html, body {
                max-width: 100%;
                overflow-x: hidden;
                margin: 10px;
                padding: 0;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            table {
                width: 100% !important;
                table-layout: auto;
                overflow-x: auto;
                display: block;
            }

            div, p, span, h1, h2, h3, h4, h5, h6 {
                max-width: 100%;
                word-break: break-word;
            }
        </style>
    </head>
    <body>
        ${body}
    </body>
    </html>
    `;
};
