export const documentToHtml = ({ body, styles, theme }) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            ${styles}

            html, body {
                max-width: 100%;
                overflow-x: hidden;
                margin: 10px;
                padding: 0;
                background-color: ${theme["book-view-background"]};
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
                color: ${theme["dark-text"]} !important;
                margin: 0 0 20px 0;
                padding: 0;
            }

            a {
                text-decoration: none;
                color: ${theme["dark-text"]} !important;
                background-color: transparent !important;
            }
        </style>
    </head>
    <body>
        ${body}
    </body>
    </html>
    `;
};
