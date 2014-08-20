var m_controller;
var platform;
$(document).ready(function(){
	platform = navigator.userAgent.toLowerCase();
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
	this.plistpath = "itms-services://?action=download-manifest&url=dist/";
	this.platform = p;
}
Controller.prototype = {
	init : function() {
		var _this = this;
		var data = window.apps;
				_this.apps = data.apps;
				for(var i=0; i<_this.apps.length; i++) {
					var app = _this.apps[i];
					if(app.platform == 'ios' || app.platform == 'android') {
						if(app.platform != _this.platform) continue;
					}
					var img = 'img/'+app.name+'_'+app.version+'.png';
					var url;
					if(app.platform=='ios') {
						url =  _this.plistpath+app.name+'_'+app.version+'.plist';
					} else if(app.platform=='android') {
						url = 'dist/'+app.name+'_'+app.version+'.apk';
					} else if(app.platform == 'j2me') {
						url = 'dist/'+app.name+'_'+app.version+'.jar';
					} else if(app.platform == 'windows') {
						url = 'dist/'+app.name+'_'+app.version+'.exe'; 
					} else if(app.platform == 'mac') {
						url = 'dist/'+app.name+'_'+app.version+'.dmg';
					} else if(app.platform == 'web') {
						url = app.url;
					} else {
						continue;
					}
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
	addApplication : function() {

	}
}