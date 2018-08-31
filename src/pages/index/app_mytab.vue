<template>
	<div class="app_mytab">
		<div class="app_top_mytab" id='app_top_mytab'>
			<div class="mint-navbar">
				 <a :class="selectedNav=='1' ? 'mint-tab-item is-selected':'mint-tab-item'" @click="selectedNav='1'"><div class="mint-tab-item-icon"></div> <div class="mint-tab-item-label">邀请好友</div></a>
				 <a :class="selectedNav=='2' ? 'mint-tab-item is-selected':'mint-tab-item'" @click="selectedNav='2'"><div class="mint-tab-item-icon"></div> <div class="mint-tab-item-label">我的好友</div></a> 
				 <a :class="selectedNav=='5' ? 'mint-tab-item is-selected':'mint-tab-item'" @click="selectedNav='5'"><div class="mint-tab-item-icon"></div> <div class="mint-tab-item-label">通讯录好友</div></a> 
				 <a :class="selectedNav=='3' ? 'mint-tab-item is-selected':'mint-tab-item'" @click="selectedNav='3'"><div class="mint-tab-item-icon"></div> <div class="mint-tab-item-label">唤醒好友</div></a> 
				 <a :class="selectedNav=='4' ? 'mint-tab-item is-selected':'mint-tab-item'" @click="selectedNav='4'"><div class="mint-tab-item-icon"></div> <div class="mint-tab-item-label">间接好友</div></a> 
				 <i class="nav-bottom" :style="bottomLeft"></i>
			</div>	
		</div>
		<div  ref="TabContainer" style="margin-top: 50px;overflow: hidden;position: relative;" 
		>
			<div id="1" v-show="selectedNav=='1'" :style="minHeight">
        <keep-alive>
			  </keep-alive>
      </div>
			<div id="2" v-show="selectedNav=='2'"  :style="minHeight">
			</div>
			<div id="3" v-show="selectedNav=='3'"  :style="minHeight">
			</div>
			<div id="4" v-show="selectedNav=='4'"  :style="minHeight">
			</div>
			<div id="5" v-show="selectedNav=='5'"  :style="minHeight">
			</div>
		</div>
	</div>
</template>

<script>
import { getInviteCode } from "@/api/api";
import GLOBAL from "@/assets/js/lib/app.global";

export default {
  data() {
    return {
      wakeupUserData: true,
      bottomLeft: "left: 0.7rem;",
      loadingContainer: [true, false, false, false, false],
      selectedNav: "1",
      minHeight:
        "min-height:" + (document.documentElement.clientHeight - 50) + "px",
      swipeable: false,
      clickReload: false,
      wakeupDialog: false,
      apprenticeDialog: false,
      myrenticeData: "",
      urlQuery: "",
      loadingData: true,
      bookInfo: {}, //通讯录信息
      configInfo: []
    };
  },
  components: {
  },
  watch: {
    selectedNav(curVal, oldVal) {
      if (curVal == "1") {
        // this.$refs.swipe.index = 0;
        this.bottomLeft = "left: 0.7rem;";
        this.loadingContainer.splice(0, 1, true);
        GLOBAL.App().sentLog(647);
        this.onPageSelected(0)
      } else if (curVal == "2") {
        // this.$refs.swipe.index = 1;
        this.bottomLeft = "left: 2.8rem;";
        this.loadingContainer.splice(1, 1, true);
        GLOBAL.App().sentLog(335);
        this.onPageSelected(1)
      } else if (curVal == "3") {
        // this.$refs.swipe.index = 2;
        this.bottomLeft = "left: 7rem;";
        this.loadingContainer.splice(2, 1, true);
        GLOBAL.App().sentLog(648);
        this.onPageSelected(3)
      } else if (curVal == "4") {
        // this.$refs.swipe.index = 3;
        this.bottomLeft = "left: 9.3rem;";
        this.loadingContainer.splice(3, 1, true);
        GLOBAL.App().sentLog(630);
        this.onPageSelected(4)
      } else if (curVal == "5") {
        // this.$refs.swipe.index = 4;
        this.bottomLeft = "left: 5rem;";
        this.loadingContainer.splice(4, 1, true);
        GLOBAL.App().sentLog(649);
        this.onPageSelected(2)
      }
      if (curVal > 2) {
        document.getElementById("app_top_mytab").scrollLeft =
          document.documentElement.clientWidth * 0.5;
      } else {
        document.getElementById("app_top_mytab").scrollLeft = 0;
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
    this.urlQuery = this.$route.query;
	this.webLoadComplete();
    // localStorage.setItem('pollData', JSON.stringify(this.pollData));
  },
  mounted() {
    //初始化数据
    let _that = this;
    // _that.loadingData = true;
    // this.webLoadComplete();
    this.appReloadH5();
    this.getGrobalConfigInfo();
  },
  methods: {
    onPageSelected(num){
        let obj = {
          method: "onPageSelected",
          type: num
        };
        GLOBAL.App().postMessage(obj);
    },
    webLoadComplete() {
      let obj = {
        method: "webLoadComplete"
      };
      try {
        // GLOBAL.App().toast('webLoadComplete');
        GLOBAL.App().postMessage(obj);
        let objLog = {
          method: "uploadActivityLog",
          thisurl: window.location.href,
          materialid: "1000000",
          actentryid: "1000000",
          acttype: "page",
          plan: "",
          actid: "invitefriend",
          type: "show"
        };
        GLOBAL.App().postMessage(objLog);
      } catch (e) {
        console.error(e);
      }
    },
    changeClickReload(type) {
      this.clickReload = type;
    },
    openWakeupDialog(item) {
      //打开弹层
      this.wakeupUserData = item;
      this.wakeupDialog = true;
    },
    closeWakeupDialog(type) {
      //关闭弹层
      this.wakeupDialog = false;
      if (this.wakeupUserData.wakeupType == "hxte") {
        this.$refs.wakeupUser.closeWakeupDialog(type);
      } else if (this.wakeupUserData.wakeupType == "myhx") {
        this.$refs.myApprentice.closeWakeupDialog(type);
      }
    },
    openRenticeDialog(item) {
      console.log(item)
      this.myrenticeData = item;
      this.apprenticeDialog = true;
      document.getElementsByTagName("body")[0].style.position = "fiexd";
    },
    closeRenticeDialog(item) {
      this.apprenticeDialog = false;
      document.getElementsByTagName("body")[0].style.position = "static";
    },
    changeSwipeable(swipeable) {
      //改变是否能滑动

      this.$nextTick(function() {
        this.swipeable = swipeable;
      });
    },
    toch() {
      var touch = document.getElementsByTagName("body")[0];
      endX = touch.pageX - startX;
      endY = touch.pageY - startY;
      //如果滑动距离太短
      if (Math.abs(endX) < 2 && Math.abs(endY) < 2) {
        return result;
      }
      var angle = Math.atan2(endY, endX) * 180 / Math.PI;
      if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        nLeft = true;
        nRight = false;
      } else if (angle >= -45 && angle <= 45) {
        nRight = true;
        nLeft = false;
      }
    },
    changSelectedNav(index) {
      this.selectedNav = "" + (index + 1);
    },
    appReloadH5: function() {
      //App回调方法操作
      let _that = this;
      window.pushGrobalConfigInfo = function(res) {
        //获取到polling/config数据
        localStorage.setItem("pollData", JSON.stringify(res));
        //  GLOBAL.App().toast("获取到polling/config数据"+JSON.stringify(res));
      };

      window.reloadList = function(list) {
        //  GLOBAL.App().toast(JSON.stringify(list));
        // GLOBAL.App().toast(list.indexOf('101829557'));
        localStorage.setItem("bookInfoAccid", JSON.stringify(list)); //保存唤醒已发出
        _that.$refs.myApprentice.identifyList("1");
        _that.$refs.wakeupUser.identifyList("1");
      };

      window.getApprenticeCache = function(type) {
        localStorage.setItem("getApprenticeCache", type); //是否识别
      };

      window.getAddessBookInfoToH5 = function(arrInfo) {
        //识别、一键唤醒通讯录改变页面状态
        _that.bookInfo = arrInfo; //{'18721664033':'司马'}
        localStorage.setItem("bookInfo", JSON.stringify(arrInfo));
        if (_that.clickReload) {
          GLOBAL.App().toast("好友识别成功");
        }
        _that.$refs.myApprentice.identifyList("0");
        _that.$refs.wakeupUser.identifyList("0");
      };

      window.changeSelected = function(index) {
        _that.selectedNav = "" + (index + 1);
      };
    },
    getGrobalConfigInfo() {
      let obj = {
        method: "getGrobalConfigInfo"
      };
      try {
        GLOBAL.App().postMessage(obj);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style  lang="scss">
.app_mytab {
  .app_top_mytab {
    width: 10rem;
    height: 50px;
    overflow: hidden;
    overflow-x: overlay;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
  }
  .mint-swipe {
    position: static;
    overflow: auto;
    height: 100%;
  }
  .mint-swipe-items-wrap {
    position: static;
    overflow: scroll;
  }
  .swiper-container {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    padding-top: 50px;
  }
  .mint-navbar {
    width: 10.5rem;
	overflow-x: overlay;
	display: flex;
	text-align: center;
    background-color: #fff;
    .is-selected {
      border-bottom: 0px solid #f44b50;
      color: #f44b50;
      margin-bottom: -3px;
      text-decoration: none;
	}
	a{
		display: block;
    	padding: 7px 0;
		flex: 1;
		text-decoration: none;
		padding: 15px 0;
    font-size: 0.4rem;
	}
    a,
    a:hover,
    a:active,
    a:visited,
    a:link,
    a:focus {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      outline: none;
      background: none;
      text-decoration: none;
    }
    .mint-tab-item-label {
      font-size: 0.4rem;
    }
    .mint-tab-item .mint-tab-item-label {
      font-size: 0.4rem;
    }
    .nav-bottom {
      position: absolute;
      bottom: 0;
      width: 0.54rem;
      height: 0.05rem;
      border-radius: 0.5rem;
      // -webkit-transition: all 1s;
      // -o-transition: all 1s;
      // transition: all 1s;
      background-color: #f44b50;
    }
  }
  .mint-tab-container-item {
    background-color: #f4f4f4;
  }
}
</style>
