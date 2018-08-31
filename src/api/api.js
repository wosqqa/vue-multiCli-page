import axios from 'axios'
var qs = require('qs')    // qs.stringify(params)对提交json参数格式化a=212&b=2332的格式
import jsonp from 'jsonp';
//静态变量
var localHref = window.location.href;//判断正式测试参数

// 接口请求地址base
let base = ''
let baseTwo = ''
let baseThree= ''
let incomeUrl= ''
export var hostname='';//cdn测试服
export var giveRedUrl='';//发红包页面//kp.dftoutiao.com/shb_in3/second.html正式
export var wallet='';//晒收入金额
export var qrInvite='';//面对面邀请抽奖
if(localHref.indexOf('http://localhost:8888/')>-1 || localHref.indexOf('http://172.18.5.108:8888/')>-1|| localHref.indexOf('http://192.168.1.13:8888/')>-1){//本地
	base = 'https://test-shoutu.dftoutiao.com';
	hostname='https://resources.dftoutiao.com/apprentice2__test';
	baseTwo = 'https://awaken.dftoutiao.com';
	baseThree = 'https://test-kp.dftoutiao.com';
	giveRedUrl='https://test-shoutu2.dftoutiao.com';
	wallet = 'https://test-wallet.dftoutiao.com';
	qrInvite = 'https://test-shoutu-choujiang.dftoutiao.com';
	incomeUrl= 'https://test-shoutu-sharedpool.dftoutiao.com';
}else if(localHref.indexOf('//resources.dftoutiao.com/apprentice2__test')>-1){//测试
	base = 'https://test-shoutu.dftoutiao.com';
	hostname='https://resources.dftoutiao.com/apprentice2__test';
	baseTwo = 'https://awaken.dftoutiao.com';
	baseThree = 'https://test-kp.dftoutiao.com';
	giveRedUrl='https://test-shoutu2.dftoutiao.com';
	wallet = 'https://test-wallet.dftoutiao.com';
	qrInvite = 'https://test-shoutu-choujiang.dftoutiao.com';
	incomeUrl= 'https://test-shoutu-sharedpool.dftoutiao.com';
}else{//正式
	base = 'https://shoutu.dftoutiao.com';
	hostname='https://resources.dftoutiao.com/apprentice2';
	baseTwo = 'https://awaken.dftoutiao.com';
	baseThree = 'https://kp.dftoutiao.com';
	giveRedUrl='https://shoutu2.dftoutiao.com';
	wallet = 'https://wallet.dftoutiao.com';
	qrInvite = 'https://shoutu-choujiang.dftoutiao.com';
	incomeUrl= 'https://shoutu-sharedpool.dftoutiao.com';
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true;
  // 超时时间
axios.defaults.timeout = 50000
	  // http请求拦截器
	axios.interceptors.request.use(config => {
	  config.headers={
	  	'Content-Type':'application/x-www-form-urlencoded'
		}
	  return config
	}, error => {
	  return Promise.reject(error)
	})
	  // http响应拦截器
	axios.interceptors.response.use(data => { // 响应成功关闭loading
	  if (data.data.code == '00044') {
	    window.location.href = '/login'
	  }
	  return data
	}, error => {
	  return Promise.reject(error)
	})



//jsonp get获取数据
export const jsonpGetData = params => {
	jsonp(params.url+'?'+qs.stringify(params.param), {}, function (err, data) {
		 console.log(params.url+'?'+qs.stringify(params.param));
			window[params.callback](data);
	});
}

//jsonp post获取数据
export const jsonpPostData = params => {
	jsonp(params.url, qs.stringify(params.param), function (err, data) {
			window[params.callback](data);
	});
}

//获取云控玩法、邀请码
export const getInviteCode = `${base}/invitefriends/can_type_code`

//获取云控数据参数
export const pollingConfig = `${base}/polling/config`
//获取top参数
export const typeCodeTop = `${base}/invitefriends/type_code_top`
