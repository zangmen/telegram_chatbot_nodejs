var telegram_bot = require('node-telegram-bot-api');
var token_api = '1346777562:AAE4tq5GF2G-XJoADuokVkzpIe25vi2uGEo';
var bot = new telegram_bot(token_api,{polling: true});
var websiteget = require('./modules/websiteget.js');

console.log("telegram chat bot server is start running......");

/*把客戶端收到的訊息輸出到伺服端的終端下*/
bot.on('message', (message) => {
    const { text } = message;
    console.log(`伺服端己收到:  ${text}`);
});


bot.onText(/\/start/,function (msg) {
    var chat = msg.chat.id; //user id
    var username = msg.from.username;
    var resp = username + '主人你好'; // 要回的句子
    bot.sendMessage(chat,resp); //回給使用者的函式
    /*如果尚未設定使用者名稱*/
    if (!msg.from.username) {
        bot.sendMessage(msg.chat.id, "主人你還沒設定使用者名稱(ID),請馬上設置不然我不知道如何叫您!");
     }
});

bot.onText(/\/ping/,function (msg) {
    var chat = msg.chat.id; //user id
	const chatType = msg.chat.type;
    var resp = 'pong'; // 要回的句子
	if (chatType === 'group' || chatType === 'supergroup' || chatType === 'channel' || chatType === 'private')
       bot.sendMessage(chat,resp); //回給使用者的函式
});

bot.onText(/\/today/,function (msg) {
    var chat = msg.chat.id; //user id
	const chatType = msg.chat.type;
    var Today=new Date();
    var day=Today.getDay();
    var out_day;
    /*把day(0~6)転成星期*/
	if(day==0){
      out_day="星期日";
    }else if (day==1) {
      out_day="星期一";
    }else if (day==2) {
      out_day="星期二";
    }else if (day==3) {
      out_day="星期三";
    }else if (day==4) {
      out_day="星期四";
    }else if (day==5) {
      out_day="星期五";
    }else if (day==6) {
      out_day="星期六";
     }
      
    var resp = '今天是'+ out_day; // 要回的句子
	if (chatType === 'group' || chatType === 'supergroup' || chatType === 'channel' || chatType === 'private')
       bot.sendMessage(chat,resp); //回給使用者的函式
});

bot.onText(/\/nowTime/,function (msg) {
    var chat = msg.chat.id; //user id
	const chatType = msg.chat.type;
    var Today=new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}); //時區
    /* 使用伺服端本地時間
	  var h=Today.getHours(); //hour
      var m=Today.getMinutes(); //min
      var s=Today.getSeconds(); //sec 
	  var resp = '現在時間(24小時制):  ' + h + '時' + m +'分'+ s +`秒` ; // 要回的句子
    */
	var resp = '現在時間: ' + Today;
	if (chatType === 'group' || chatType === 'supergroup' || chatType === 'channel' || chatType === 'private')
	  bot.sendMessage(chat,resp); //回給使用者的函式
});

bot.onText(/\/cal (.+)/, function (msg,match) {
   var from = msg.from.id; //user id
   const chatType = msg.chat.type;
   /*進行運算*/
   var resp = match[1].replace(/[^-()\d/*+.]/g, '');
       resp = '答案是 ' + eval(resp);
   if (chatType === 'group' || chatType === 'supergroup' || chatType === 'channel' || chatType === 'private')
      bot.sendMessage(from,resp);   
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chat = msg.chat.id; 
  const chatType = msg.chat.type;
  const resp = match[1]; // the captured "whatever"
  // send back the matched "whatever" to the chat
  if (chatType === 'group' || chatType === 'supergroup' || chatType === 'channel' || chatType === 'private')
     bot.sendMessage(chat, resp);
});

bot.onText(/\/getWebsite (.+)/, (msg, match) => {
  const chat = msg.chat.id; 
  const chatType = msg.chat.type;
  const resp = match[1]; // the captured "whatever"
  const url = resp;
  websiteget.Get(url);
  
  // send back the matched "whatever" to the chat
  if (chatType === 'group' || chatType === 'supergroup' || chatType === 'channel' || chatType === 'private')
     bot.sendMessage(chat, "己把網頁輸出成圖片");
     bot.sendPhoto(chat,'./output_website.png');
});
