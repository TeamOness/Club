(function(window, document){
    function ABQueue(){
        this._init();
    };
    ABQueue.prototype = {
        constrcutor: ABQueue,
        UNKNOW: 'unknow',
        _objStr: Object.prototype.toString, 
        _isArray: function(data){
            return data && this._objStr.call(data) == '[object Array]' ? true : false;
        },
        _beforeDomLoadedQueue: [],
        _debug: '',
        _aburl: ('https:' == document.location.protocol ? 'https://' : 'http://') + 'ab.xin.com/collect.gif?',
        _init: function(){
            var that = this,
                abQueue = [],
                loadedEvent = function(e){
                    while(abQueue.length > 0){
                        that.push(abQueue.splice(0, 1));
                    }
                };

            if(that._isArray(window._abq)){
                var len = window._abq.length;

                for(var i = 0;i < len;i++){
                    abQueue.push(window._abq[i]);
                }
            }

            if(document.addEventListener){
                document.removeEventListener('DOMContentLoaded', loadedEvent, false);
                window.removeEventListener('load', loadedEvent, false);
                document.addEventListener('DOMContentLoaded', loadedEvent, false);
                window.addEventListener('load', loadedEvent, false);
            }else if(document.attachEvent){
                document.detachEvent('onreadystatechange', loadedEvent);
                window.detachEvent('onload', loadedEvent);
                document.attachEvent('onreadystatechange', loadedEvent);
                window.attachEvent('onload', loadedEvent);
            }
        },
        _setCookie: function(name, value, domain, path, expires, secure){
            document.cookie = [
                name, 
                '=', 
                value,
                ';', 
                'domain', 
                '=', 
                domain, 
                ';', 
                'path', 
                '=', 
                path, 
                ';', 
                'expires', 
                '=', 
                expires, 
                ';', 
                (secure ? 'secure' : ''), 
                ';'
            ].join('');
        },
        _getCookie: function(name){
            var reg = new RegExp(name + '\s*=\s*([^\;]+)\;*'),
                result = reg.exec(document.cookie);

            return result && result.length > 1 ? result[1] : this.UNKNOW;
        },
        _getGuid: function(){
            var guid = '';  

            for (var i = 1; i <= 32; i++){  
                var n = Math.floor(Math.random() * 16.0).toString(16);  

                guid += n;  

                if((i == 8) || (i == 12) || (i == 16) || (i == 20)){
                    guid += '-';  
                }
            }

            return guid;  
        },
        _getUniqueId: function(key){
            var that = this,
                key = 'XIN_UID_CK',
                uniqueId = that._getCookie(key);

            if(uniqueId == that.UNKNOW){
                that._setCookie(key, that._getGuid(), 'xin.com', '/', (new Date('2037/12/31 23:59:59')).toUTCString());

                uniqueId = that._getCookie(key);
            }

            return uniqueId;
        },
        _getEvent: function(params){
            var splitor = '/';

            return splitor + params.slice(1).join(splitor);
        }, 
        _getFrom: function(){
            var ua = window.navigator.userAgent,
                isApp = /XinAPP\s*\/\s*([^\s]+)/.test(ua),
                isAndroid = /android/ig.test(ua),
                isIOS = /iphone/ig.test(ua),
                from = '';

            if(isApp){
                if(isAndroid){
                    from = 'm-android';
                }else if(isIOS){
                    from = 'm-ios';
                }
            }else{
                from = isAndroid || isIOS ? 'm': 'www';
            }

            return from;
        },
        _getAppVersion: function(){
            var version = /XinAPP\s*\/\s*([^\s]+)/.exec(window.navigator.userAgent);

            return version && version.length > 1 ? version[1] : '';
        },
        _getUserId: function(){
            var that = this,
                userId = that._getCookie('XIN_UID');

            return userId != that.UNKNOW ? userId : '';
        },
        _getCityId: function(){
            var that = this,
                cityData = that._getCookie('XIN_LOCATION_CITY');

            return cityData != that.UNKNOW ? (JSON.parse(decodeURIComponent(cityData))).cityid : '';
        },
        _getSource: function(url){
            var result = /.?:\/\/([^\/]+)\/.*/.exec(url);

            return result && result.length > 1 ? result[1] : '';
        },
        _getChannel: function(){
            var channel = /channel\s*=\s*([^&]+)&?/.exec(decodeURIComponent(window.location.search));

            return channel && channel.length > 1 ? encodeURIComponent(channel[1]) : '';
        },
        _isEnabledCookie: function(){
            return window.navigator.cookieEnabled ? '1' : '0';
        },
        _isSupportLocalStorage: function(){
            return window.localStorage ? '1' : '0';
        },
        _getLanguage: function(){
            return window.navigator.language || window.navigator.browserLanguage || window.navigator.systemLanguage || window.navigator.userLanguage || '';
        },
        _getColorDepth: function(){
            return window.screen.colorDepth || 0;
        },
        _getBaseParams: function(){
            var that = this,
                params = [];

            params.push('cid=' + that._getUniqueId());
            //params.push('ip=0');
            params.push('from=' + that._getFrom());
            params.push('app=' + that._getAppVersion());
            params.push('net=');
            params.push('ua=' + window.navigator.userAgent);
            params.push('sc=' + window.screen.width + '*' + window.screen.height);
            params.push('ts=' + (new Date()).getTime());

            return params;
        },
        _getTrackParams: function(orginParams){
            var that = this,
                params = [];

            params.push('type=c');
            params.push('ev=' + that._getEvent(orginParams));
            //params.push('pid=0');
            params.push('uid=' + that._getUserId());
            params.push('cityid=' + that._getCityId());
            params.push('url=' + encodeURIComponent(document.location.href));
            params.push('ref=' + encodeURIComponent(document.referrer));
            params.push('source=' + that._getSource(document.referrer));
            params.push('channel=' + that._getChannel());

            params = params.concat(that._getBaseParams());

            return params;
        },
        _getPageviewParams: function(orginParams){
            var that = this,
                params = [];

            params.push('type=w');
            //params.push('pid=0');
            params.push('uid=' + that._getUserId());
            params.push('cityid=' + that._getCityId());
            params.push('url=' + encodeURIComponent(document.location.href));
            params.push('ref=' + encodeURIComponent(document.referrer));
            params.push('source=' + that._getSource(document.referrer));
            params.push('channel=' + that._getChannel());


            params = params.concat(that._getBaseParams());

            return params;
        },
        _getPerformanceParams: function(orginParams){
            var that = this,
                params = [];

            params.push('type=p');
            params.push('ce=' + that._isEnabledCookie());
            params.push('ls=' + that._isSupportLocalStorage());
            params.push('lg=' + that._getLanguage());
            params.push('cd=' + that._getColorDepth());

            if(window.performance){
                var perf = window.performance;

                if(perf.timing){
                    params.push('pce=' + perf.timing.connectEnd);
                    params.push('pcs=' + perf.timing.connectStart);
                    params.push('pdc=' + perf.timing.domComplete);
                    params.push('pdclee=' + perf.timing.domContentLoadedEventEnd);
                    params.push('pdcles=' + perf.timing.domContentLoadedEventStart);
                    params.push('pdi=' + perf.timing.domInteractive);
                    params.push('pdl=' + perf.timing.domLoading);
                    params.push('pdle=' + perf.timing.domainLookupEnd);
                    params.push('pdls=' + perf.timing.domainLookupStart);
                    params.push('pfs=' + perf.timing.fetchStart);
                    params.push('plee=' + perf.timing.loadEventEnd);
                    params.push('ples=' + perf.timing.loadEventStart);
                    params.push('pns=' + perf.timing.navigationStart);
                    params.push('pre=' + perf.timing.redirectEnd);
                    params.push('prs=' + perf.timing.redirectStart);
                    params.push('preqs=' + perf.timing.requestStart);
                    params.push('prese=' + perf.timing.responseEnd);
                    params.push('press=' + perf.timing.responseStart);
                    params.push('pscs=' + perf.timing.secureConnectionStart);
                    params.push('puee=' + perf.timing.unloadEventEnd);
                    params.push('pues=' + perf.timing.unloadEventStart);
                }
                if(perf.memory){
                    params.push('pjshsl=' + perf.memory.jsHeapSizeLimit);
                    params.push('ptjshs=' + perf.memory.totalJSHeapSize);
                    params.push('pujshs=' + perf.memory.usedJSHeapSize);
                }
            }

            params = params.concat(that._getBaseParams());

            return params;
        },
        _getCollectUrl: function(params){
            var that = this;

            return (that._debugurl ? that._debugurl : that._aburl) + params.join('&');
        },
        _collect: function(params){
            var img = new Image;

            img.style.display = 'none';
            img.src = this._getCollectUrl(params);

            document.body.appendChild(img);
        },
        _debug: function(params){
            if(params.length < 2) return;
            
            this._debugurl = params[1];
        },
        _track: function(params){
            var that = this;

            that._collect(that._getTrackParams(params));
        },
        _pageview: function(params){
            var that = this;

            that._collect(that._getPageviewParams(params));
        },
        _performance: function(params){
            var that = this;

            that._collect(that._getPerformanceParams(params));
        },
        push: function(params){
            var that = this;

            if(!that._isArray(params)) return;

            var method = that[params[0]];

            if(!method) return;

            method.call(that, params);
        } 
    };
    window._abq = new ABQueue;
})(window, document);
