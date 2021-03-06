'use strict';
class OyunKeyi extends Joiner {
constructor() {
super();
this.websiteUrl = 'https://www.oyunkeyi.com';
this.authContent = 'My Profil';
this.authLink = 'https://www.oyunkeyi.com/auth/steam';
this.settings.min_cost = { type: 'number', trans: this.transPath('min_cost'), min: 0, max: this.getConfig('max_cost', 0), default: this.getConfig('min_cost', 0) };
this.settings.max_cost = { type: 'number', trans: this.transPath('max_cost'), min: this.getConfig('min_cost', 0), max: 200, default: this.getConfig('max_cost', 0) };
this.settings.check_in_steam = { type: 'checkbox', trans: this.transPath('check_in_steam'), default: this.getConfig('check_in_steam', true) };
this.settings.sound = { type: 'checkbox', trans: this.transPath('sound'), default: this.getConfig('sound', true) };
super.init();
}
getUserInfo(callback) {
let userData = {
avatar: __dirname + '/images/OyunKeyi.png',
username: 'OK user',
value: 0
};
$.ajax({
url: 'https://www.oyunkeyi.com/profil/' + GJuser.steamid,
success: function (data) {
data = $(data.replace(/<img/gi, '<noload'));
userData.username = data.find('.col-md-9 h3').text();
userData.avatar = data.find('.dropdown-toggle noload').attr('src');
userData.value = data.find('.dropdown-toggle span').text().replace('(Point: ', '').replace(')', '');
},
complete: function () {
callback(userData);
}
});
}
joinService() {
let _this = this;
let page = 1;
_this.check = 0;
let callback = function () {
page++;
if (page <= _this.getConfig('pages', 1)) {
_this.enterOnPage(page, callback);
}
};
this.enterOnPage(page, callback);
}
enterOnPage(page, callback) {
let _this = this;
let okusrmin = this.getConfig('min_cost', 0),
okusrmax = this.getConfig('max_cost', 0);
$.ajax({
url: 'https://www.oyunkeyi.com/?page=' + page,
success: function (data) {
data = $(data.replace(/<img/gi, '<noload'));
if (_this.check === 0) {
_this.check = 1;
let okwon = data.find('.modal-body p a b').text().trim();
if (okwon === 'Go! My Won') {
_this.log(_this.logLink('https://www.oyunkeyi.com/kazandiklarim', Lang.get('service.win')), true);
if (_this.getConfig('sound', true)) {
new Audio(__dirname + '/sounds/won.wav').play();
}
}
}
let okfound = data.find('.card');
let okcurr = 0;
function giveawayEnter() {
if (okfound.length <= okcurr || !_this.started || _this.curr_value === 0) {
if (callback) {
callback();
}
return;
}
let oknext = _this.interval();
let okway = okfound.eq(okcurr),
link = okway.find('.card-body a').attr('href'),
cost = parseInt(okway.find('.card-body a').text().split('(')[1].split('P)')[0]),
entered = okway.attr('style');
if (_this.curr_value < cost || cost < okusrmin || cost > okusrmax && okusrmax > 0 || entered.includes('background')) {
oknext = 50;
}
else {
let oksteam = okway.find('.card-body a').eq(2).attr('href'),
name = okway.find('.card-body a').text().split('(')[0].trim(),
eLink = link.replace('cekilis', 'katil'),
okown = 0,
okapp = 0,
oksub = 0,
okid = '???';
if (oksteam.includes('app/')) {
okapp = parseInt(oksteam.split('app/')[1].split('/')[0].split('?')[0].split('#')[0]);
okid = 'app/' + okapp;
}
if (oksteam.includes('sub/')) {
oksub = parseInt(oksteam.split('sub/')[1].split('/')[0].split('?')[0].split('#')[0]);
okid = 'sub/' + oksub;
}
if (_this.getConfig('check_in_steam', true)) {
if (GJuser.ownapps.includes(',' + okapp + ',') && okapp > 0) {
okown = 1;
}
if (GJuser.ownsubs.includes(',' + oksub + ',') && oksub > 0) {
okown = 1;
}
}
if (okown === 0) {
$.ajax({
url: eLink
});
_this.log(Lang.get('service.entered_in') + _this.logLink(link, name) + ' - ' + _this.logLink(oksteam, okid) + ' - ' + cost + ' P');
_this.curr_value = _this.curr_value - cost;
_this.setValue(_this.curr_value);
}
else {
oknext = 50;
}
}
okcurr++;
setTimeout(giveawayEnter, oknext);
}
giveawayEnter();
}
});
}
}
