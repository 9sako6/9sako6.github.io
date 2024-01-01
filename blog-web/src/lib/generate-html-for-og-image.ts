type Params = {
  title: string;
};

export const generateHtmlForOgImage = ({ title }: Params) => {
  return `
    <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Noto+Serif+JP&display=swap" rel="stylesheet">
    </head>
    <body>
      <style>
        :root {
          --main-color: #ccc;
        }
        body {
          font-family: 'Noto Serif JP', serif;
          letter-spacing: 0.06em;

          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(90deg, rgba(145, 175, 175, 1), rgba(188, 146, 166, 1));
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          position: relative;
          box-sizing: border-box;
          width: calc(100% - 96px);
          height: calc(100% - 96px);
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
          padding: 32px;
        }
        .content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .title {
          padding: 0;
          margin: 0;
          font-size: 64px;
          font-weight: normal;
          word-break: auto-phrase;
        }
        .fqdn {
          font-family: 'Noto Sans JP', sans-serif;
          color: #3a3a3a;

          position: absolute;
          bottom: 32px;
          right: 32px;
          font-size: 32px;
          font-weight: normal;
        }
      </style>
      <main class="container">
        <div class="content">
          <h1 class="title">${title}</h1>
        </div>
        <div class="fqdn">9sako6.com</div>
      </main>
    </body>
    </html>
  `;
};
