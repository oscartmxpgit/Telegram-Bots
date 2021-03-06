const rssToTelegram = require("rss-to-telegram");
const { TELEGRAM_BOT, TELEGRAM_CHANNEL } = process.env;
/* Primero tuve que instalar npm i rss-to-telegram */

const time = new Date();
hour = time.getHours();
min = time.getMinutes() ;
if (time.getSeconds()!=58){
  ss = time.getSeconds()+2;
}
else
  ss = 0;


//parse to cron expression
nextFireTime = ss + ' ' + min + ' ' + hour + ' * * *';

console.log(nextFireTime);

rssToTelegram({
  bot: '1784481950:AAFhgGT3ebi80WNuv7sKmsgFuoxxo5ZvK2s',

  channel: '@palabradecadadia',
  //cron: "0 1 * * *", // At 01:00, cron sintaxis
  cron: nextFireTime, //cron sintaxis
  timezone: "CET", // your defined timezone
  // rss source
  source: "https://rss.evangelizo.org/rss/v2/evangelizo_rss-sp.xml", // can be an async function or and array of objects

  preprocess: async (item) => {
    return item;
  },
  // define you own message template
  template:
    '<a href="{{image}}"> </a> <b><a href="{{link}}">{{title}}</a></b>\n {{description}}',
  // filter news of the day, use this function to filter already published posts
  filter: async ({ guid }) => { // async functtion
    var dia=parseInt( guid.substr(8, 2),10);
    var mes=parseInt( guid.substr(5, 2),10);
    var anyo=guid.substr(0, 4);

    // must be async
    const d = new Date();

    return (
      dia == d.getDate() &&
      mes == d.getMonth() + 1 &&
      anyo == d.getFullYear()
    );
  },
  // add extra common fields to all items,

});

