import xss from 'xss'
export default function (Vue, options) {
  //关注接口Ajax
  Vue.prototype.careAjax = function (param, token) {
    return this.$http.post(
      '/api/a/fans/attention.json',
      param,
      { headers: { "X-Access-Token": token } }
    ).then((res) => {
      return res
    })
  };
  //计算千，万位数工具
  Vue.prototype.calNum = function (val) {
    if (!val) return val
    val = parseInt(val)
    if (val < 10000) {
      return val
    } else if (val >= 10000 && val < 100000) {
      return (val / 10000).toFixed(1) + '万'
    } else if (val >= 100000 && val < 1000000) {
      return Math.floor(val / 10000) + '万'
    } else if (val >= 1000000) {
      return '100万+'
    } else {
      return ''
    }
  }
  //取第一位字符串
  Vue.prototype.firstStr = function (val) {
    if (val === undefined || val === null || val === "") return;
    return val.toString().trim().substr(0, 1)
  }
  //价格转换工具
  Vue.prototype.matrixing = function (val) {
    if (val === undefined || val === null || val === "") return;
    let money = val.toString();
    let result = money;
    if (this.$store.state.phoneVersion) {
      result = result + "币";
    }
    if (money.length === 1) return '0.0' + result
    if (money.length === 2) return '0.' + result

    // !!(window.navigator.appVersion.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
    if (this.$store.state.phoneVersion) {
      if (result.indexOf(".") !== -1) return result //判断参数是元单位 直接返回
      return result.slice(0, -3) + '.' + result.slice(-3);
    }
    if (money.indexOf(".") !== -1) return money
    return money.slice(0, -2) + '.' + money.slice(-2);
  }
  /**
   *带中括号的字符串转化成数组
   * @param {"['a','b']"} $str
   */
  Vue.prototype.strToArray = function ($str) {
    if ($str && typeof $str === 'string') {
      if ($str.indexOf('[') === -1) return $str
      const imgList = JSON.parse($str)
      if ($str && imgList.length !== 0) {
        return imgList[0]
      } else {
        return ''
      }
    } else {
      return $str
    }
  }
  //日期转换工具
  Vue.prototype.dateSwitch = function (date) {
    if (date === undefined || date === null || date === "") return;
    let nowTime = Date.parse(new Date());
    let creatTime = Date.parse(new Date(date)) || Date.parse(new Date(date.replace(/-/g, "/")));

    let nowDays = Math.floor(nowTime / 1000 / 60 / 60 / 24);
    let creatDays = Math.floor(creatTime / 1000 / 60 / 60 / 24);
    //创建时间不在当天返回 日期 以日为单位
    if (nowDays !== creatDays) return date.slice(0, 10);
    let time = nowTime - creatTime
    let minutesRound = Math.ceil(time / 1000 / 60);
    //不超过一小时以分钟为单位超过一小时以小时为单位
    if (minutesRound < 60) {
      if (minutesRound < 1) {
        return "刚刚"
      } else {
        return minutesRound + "分钟前";
      }
    }
    let hoursRound = Math.floor(time / 1000 / 60 / 60);
    return hoursRound + "小时前"

  }

  // 日历组件，日期格式化 返回类似 2019-01-02 格式的字符串
  Vue.prototype.formatDate = function (year, month, day) {
    let y = year;
    let m = month;
    if (m < 10) m = "0" + m;
    let d = day;
    if (d < 10) d = "0" + d;
    return y + "-" + m + "-" + d
  }

  // 时间戳转换
  Vue.prototype.formatDateTime = function (inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  };

  /**
   * 控制原生操作 一秒内能只能操作一次
   * @arguments: callback ,array
   * 会默认遍历传递过来数组中每一项，传入回调的参数中
   * */
  Vue.prototype.oneCheck = true
  Vue.prototype.onceController = function (callback, ...array) {
    if (this.oneCheck) {
      this.oneCheck = false
      callback(...array)
      let that = this;
      let param = setTimeout(function () {
        that.oneCheck = true
        clearTimeout(param)
      }, 1000)
    }
  };
  /**
   * @description 富文本类，将转义字符回归到标签
   */
  Vue.prototype.decodeXssFilter = function (str) {
    if (!str) return
    let result = ''
    result = String(str)
      .replace(/g&;t/g, '>')
      .replace(/l&;t/g, '<')
      .replace(/&#;/g, '')
      .replace(/3&#9;/g, "'")
      .replace(/4&#0;/g, '(')
      .replace(/4&#1;/g, ')')
      .replace(/&#42;/g, '*')
      .replace(/&#43;/g, '+')
      .replace(/&#44;/g, ',')
      .replace(/&#45;/g, '-')
      .replace(/&#46;/g, '.')
      .replace(/&#47;/g, '/')
      .replace(/&#58;/g, ':')
      .replace(/&#59;/g, ';')
      .replace(/&#60;/g, '<')
      .replace(/&#61;/g, '>')
      .replace(/&#95;/g, '_')
    return result
  }

  /**
   * 富文本转义，适用于 html 类型
   */
  Vue.prototype.decodeXssFilterInServer = function(str) {
    if (!str) return
    let result = ''
    result = String(str)
      .replace(/g&;t/g, '>')
      .replace(/l&;t/g, '<')
      .replace(/&#;/g, '')
      .replace(/3&#9;/g, "'")
      .replace(/4&#0;/g, '(')
      .replace(/4&#1;/g, ')')
      .replace(/&#42;/g, '*')
      .replace(/&#43;/g, '+')
      .replace(/&#44;/g, ',')
      .replace(/&#45;/g, '-')
      .replace(/&#46;/g, '.')
      .replace(/&#47;/g, '/')
      .replace(/&#58;/g, ':')
      .replace(/&#59;/g, ';')
      .replace(/&#60;/g, '<')
      .replace(/&#61;/g, '>')
      .replace(/&#95;/g, '_')
    return result
  },

  /**
     * @description 处理xss攻击
     * @params html
     * @return parse html
     */
  Vue.prototype.xssFilter = function (html) {
    if (!html) return
    /* const options = {
      whiteList: {
        a: ['href', 'title'] // 白名单以及标签属性
      },
      allowCommentTag: true, // 去掉html注释 false 为去掉
      stripIgnoreTagBody: ['srcipt'] // 去掉不在白名单上的标签及标签体  false|null|undefined：（默认），不特殊处理  '*'|true：去掉所有不在白名单上的标签  ['tag1', 'tag2']：仅去掉指定的不在白名单上的标签
    } */
    /* eslint-disable */
    if (process.server) {
      return  // 不能再服务端做任何处理，会跟v-html 指令冲突，导致xss处理失效
    } else {
      return xss(html)
    }
  }
};
