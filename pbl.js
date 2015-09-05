(function(win){
	var opts = null;
    win.Pbl = function( opt ){
        var page = 1,
			_this = this;
        _this.isLoad = true;
        var defaults = {
            oLi:null,
            url:""
        }

        opts = opt = extend( defaults,opt || {} );

        getList();
        function getList(){//获取数据
			try{
				window.ajax = $.ajax;
			}catch(ev){
				console.log("do nothing!");
			}
            ajax({
                url:opt.url,
                data:"cpage="+ page,
                success:function(data){
                    var data = JSON.parse(data);
                    if( data.length<=0 ){
                        return;
                    }
                    opt.success && (_this.isLoad = opt.success(data));
					opt.oLoader.style.display = "none";
                }
            })
        }

		function getShortLi(){
			var index = 0,
				obj = opt.oLi,
				shorHeight = obj[0];
			for( var i=1;i<obj.length;i+=1 ){
				if( obj[i].offsetHeight < shorHeight.offsetHeight ){
					index = i;
					shorHeight = obj[i];
				}
			}
			return index;
		}
		
        function getTop(obj){
            var iTop = 0;
            while(obj){
                iTop += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return iTop;
        }
        win.onscroll = function(){

            var _index = getShortLi(),
                shortObj = opt.oLi[_index],
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if( getTop(shortObj) + shortObj.offsetHeight < document.documentElement.clientHeight + scrollTop ){
                if( _this.isLoad ){
					opt.oLoader.style.display = "block";
                    _this.isLoad = false;
                    page++ ;
                    getList();
                }
            }

        }
    }
	
	 //win.Pbl.isLoad = true;
	 win.Pbl.getShortLi = function(){
        var index = 0,
            obj = opts.oLi,
            shorHeight = obj[0];
        for( var i=1;i<obj.length;i+=1 ){
            if( obj[i].offsetHeight < shorHeight.offsetHeight ){
                index = i;
                shorHeight = obj[i];
            }
        }
        return index;
    }
	
    function extend(obj1,obj2){
        for( var i in obj2){
            obj1[i] = obj2[i];
        }
        return obj1;
    }
})(window);
