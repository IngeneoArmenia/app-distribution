var m_controller;
$(document).ready(function(){
	var platform = navigator.userAgent.toLowerCase();
	var p = 'other';
    var ios = platform.match(/(iphone|ipod|ipad)/);
    if(ios) {
    	$("<link/>", {
		   rel: "stylesheet",
		   type: "text/css",
		   href: "ratchet/css/ratchet-theme-ios.min.css"
		}).appendTo("head");
		p='ios';
    } else {
    	var android = platform.match(/(android)/);
    	if(android) {
    		$("<link/>", {
			   rel: "stylesheet",
			   type: "text/css",
			   href: "ratchet/css/ratchet-theme-android.min.css"
			}).appendTo("head");
			p='android';
    	}
    }
    m_controller = new Controller(p);
    m_controller.init();
});

var Controller = function(p) {
	this.apps = null;
	this.baseurl = null;
	this.appbaseurl = "itms-services://?action=download-manifest&url=";
	this.platform = p;
}
Controller.prototype = {
	init : function() {
		var _this = this;
		$.ajax({
	 		dataType: "json",
			url: "apps.json",
			success: function(data) {
				_this.apps = data.apps;
				_this.baseurl = data.base_url;
				for(var i=0; i<_this.apps.length; i++) {
					var app = _this.apps[i];
					var img = 'android/'+app.name+'_'+app.version+'.png';
					var plist = _this.baseurl+app.name+'_'+app.version+'.plist';
					var apk = 'android/'+app.name+'_'+app.version+'.apk';
					var url = (_this.platform=='ios'? _this.appbaseurl+plist : apk);
					var html = '<li class="table-view-cell media">'+
					    '<a  href="'+url+'" data-ignore="push" target="_blank">'+
					      '<img class="media-object pull-left" src="'+img+'" width="35" height="35">'+
					      '<div class="media-body">'+app.name+
					        '<p>'+app.description+'</p>'+
					      '</div>'+
					    '</a>'+
					  '</li>';
					$('#wrapper-apps').append(html);
				}
			},
			error: function(){
				alert('Error');
			}
		});
	},
	addApplication : function() {

	}
}