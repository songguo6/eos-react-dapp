export const getTimeUntilNow = (mss) => {
  const offset = new Date().getTime() - mss;
  const days = parseInt(offset / (1000 * 60 * 60 * 24));
  if (days > 0) {
    return days + ' 天前';
  };
  const hours = parseInt((offset % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (hours > 0) {
    return hours + ' 小时前 ';
  };
  const minutes = parseInt((offset % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes > 0) {
    return minutes + ' 分钟前 ';
  };
  return '刚刚 ';
};

export const cutString = (str, len) => {
  if(str.length*2 <= len) {
      return str;
  }
  var strlen = 0;
  var s = '';
  for(var i = 0;i < str.length; i++) {
      s = s + str.charAt(i);
      if (str.charCodeAt(i) > 128) {
          strlen = strlen + 2;
          if(strlen >= len){
              return s.substring(0,s.length-1) + '...';
          }
      } else {
          strlen = strlen + 1;
          if(strlen >= len){
              return s.substring(0,s.length-2) + '...';
          }
      }
  }
  return s;
};

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