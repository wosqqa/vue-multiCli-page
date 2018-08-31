export default {
    Cookie: function () {
        return {
            /**
             * 设置cookie
             * @param name 名称
             * @param value 值
             * @param expires 有效时间（单位：小时）（可选） 默认：24h
             */
            set: function(name, value, expires){
                var expTimes = expires ? (Number(expires) * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 毫秒
                var expDate = new Date();
                expDate.setTime(expDate.getTime() + expTimes);
                var expString = expires ? '; expires=' + expDate.toUTCString() : '';
                var pathString = '; path=/';
                document.cookie = name + '=' + encodeURI(value) + expString + pathString;
            },
            /**
             * 读cookie
             * @param name
             */
            get: function(name){
                var cookieStr = '; ' + document.cookie + '; ';
                var index = cookieStr.indexOf('; ' + name + '=');
                if(index !== -1){
                    var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
                    return decodeURI(s.substring(0, s.indexOf('; ')));
                } else {
                    return null;
                }
            },
            /**
             * 删除cookie
             * @param name
             */
            del: function(name){
                var exp = new Date(new Date().getTime() - 1);
                var s = this.read(name);
                if(s !== null) {
                    document.cookie = name + '=' + s + '; expires=' + exp.toUTCString() + '; path=/';
                }
            }
        }
      },
   /**
   * OS的判断
   * @return {[type]} [description]
   */
    getOsType: function() {
            var agent = navigator.userAgent.toLowerCase(), 
                os_type = '', 
                index = '', 
                version = '';
            if (/android/i.test(navigator.userAgent)) {
                index = agent.indexOf("android");
                version = agent.substr(index + 8, 3);
                os_type = "Android " + version;
            }
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                index = agent.indexOf("os");
                version = agent.substr(index + 3, 4);
                os_type = "iOS " + version;
            }
            if (/Linux/i.test(navigator.userAgent) && !/android/i.test(navigator.userAgent) && !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                os_type = "Linux";
            }
            if (/windows|win32/i.test(navigator.userAgent)) {
                os_type = "windows32";
            }
            if (/windows|win64/i.test(navigator.userAgent)) {
                os_type = "windows64";
            }
            return os_type;
    },
    Os: function(){// 操作系统
        var u = navigator.userAgent,
            Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"),  
            mobile = false;  
        for (var v = 0; v < Agents.length; v++) {  
            if (u.indexOf(Agents[v]) > -1) { 
                mobile = true; 
                break; 
            }  
        }
        return {
            //移动终端浏览器版本信息 
            mobile: mobile, //是否为移动终端 
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
            iphone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
            ipad: u.indexOf('iPad') > -1, //是否iPad 
            webapp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部 
        }; 
    },
    App: function () {
        let scope = this;
        return {
            // 获取客户端信息
        getClientInfo: function (cb) {
            var obj = {
              'method': 'getClientInfo'
            };
            var userInfo = null
            window.setClientInfo = cb 
            try {
                if (scope.Os().android) { // 安卓
                    window.JSToNative.postMessage(JSON.stringify(obj));
                } else { // ios
                    window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
                }
            } catch (e) { 
                console.error(e); 
            }
          },
        // 获取用户信息
        getUserInfo: function (cb) {
            var obj = {
                'method': 'getUserInfo'
            };
            var userInfo = null
            window.setUserInfo = cb 
            try {
                if (scope.Os().android) { // 安卓
                    window.JSToNative.postMessage(JSON.stringify(obj));
                } else { // ios
                    window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
                }
            } catch (e) { 
                console.error(e); 
            }
        },
        uploadActivityLog(thisurl,materialid,actentryid,actid,type,acttype,plan){ //上报事件
                let obj ={
                    method:"uploadActivityLog",
                    thisurl: thisurl,
                    materialid:materialid,
                    actentryid:actentryid,
                    acttype: acttype,
                    plan: plan,
                    actid:actid,
                    type:type
                }
                console.log(obj)
                try {
                    if (scope.Os().android) { // 安卓
                        window.JSToNative.postMessage(JSON.stringify(obj));
                    } else { // ios
                        window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
                    }
                } catch (e) { 
                    console.error(e); 
                }
        },
        toast: function (text) {
            var obj = {
                'method': 'alert',
                'msg': text
            };
            try {
                if (scope.Os().android) { // 安卓
                    window.JSToNative.postMessage(JSON.stringify(obj));
                } else { // ios
                    window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
                }
            } catch (e) { 
                console.error(e); 
            }
        },
        // 日志发送
        sentLog: function (btn_id) {
            var obj = {
              'method': 'DotStatistics',
              'btn_id': btn_id
            };
            try {
              if (scope.Os().android) { // 安卓
                window.JSToNative.postMessage(JSON.stringify(obj));
              } else { // ios
                window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
              }
            } catch (e) { 
              console.error(e); 
            }
          },
          postMessage: function (obj) {
            try {
                if (scope.Os().android) { // 安卓
                    window.JSToNative.postMessage(JSON.stringify(obj));
                } else { // ios
                    window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
                }
            } catch (e) { 
                console.error(e); 
            }
          },
          getConfig: function () {//公共配置
            let config={
                url: 'http://test-api.dftoutiao.com/', // 接口地址http://test-api.dftoutiao.com/ 、https://test-kp.dftoutiao.com/
                hostname: 'http://test-api.dftoutiao.com/dftt_h5/',  // 笔记本测试地址,上传cdn后需要改为cdn路径
                userInfo: {accid: '0'}//accid配置
            }
            return config;
          },
    
          // 获取链接参数
          getParamsFromUrl: function () {
            var paramStr = window.location.search.slice(1).split('&')
            var obj = {}
            paramStr.map(function (item) {
              var arr = item.split('=')
              obj[arr[0]] = arr[1];
            })
            return obj
          },
          // 生命周期app回调
          // 页面显示
          viewDidAppear: function (cb) {
            window.viewDidAppear = cb
          },
          // 页面消失
          viewDidDisAppear: function (cb) {
            window.viewDidDisAppear = cb
          },
          // app前台显示
          enterForeground: function (cb) {
            window.enterForeground = cb
          },
          // app 后台
          enterBackground: function (cb) {
            window.enterBackground = cb
          },
          setCache: function (key, value) {
            var obj = {
                'method': 'setCache',
                'key': key,
                'value': value
            }
            try {
                if (scope.Os().android) { // 安卓
                    window.JSToNative.postMessage(JSON.stringify(obj));
                } else { // ios
                    window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
                }
            } catch (e) { 
                console.error(e); 
            }
          },
          getCache: function (key, cb) {
            var obj = {
                'method': 'getCache',
                'key': key
            }
            window.getCacheCallback = cb
            try {
                if (scope.Os().android) { // 安卓
                    window.JSToNative.postMessage(JSON.stringify(obj));
                } else { // ios
                    window.webkit.messageHandlers.JSToNative_iOS.postMessage(obj);
                }
            } catch (e) { 
                console.error(e); 
            }
          },
        }
    },
    Browser: function () {// 浏览器
        var ua = navigator.userAgent, //获取判断用的对象
            mobile = this.Os().mobile;
        if(mobile){    // mobile
            //移动终端浏览器版本信息
            return { 
                wechat: ua.indexOf('MicroMessenger') > -1, // 在微信中打开  
                weibo: ua.toLowerCase().indexOf('weibo') > -1, // 在新浪微博客户端打开
                qq: ua.indexOf('QQ/') > -1, // 在QQ、QQ空间中打开 
                qqbrowser: ua.indexOf('MQQBrowser') > -1 // 在QQ空间打开
            }; 
        }
        return {};
    },

    /**
     * browser的判断
     * @return {[type]} [description]
     */
    getBrowserType: function() {
        var agent = navigator.userAgent.toLowerCase();
        var browser_type = "";
        if (agent.indexOf("msie") > 0) {
            browser_type = "IE";
        }
        if (agent.indexOf("firefox") > 0) {
            browser_type = "firefox";
        }
        if (agent.indexOf("chrome") > 0 && agent.indexOf("mb2345browser") < 0 && agent.indexOf("360 aphone browser") < 0) {
            browser_type = "chrome";
        }
        if (agent.indexOf("360 aphone browser") > 0 || agent.indexOf("qhbrowser") > 0) {
            browser_type = "360";
        }
        if (agent.indexOf("ucbrowser") > 0) {
            browser_type = "UC";
        }
        if (agent.indexOf("micromessenger") > 0) {
            browser_type = "WeChat";
        }
        if ((agent.indexOf("mqqbrowser") > 0 || agent.indexOf("qq") > 0) && agent.indexOf("micromessenger") < 0) {
            browser_type = "QQ";
        }
        if (agent.indexOf("miuibrowser") > 0) {
            browser_type = "MIUI";
        }
        if (agent.indexOf("mb2345browser") > 0) {
            browser_type = "2345";
        }
        if (agent.indexOf("sogoumobilebrowser") > 0) {
            browser_type = "sogou";
        }
        if (agent.indexOf("liebaofast") > 0) {
            browser_type = "liebao";
        }
        if (agent.indexOf('weibo') > 0) {
            browser_type = "weibo";
        }
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0 && agent.indexOf("ucbrowser") < 0 && agent.indexOf("micromessenger") < 0 && agent.indexOf("mqqbrowser") < 0 && agent.indexOf("miuibrowser") < 0 && agent.indexOf("mb2345browser") < 0 && agent.indexOf("sogoumobilebrowser") < 0 && agent.indexOf("liebaofast") < 0 && agent.indexOf("qhbrowser") < 0 && agent.indexOf("weibo") < 0) {
            browser_type = "safari";
        }
        return browser_type;
    },
    
}
