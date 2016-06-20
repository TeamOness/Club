(function () {
    var url = window.location.href,
        ua = window.navigator.userAgent,
        isHome = /www\.xin\.com\/[a-zA-Z]+\/(\?.+)?$/.test(url),
        isXR = (url.indexOf('http://www.xin.com/starelite/index/') >= 0 ? true : false),
        isApp = /XinAPP\s*\/\s*([^\s]+)/.test(ua),
        go2Frame = function(id, url){
            var iframe = document.createElement('IFRAME');

            iframe.setAttribute('id',id);
            iframe.style.display = 'none';
            iframe.setAttribute('src',url);

            document.body.appendChild(iframe);
        };

    if(!isApp){
        if(isHome){
            if((parseInt(Math.random() * 20) + 1) == 4){
                go2Frame('adciframe', 'http://c.admaster.com.cn/c/a68439,b1108306,c3821,i0,m101,h');
            }
            go2Frame('advhome', 'http://v.admaster.com.cn/i/a68439,b1108306,c3821,i0,m202,h');
        }else if(isXR){
            var s = [30772, 125227, 111451, 32894, 82654, 31030, 66476, 68245, 6691, 93237, 62807, 120051, 5248, 28352, 51986],
                r = (parseInt(Math.random() * 130000) + 1);

            for(var i = 0;i < s.length;i++){
                if(s[i] == r){
                    go2Frame('adcxr1', 'http://c.admaster.com.cn/c/a69199,b1138240,c3821,i0,m101,h');
                    go2Frame('adcxr2', 'http://c.admaster.com.cn/c/a69199,b1138242,c3821,i0,m101,h');
                    go2Frame('adcxrbd', 'http://www.xin.com/tools/benz');
                }
            }
        }else{
            var city = /XIN_LOCATION_CITY\s*=\s*([^\;]+)\;*/.exec(document.cookie);
            var cities = ['baicheng', 'baishan', 'baoding', 'baoji', 'baotou', 'beijing', 'benxi', 'cangzhou', 'changchun', 'changsha', 'changzhou', 'chengde', 'chengdu', 'chongqing', 'dalian', 'dandong', 'daqing', 'datong', 'deyang', 'dongguan', 'eerduosi', 'foshan', 'fuzhou', 'ganzhou', 'guangzhou', 'guilin', 'guiyang', 'guyuan', 'haerbin', 'haikou', 'hami', 'handan', 'hangzhou', 'hefei', 'huaian', 'huainan', 'huhehaote', 'huizhou', 'jiangmen', 'jiaxing', 'jinan', 'jincheng', 'jingmen', 'jinzhou', 'jiujiang', 'jiuquan', 'kuerle', 'kunming', 'langfang', 'lanzhou', 'leshan', 'lianyungang', 'linfen', 'linyi', 'liupanshui', 'liuzhou', 'longyan', 'luoyang', 'luzhou', 'maoming', 'meizhou', 'mianyang', 'nanchang', 'nanchong', 'nanjing', 'nanning', 'nantong', 'ningbo', 'puyang', 'qingdao', 'qingyuan', 'qinhuangdao', 'qiqihaer', 'quanzhou', 'rizhao', 'sanhe', 'shanghai', 'shantou', 'shaoguan', 'shenyang', 'shenzhen', 'shihezi', 'shijiazhuang', 'songyuan', 'suzhou', 'taiyuan', 'taizhou', 'taizhouzj', 'tangshan', 'tianjin', 'tieling', 'tonghua', 'tongliao', 'weifang', 'wenzhou', 'wuhai', 'wuhan', 'wulumuqi', 'wuxi', 'xiamen', 'xian', 'xiangyang', 'xingyi', 'xining', 'xuzhou', 'yangquan', 'yibin', 'yichang', 'yinchuan', 'yueyang', 'yulin', 'zhanjiang', 'zhaoqing', 'zhengzhou', 'zhongshan', 'zhuhai', 'zhuzhou', 'zibo', 'zunyi'];

            go2Frame('admother', 'http://www.xin.com/' + (city && city.length > 1 ? JSON.parse(decodeURIComponent(city[1])).ename : cities[parseInt(Math.random() * cities.length)]) + '/?from=wap&ab=1');
        }
    }

    var params = {};
    //Document对象数据
    if(document) {
        params.domain = document.domain || ''; 
        params.url = document.URL || ''; 
        params.title = document.title || ''; 
        params.referrer = document.referrer || ''; 
    }   
    //Window对象数据
    if(window && window.screen) {
        params.sh = window.screen.height || 0;
        params.sw = window.screen.width || 0;
        params.cd = window.screen.colorDepth || 0;
    }   
    //navigator对象数据
    if(navigator) {
        params.lang = navigator.language || ''; 
    }    
    //拼接参数串
    var args = ''; 
    for(var i in params) {
        if(args != '') {
            args += '&';
        }   
        args += i + '=' + encodeURIComponent(params[i]);
    }
    var img = new Image();
    var rnd_id = "_img_" + Math.random();
    window[rnd_id] = img; // 全局变量引用
    img.onload = img.onerror = function () {
        window[rnd_id] = null; // 删除全局变量引用
    }
    img.src = "http://tj.xin.com/w.gif?"+ args +'&s=' + Math.random();
})();




