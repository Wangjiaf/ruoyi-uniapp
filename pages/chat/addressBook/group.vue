<template>
	<view class="u-page" style="background-color: #ffffff; margin-left: 4px; margin-right: 4px;">
		<u-button type="success" icon="plus-circle" @click="createGroupFun" text="新建群组" style="margin-top: 10px;"></u-button>
		<u-index-list>
			<template v-for="(item, index) in chatGroupList">
				<u-index-item>
					<view class="list-cell" v-for="(cell, index) in item" :key="index" @click="chatGroupMessageFun(cell)">
						<u-avatar slot="icon" shape="square" size="35" :src="cell.avatar" customStyle="margin: -3px 5px -3px 0"></u-avatar>
						<view style="margin-top: 4px; margin-left: 4px;">{{cell.groupName}}</view>
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
</template>

<script>
	import {
		listChatGroupVo
	} from "@/api/chat/chatGroup.js";
	export default {
		data() {
			return {
				loginUser: null,
				chatGroupList: []
			};
		},
		onShow() {
			this.getChatGroupList();
		},
		onLoad() {
			this.loginUser = uni.getStorageSync('user');
		},
		methods: {
			getChatGroupList() {
				let queryParams = {
					pageNum: 1,
					pageSize: 10000000,
					userId: this.loginUser.userId
				};
				listChatGroupVo(queryParams).then(res => {
					if (200 == res.code) {
						this.chatGroupList = [];
						this.chatGroupList.push(res.rows);
					} else {
						this.$modal.msgError(res.msg);
					}
				});
			},
			createGroupFun() {
				uni.navigateTo({
					url: './group/createGroup'
				});
			},
			// 逻辑不太对，点击应该去聊天框，在聊天框里面可以选择添加好友
			chatGroupMessageFun(cell) {
				let a = {
					groupId: cell.groupId,
					groupName: cell.groupName,
					groupUserCount: cell.groupUserCount,
					// avatar: cell.avatar
				};
				let data = JSON.stringify(a);
				uni.navigateTo({
					url: '../message/chatGroupMessage?data=' + data
				});
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