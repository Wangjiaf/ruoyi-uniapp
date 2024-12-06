var main, receiver, filter;
var _codeQueryTag = true;
var curRoute = "";
export default {
	// 封装封装扫码请求
	initScan(scanListen) {
		main = plus.android.runtimeMainActivity(); // 获取activity  
		if (curRoute) { // 防止页面跳转，没有取消监听
			main.unregisterReceiver(receiver);
		}
		let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
		curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
		console.log("登记扫码回调函数的页面:" + JSON.stringify(curRoute));
		/* #ifdef APP-PLUS */
		/* var context = plus.android.importClass('android.content.Context'); */
		let IntentFilter = plus.android.importClass('android.content.IntentFilter');
		/* var Intent = plus.android.importClass('android.content.Intent'); */
		filter = new IntentFilter();
		let DeviceModel = plus.device.model;
		// console.log(DeviceModel);
		let action = '';
		if (DeviceModel == "SD55") {
			action = "com.se4500.onDecodeComplete";
		} else if (DeviceModel == "BTA500") {
			action = "";
		} else {
			action = "com.android.server.scannerservice.broadcast";
		}
		let code;
		filter.addAction(action);
		receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
			onReceive: function(context, intent) {
				plus.android.importClass(intent);
				let key;
				if (DeviceModel == "SD55") {
					key = "se4500";
				} else if (DeviceModel == "BTA500") {
					key = "com.keyence.autoid.scanmanagersdk.data";
				} else {
					key = "scannerdata";
				}
				code = intent.getStringExtra(key).trim();
				// console.log("cccccccccc:"+code);
				if (_codeQueryTag) {
					// console.log("timerset:"+_codeQueryTag);
					setTimeout(function() {
						_codeQueryTag = true;
						// console.log("timertick");
					}, 200);
					_codeQueryTag = false;
					let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
					let tempRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
					if (tempRoute == curRoute) scanListen(code);
					// console.log("timerset:"+_codeQueryTag);
				} else {} // console.log("ffffff:"+_codeQueryTag);
			}
		});
		/* #endif */
	},

	startScan() {
		main.registerReceiver(receiver, filter);
	},

	stopScan() {
		curRoute = "";
		main.unregisterReceiver(receiver);
	},

}