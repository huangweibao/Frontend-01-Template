(function(window, document) {
  function watermark(settings) {
    // 榛樿璁剧疆
    var defaultSettings = {
      watermark_txt: "text",
      watermark_x: 20, // 姘村嵃璧峰浣嶇疆x杞村潗鏍�
      watermark_y: 20, // 姘村嵃璧峰浣嶇疆Y杞村潗鏍�
      watermark_rows: 50, // 姘村嵃琛屾暟
      watermark_cols: 30, // 姘村嵃鍒楁暟
      watermark_x_space: 10, // 姘村嵃x杞撮棿闅�
      watermark_y_space: 10, // 姘村嵃y杞撮棿闅�
      watermark_color: "#000", // 姘村嵃瀛椾綋棰滆壊
      watermark_alpha: 0.005, // 姘村嵃閫忔槑搴�
      watermark_fontsize: "18px", // 姘村嵃瀛椾綋澶у皬
      watermark_font: "寰蒋闆呴粦", // 姘村嵃瀛椾綋
      watermark_width: 100, // 姘村嵃瀹藉害
      watermark_height: 50, // 姘村嵃闀垮害
      watermark_angle: 25 // 姘村嵃鍊炬枩搴︽暟
    };
    // 闃叉閲嶅娣诲姞
    if (document.getElementsByClassName("mask_div00").length >= 2) {
      return;
    }
    // 閲囩敤閰嶇疆椤规浛鎹㈤粯璁ゅ€硷紝浣滅敤绫讳技jquery.extend
    if (typeof settings === "object") {
      var src = settings;
      for (var key in src) {
        if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key])
          continue;
        else if (src[key])
          defaultSettings[key] = src[key];
      }
    }
    // 濡傛灉鍦╥frame涓紝鎶婃按鍗皒杞磋捣濮嬩綅缃疆0
    if (window.frames.length != parent.frames.length) {
      defaultSettings.watermark_x = 0;
    }
    // 鍒ゆ柇鏄惁鏄痯c绔繕鏄Щ鍔ㄧ
    if (browserJudge()) {
      defaultSettings.watermark_x = 0;
    }

    var oTemp = document.createElement("div");
    oTemp.className = 'maskwrap';
    oTemp.style.left = 0;
    oTemp.style.right = 0;
    oTemp.style.top = 0;
    oTemp.style.bottom = 0;
    oTemp.style.bottom = 0;
    oTemp.style.position = "fixed";
    oTemp.style.overflow = "hidden";
    oTemp.style.zIndex = "9999";
    oTemp.style.pointerEvents = "none";
    // 鑾峰彇椤甸潰鏈€澶у搴�
    // var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
    // 鑾峰彇椤甸潰鏈€澶ч暱搴�
    // var page_height = window.innerHeight;

    // 濡傛灉灏嗘按鍗板垪鏁拌缃负0锛屾垨姘村嵃鍒楁暟璁剧疆杩囧ぇ锛岃秴杩囬〉闈㈡渶澶у搴︼紝鍒欓噸鏂拌绠楁按鍗板垪鏁板拰姘村嵃x杞撮棿闅�
    // if (defaultSettings.watermark_cols == 0 || parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width) {
    //   defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
    //   // defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
    // }
    // 濡傛灉灏嗘按鍗拌鏁拌缃负0锛屾垨姘村嵃琛屾暟璁剧疆杩囧ぇ锛岃秴杩囬〉闈㈡渶澶ч暱搴︼紝鍒欓噸鏂拌绠楁按鍗拌鏁板拰姘村嵃y杞撮棿闅�
    // if (defaultSettings.watermark_rows == 0 || parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height) {
    //   defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
    //   // defaultSettings.watermark_y_space = parseInt((page_height - defaultSettings.watermark_y - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
    // }
    var x;
    var y;
    for (var i = 0; i < defaultSettings.watermark_rows; i++) {
      y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
      for (var j = 0; j < defaultSettings.watermark_cols; j++) {
        x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

        var mask_div = document.createElement("div");
        mask_div.className = "mask_div" + i + j;
        mask_div.appendChild(
          document.createTextNode(defaultSettings.watermark_txt)
        );
        // 璁剧疆姘村嵃div鍊炬枩鏄剧ず
        mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
        mask_div.style.visibility = "";
        mask_div.style.position = "absolute";
        // 閫変笉涓�
        mask_div.style.left = x + "px";
        mask_div.style.top = y + "px";
        mask_div.style.overflow = "hidden";
        mask_div.style.zIndex = "9999";
        mask_div.style.pointerEvents = "none";
        // mask_div.style.border='solid #eee 1px'
        mask_div.style.opacity = defaultSettings.watermark_alpha;
        mask_div.style.fontSize = defaultSettings.watermark_fontsize;
        mask_div.style.color = defaultSettings.watermark_color;
        mask_div.style.textAlign = "center";
        mask_div.style.width = defaultSettings.watermark_width + "px";
        mask_div.style.height = defaultSettings.watermark_height + "px";
        mask_div.style.display = "block";
        oTemp.appendChild(mask_div);
      }
    }
    document.body.appendChild(oTemp);
  }

  function browserJudge() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { // 绉诲姩绔�
      return true;
    } else { // pc绔�
      return false
    }
  }

  function ajax(type, url, data, successFn, failedFn) {
    // 鍒涘缓ajax瀵硅薄
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var type = type.toUpperCase();
    // 鐢ㄤ簬娓呴櫎缂撳瓨
    var random = Math.random();
    if (typeof data == "object") {
      var str = "";
      for (var key in data) {
        str += key + "=" + data[key] + "&";
      }
      data = str.replace(/&$/, "");
    }
    if (type == "GET") {
      if (data) {
        xhr.open("GET", url + "?" + data, true);
      } else {
        xhr.open("GET", url + "?t=" + random, true);
      }
      xhr.withCredentials = true; //鏀寔璺ㄥ煙鍙戦€乧ookies
      xhr.send();
    } else if (type == "POST") {
      xhr.open("POST", url, true);
      // 濡傛灉闇€瑕佸儚 html 琛ㄥ崟閭ｆ牱 POST 鏁版嵁锛岃浣跨敤 setRequestHeader() 鏉ユ坊鍔� http 澶淬€�
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
    // 澶勭悊杩斿洖鏁版嵁
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status == 304) {
          successFn(JSON.parse(xhr.responseText));
        } else {
          if (failedFn) {
            failedFn(xhr.status);
          }
        }
      }
    };
  }

  var host = window.location.host, 
    h;
  if (host.match('local') && host.match('local')[0] == 'local') { // 寮€鍙戠幆澧�
    h = 'local.yunjiweidian.com';
  } else if (host.match('txst') && host.match('txst')[0] == 'txst') { // 鑵捐浜�
    h = 'txst.yunjiglobal.com';
  } else if (host.match('t.') && host.match('t.')[0] == 't.') { // 闃块噷浜�
    h = 't.yunjiglobal.com';
  } else if (host.match('oms') && host.match('oms')[0] == 'oms') { // 姝ｅ紡鐜
    h = 'oms.yunjiglobal.com';
  } else if (host.match('t-do-dev') && host.match('t-do-dev')[0] == 't-do-dev') { // docker鐜
    h = 't-do-dev.yunjiglobal.com';
  } else {
    h = 'outsso.yunjiweidian.com';
  }
  if(h == 'outsso.yunjiweidian.com' && location.host.match('yunjiglobal.com') && location.host.match('yunjiglobal.com')[0] == 'yunjiglobal.com'){
    h = 'outsso.yunjiglobal.com';
  }
  var url = '//' + h + "/outssoadmin/private/Oinfo/uniqueKey";
  ajax("get", url, {}, function(res) {
      console.log(res);
      watermark({watermark_txt: res.data});
      watermark({watermark_txt: res.data, watermark_alpha: 0.15, watermark_x: 220, watermark_y: 50, watermark_color: '#B4BEC8'});
    },
    function(error) {
      console.log(error);
    }
  );
})(window, document);