<template>
	<view class="u-page">
		<u-index-list>
			<u-index-item>
				<view class="list-cell" @click="addNewFriend()">
					<u-avatar slot="icon" shape="square" size="35" src="../../static/images/chat/newFriend.png" customStyle="margin: -3px 5px -3px 0"></u-avatar>
					<view style="margin-top: 4px; margin-left: 4px;">添加新朋友</view>
				</view>
			</u-index-item>
			<u-index-item>
				<view class="list-cell" @click="addNewGroup()">
					<u-avatar slot="icon" shape="square" size="35" src="../../static/images/chat/newGroup.png" customStyle="margin: -3px 5px -3px 0"></u-avatar>
					<view style="margin-top: 4px; margin-left: 4px;">创建新群聊</view>
				</view>
			</u-index-item>
		</u-index-list>
		<!-- <u-index-list :index-list="userIndexList"> -->
		<u-index-list>
			<template v-for="(item, index) in userList">
				<u-index-item>
					<view class="list-cell" v-for="(cell, index) in item" :key="index" @touchstart="userTouchstart(cell)" @touchmove="userTouchmove()" @touchend="userTouchend(cell)">
						<u-avatar slot="icon" shape="square" size="35" :src="cell.relationUser.avatar" customStyle="margin: -3px 5px -3px 0"></u-avatar>
						<view style="margin-top: 4px; margin-left: 4px;">{{cell.relationUserRemark ? cell.relationUserRemark : cell.relationUser.nickName}}</view>
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
</template>

<script>
	import {
		listChatUserRelation,
		listChatUserRelationVo
	} from "@/api/chat/chatUserRelation.js";
	export default {
		data() {
			return {
				userIndexList: ["*"],
				userList: [],
				userTimeOutEvent: null,
				loginUser: null,
			}
		},
		onShow() {
			this.getUserList();
		},
		onLoad() {
			this.loginUser = uni.getStorageSync('user');
		},
		methods: {
			// 获取用户列表
			getUserList() {
				listChatUserRelationVo({userId: this.loginUser.userId}).then(res => {
					// console.log(JSON.stringify(res));
					if (200 == res.code) {
						this.userList = [];
						this.userList.push(res.rows);
					} else {
						this.$modal.msgError(res.msg);
					}
				}).catch(err => {
					this.$modal.msgError(err);
				});
			},
			// 用户列表触击事件全生命周期
			userTouchstart(item) {
				console.log("userTouchstart");
				var self = this;
				this.userTimeOutEvent = setTimeout(function() {
					self.userLongPress(item);
				}, 700); // 这里设置定时器，定义长按700毫秒触发长按事件
				return false;
			},
			userTouchend(item) {	// 手释放，如果在700毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
				var that = this;
				clearTimeout(this.userTimeOutEvent); 	// 清除定时器
				if (this.userTimeOutEvent != null) {	// 这里写要执行的内容（如onclick事件）
					this.gotoChatUserMessage(item);
					console.log("userTouchend");
				}
				return false;
			},
			userTouchmove() {	// 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
				console.log("userTouchmove");
				clearTimeout(this.userTimeOutEvent); // 清除定时器
				this.userTimeOutEvent = null;
			},
			userLongPress(item) {	// 真正长按后应该执行的内容
				this.userTimeOutEvent = null;
				//执行长按要执行的内容，如弹出菜单
				console.log("userLongPress");
			},
			gotoChatUserMessage(userRelation) {
				let a = {
					relationUserId: userRelation.relationUserId,
					relationUserRemark: userRelation.relationUserRemark,
					backLocation: 'pages/main/addressBook'
				};
				let data = JSON.stringify(a);
				uni.navigateTo({
					// url: '../chat/message/chatUserMessage?data=' + data
					url: '../chat/message/chatUserMessage1?data=' + data
				});
			},
			addNewFriend() {
				uni.navigateTo({
					url: '../chat/addressBook/newFriend'
				});
			},
			addNewGroup() {
				console.log("addNewGroup");
			},
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
</style>
