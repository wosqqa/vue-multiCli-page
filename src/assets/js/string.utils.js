export default {
		/**
		 * 是否为空
		 * @param str
		 * @returns {Boolean}
		 */
		isEmpty:function(str){
			return str == undefined || str == null || str.length == 0 || str == "null";
		},
		/**
		 * 字符串分割
		 * @param str 字符源串
		 * @param breakSign 分隔符
		 * @returns 如果字符串为空(undefined,null,""),返回null
		 */
		split:function(str,breakSign){
			if (this.isEmpty(str)) {
				return null;
			}
			var temp = ",";
			if (!this.isEmpty(breakSign)) {
				temp = breakSign;
			}
			return str.split(temp);
		},
		replaceNull:function(str){//替换null为''
			var result = str;
			if (this.isEmpty(str)) {
				result = "";
			}
			return result;
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
		myReplace:function(str,f,e){//把字符str中的f替换成e
			return str.replace(new RegExp(f,"gm"),e); 
		},
		replaceMobile: function (AllText) {//替换手机字符
			if(AllText==undefined || AllText==''){
				return ''; 
			}
			return AllText.substring(0, 3) + "****" + AllText.substring(7, 11); 
		},
		replaceInvite: function (AllText) {//转换邀请码
			if(AllText==undefined || AllText==''){
				return ''; 
			}
			var RedText= AllText.split("");
			//0123456789 accid分别对应7482519306
			var Invite='';
			for(var i=0; i< RedText.length; i++){
				var n = RedText[i];
				if(n=='0'){
					Invite = Invite +'7'
				}else if(n=='1'){
					Invite = Invite +'4'
				}else if(n=='2'){
					Invite = Invite +'8'
				}else if(n=='3'){
					Invite = Invite +'2'
				}else if(n=='4'){
					Invite = Invite +'5'
				}else if(n=='5'){
					Invite = Invite +'1'
				}else if(n=='6'){
					Invite = Invite +'9'
				}else if(n=='7'){
					Invite = Invite +'3'
				}else if(n=='8'){
					Invite = Invite +'0'
				}else if(n=='9'){
					Invite = Invite +'6'
				}
			}
			console.log(Invite);
			return Invite; 
		},	
		replaceRed: function (AllText,type) {//替换字符串加红
			if(AllText==undefined || AllText==''){
				return ''; 
			}
			function  replaceAll(FindText, RepText,AllText) {//替换字符串加红
				let regExp = new RegExp(FindText,'g'); 
				return AllText.replace(regExp, RepText); 
			}
	
			var RedText= AllText;
			if(type==1){
				RedText = replaceAll('\<\%\%','<span style="color:red">',RedText);
				RedText = replaceAll('\%\%\>','</span>',RedText);
			}else if(type==3){
					RedText = replaceAll('\<\%\%','<span style="color:red">',RedText);
					RedText = replaceAll('\%\%\>','</span>',RedText);
					RedText = replaceAll('\\n','<br/>',RedText);
			}else{
				RedText = replaceAll('\{\%\%','<span style="color:red">',RedText);
				RedText = replaceAll('\%\%\}','</span>',RedText);
			}
			return RedText; 
		},
		showFixLength:function(value,length) {//控制显示长度
			//设置固定长度
			var LENGTH = 20;
			if (length != undefined && length > 0) {
				LENGTH = length;
			}
			var result = value;
			if (value.length > LENGTH) {
				result = value.substr(0, LENGTH) + "...";
			}
			return result;
		},
		lrTrim: function(s){//去左右空格;
				console.log("激活"+s);
			  return s.replace(/(^\s*)|(\s*$)/g, "");
		},
		
}

