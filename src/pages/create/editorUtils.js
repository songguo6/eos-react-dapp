export const buildPreviewHtml = (html) => {
  return `
    <!Doctype html>
    <html>
      <head>
        <title>预览</title>
        <style>
          html,body{
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: auto;
            background-color: #f1f2f3;
          }
          .container{
            box-sizing: border-box;
            width: 1000px;
            max-width: 100%;
            min-height: 100%;
            margin: 0 auto;
            padding: 30px 20px;
            overflow: hidden;
            background-color: #fff;
            border-right: solid 1px #eee;
            border-left: solid 1px #eee;
          }
          .container img,
          .container audio,
          .container video{
            max-width: 100%;
            height: auto;
          }
          .container p{
            white-space: pre-wrap;
            min-height: 1em;
          }
          .container pre{
            padding: 15px;
            background-color: #f1f1f1;
            border-radius: 5px;
          }
          .container blockquote{
            margin: 0;
            padding: 15px;
            background-color: #f1f1f1;
            border-left: 3px solid #d1d1d1;
          }
        </style>
      </head>
      <body>
        <div class="container">${html}</div>
      </body>
    </html>
  `
};