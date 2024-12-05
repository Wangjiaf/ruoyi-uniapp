<template>
	<view class="u-page">
		<!-- <view class="list-cell" v-for="(item, index) in chatTipList" :key="index" @touchstart="chatTipTouchstart(item)" @touchmove="chatTipTouchmove()" @touchend="chatTipTouchend(item)">
			<u-avatar v-if="'P2P' == item.chatType" slot="icon" shape="square" size="35" :src="item.tipFromUser.avatar" customStyle="margin: -3px 5px -3px 0"></u-avatar>
			<u-badge :isDot="true" type="error" style="z-index: 1; margin-top: -5px; margin-left: -7px; margin-right: -1px;" v-if="0 != item.unReadCount"></u-badge>
			<view v-if="'P2P' == item.chatType" style="margin-top: 4px; margin-left: 4px; margin-right: 32%; width: 55%;">
				<view style="margin-top: -10px;">{{item.tipFromChatUserRelation.relationUserRemark ? item.tipFromChatUserRelation.relationUserRemark : item.tipFromUser.nickName}}</view>
				<view style="margin-top: -4px; margin-bottom: -10px; font-size: 10px;">{{item.tipContent}}</view>
			</view>
			<view class="badgeBox" style="margin-top: 16px; margin-bottom: -10px;">
				<u-badge numberType="overflow" type="error" max="99" :value="item.unReadCount"></u-badge>
			</view>
		</view> -->
		<!-- <u-tabbar value="0" @change="change1" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home" @click="click1" ></u-tabbar-item>
			<u-tabbar-item text="放映厅" icon="photo" @click="click1" ></u-tabbar-item>
			<u-tabbar-item text="直播" icon="play-right" @click="click1" ></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="click1" ></u-tabbar-item>
		</u-tabbar> -->
		<!-- <u-list>
			<u-list-item v-for="(item, index) in chatTipList" :key="index" @touchstart="chatTipTouchstart(item)" @touchmove="chatTipTouchmove()" @touchend="chatTipTouchend(item)">
				<u-cell :title="item.tipFromChatUserRelation.relationUserRemark ? item.tipFromChatUserRelation.relationUserRemark : item.tipFromUser.nickName" v-if="'P2P' == item.chatType">
					<u-avatar slot="icon" shape="square" size="35" :src="item.tipFromUser.avatar" customStyle="margin: -3px 5px -3px 0"></u-avatar>
				</u-cell>
			</u-list-item>
		</u-list> -->
		<!-- <view v-for="(item, index) in chatTipList" :key="index" @touchstart="chatTipTouchstart(item)" @touchmove="chatTipTouchmove()" @touchend="chatTipTouchend(item)" style="margin-top: 25rpx; background-color: #ffffff;">
			<view v-if="'P2P' == item.chatType">
				<view style="margin-top: -25rpx; margin-left: 25rpx;">
					<image :src="item.tipFromUser.avatar" style="width: 65rpx; height: 65rpx; border-radius: 50%; margin-top: 6rpx;" mode="aspectFill"></image>
				</view>
				<view style="margin-top: -70rpx; margin-left: 100rpx;">
					<text style="font-size: 14px;">{{item.tipFromChatUserRelation.relationUserRemark ? item.tipFromChatUserRelation.relationUserRemark : item.tipFromUser.nickName}}</text>
				</view>
				<view style="margin-top: -32rpx; margin-left: 480rpx;">
					<text style="color: #515151; font-size: 12px;">{{item.createTime}}</text>
				</view>
				<view style="margin-top: -10rpx; margin-left: 100rpx;">
					<text style="color: #515151; font-size: 10px;">{{item.tipContent}}</text>
				</view>
				<view style="margin-top: -25rpx; margin-left: 670rpx;">
					<u-badge numberType="overflow" shape="circle" max="99" :value="item.unReadCount" type="error" :absolute="true" :showZero="false"></u-badge>
				</view>
				<view style="margin-top: 32rpx;">
					<u-divider lineColor="#efefef"></u-divider>
				</view>
			</view>
		</view> -->
		<!-- <u-cell-group>
			<u-cell title="单元格" isLink>
				<text slot="value" class="u-slot-value">99</text>
			</u-cell>
		</u-cell-group> -->
		<u-list>
			<u-list-item v-for="(item, index) in chatTipList" style="background-color: #ffffff;">
				<u-cell :title="item.tipFromChatUserRelation && item.tipFromChatUserRelation.relationUserRemark ? item.tipFromChatUserRelation.relationUserRemark : item.tipFromUser.nickName" :label="item.tipContent" @click="resetChatTipCount_goToChatMessage(item)" v-if="'P2P' == item.chatType">
					<u-avatar slot="icon" shape="square" size="45" :src="item.tipFromUser.avatar" customStyle="margin: -3px 5px -3px 0"></u-avatar>
					<text slot="value" class="u-slot-value">{{item.createTime}}</text>
					<text slot="value" class="u-slot-value" style="min-width: 18px; min-height: 18px; background-color: red; border-radius: 50%; color: aliceblue; text-align: center;" v-if="0 != item.unReadCount">{{item.unReadCount}}</text>
				</u-cell>
				<u-cell :title="item.tipFromChatGroupVo.groupName" :label="item.tipContent" @click="resetChatTipCount_goToChatMessage(item)" v-if="'G2P' == item.chatType">
					<u-avatar slot="icon" shape="square" size="45" :src="item.tipFromChatGroupVo.avatar" customStyle="margin: -3px 5px -3px 0"></u-avatar>
					<text slot="value" class="u-slot-value">{{item.createTime}}</text>
					<text slot="value" class="u-slot-value" style="min-width: 18px; min-height: 18px; background-color: red; border-radius: 50%; color: aliceblue; text-align: center;" v-if="0 != item.unReadCount">{{item.unReadCount}}</text>
				</u-cell>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	import {
		listChatTipVo,
		resetChatTipCount
	} from "@/api/chat/chatTip.js";
	export default {
		data() {
			return {
				chatTipList: [],
				loginUser: null,
				chatTipTimeOutEvent: null,
				websocketTask: null,
				heartbeatTimer: null,
			}
		},
		onShow() {
			this.getChatTipList();
		},
		onHide() {
		},
		onLoad() {
			console.log("执行了onLoad");
			this.loginUser = uni.getStorageSync('user');
			this.initWebSocket();
		},
		onUnload() {
			console.log("执行了onUnload");
			this.closeWebSocket();
		},
		methods: {
			// 获取消息提示列表
			getChatTipList() {
				let queryParams = {
					pageNum: 1,
					pageSize: 10000000,
					userId: this.loginUser.userId
				};
				listChatTipVo(queryParams).then(res => {
					if (200 == res.code) {
						this.chatTipList = [];
						this.chatTipList = res.rows;
					} else {
						this.$modal.msgError(res.msg);
					}
				});
			},
			// 消息提示列表触击事件全生命周期
			chatTipTouchstart(item) {
				console.log("chatTipTouchstart");
				var self = this;
				this.chatTipTimeOutEvent = setTimeout(function() {
					self.chatTipLongPress(item);
				}, 700); // 这里设置定时器，定义长按700毫秒触发长按事件
				return false;
			},
			chatTipTouchend(item) {	// 手释放，如果在700毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
				var that = this;
				clearTimeout(this.chatTipTimeOutEvent); 	// 清除定时器
				if (this.chatTipTimeOutEvent != null) {	// 这里写要执行的内容（如onclick事件）
					this.resetChatTipCount_goToChatMessage(item);
					console.log("chatTipTouchend");
				}
				return false;
			},
			chatTipTouchmove() {	// 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
				console.log("chatTipTouchmove");
				clearTimeout(this.chatTipTimeOutEvent); // 清除定时器
				this.chatTipTimeOutEvent = null;
			},
			chatTipLongPress(item) {	// 真正长按后应该执行的内容
				this.chatTipTimeOutEvent = null;
				//执行长按要执行的内容，如弹出菜单
				console.log("chatTipLongPress");
			},
			// ①消息未读计数清零；②跳转到对应聊天页面
			resetChatTipCount_goToChatMessage(chatTip) {
				resetChatTipCount(chatTip.id).then(res => {
					if (!200 == res.code) {
						this.$modal.msgError(res.msg);
					} else {
						if ('P2P' == chatTip.chatType) {
							this.gotoChatUserMessage(chatTip);
						}
						if ('G2P' == chatTip.chatType) {
							this.gotoChatGroupMessage(chatTip);
						}
					}
				}).catch(err => {
					this.$modal.msgError(err);
				});
			},
			// 私聊
			gotoChatUserMessage(chatTip) {
				let a = {
					relationUserId: chatTip.tipFromId,
					relationUserRemark: chatTip.tipFromChatUserRelation && chatTip.tipFromChatUserRelation.relationUserRemark ? chatTip.tipFromChatUserRelation.relationUserRemark : chatTip.tipFromUser.nickName,
					backLocation: 'pages/main/message'
				};
				let data = JSON.stringify(a);
				uni.navigateTo({
					// url: '../chat/message/chatUserMessage?data=' + data
					url: '../chat/message/chatUserMessage1?data=' + data
				});
			},
			// 群聊
			gotoChatGroupMessage(chatTip) {
				let a = {
					groupId: chatTip.tipFromId,
					groupName: chatTip.tipFromChatGroupVo.groupName,
					groupUserCount: chatTip.tipFromChatGroupVo.groupUserCount,
					backLocation: 'pages/main/message'
				};
				let data = JSON.stringify(a);
				uni.navigateTo({
					url: '../chat/message/chatGroupMessage?data=' + data
				});
			},
			// 初始化WebSocket连接
			initWebSocket() {
				const wsUrl = "ws://172.16.98.40:9210/chatTipSocket/" + this.loginUser.userId;
				this.websocketTask = uni.connectSocket({
					url: wsUrl,
					header: {
						'content-type': 'application/json',
					},
					success: (resData) => {
						console.log("链接成功");
						console.log(JSON.stringify(resData));
					},
					fail: (err) => {
						console.log("错误信息");
						console.log(JSON.stringify(err));
					},
					complete: (res) => {
						console.log('实例化Websocket：', JSON.stringify(res));
					}
				});
				this.websocketTask.onOpen(() => {
					console.log('WebSocket连接已打开');
					this.startHeartbeat();
					// 这里可以发送消息给服务器
					// this.websocketTask.send({
					// 	data: 'Hello, Server!'
					// });
				});
				this.websocketTask.onMessage((message) => {
					console.log('收到服务器消息：', message.data);
					// 这里处理接收到的消息
					this.getChatTipList();
					this.vibrate();
				});
				this.websocketTask.onError((error) => {
					console.error('WebSocket连接发生错误', JSON.stringify(error));
					clearInterval(this.heartbeatTimer); 	// 清除心跳定时器
					this.initWebSocket();
				});
				this.websocketTask.onClose(() => {
					console.log('WebSocket已关闭');
					clearInterval(this.heartbeatTimer); 	// 清除心跳定时器
					this.initWebSocket();
				});
			},
			// 关闭WebSocket连接
			closeWebSocket() {
				if (this.websocketTask) {
					this.websocketTask.close();
					clearInterval(this.heartbeatTimer); 	// 清除心跳定时器
				}
			},
			// 开启心跳定时器
			startHeartbeat() {
				this.heartbeatTimer = setInterval(this.sendHeartbeat, 30000);	// 每30秒发送一次心跳消息
			},
			// 发送心跳消息
			sendHeartbeat() {
				console.log('WebSocket发送消息');
				this.websocketTask.send({
					data: '0'
				});
			},
			// 使手机发生较长时间的振动400ms
			vibrate() {
				uni.vibrateLong({
					success: function() {
						console.log('vibrate振动');
					}
				});
			},
			// change1() {
			// 	console.log("change1");
			// },
			// click1() {
			// 	console.log("click1");
			// },
		},
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
	.badgeBox{
		background-color: #ffffff;
		border-radius: 15px;
	}
</style>