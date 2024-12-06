<template>
	<div class="content">
		<div class="message_content">
			<!-- 消息区 -->
			<div class="message_area" ref="chatWindow">
				<div class="message_item" :style="{ justifyContent: item.userId == loginUser.userId ? 'flex-end' : 'flex-start' }" v-for="(item, index) in messageList" :key="index">
					<div class="avator" v-if="item.userId != loginUser.userId">
						<img :src="item.userHeadImg" alt="" />
					</div>
					<div class="">
						<div class="name" style="font-size: 10px;">{{ item.name }} {{ item.time }}</div>
						<div class="message_l" :class="{message_left: true, message_right: false}" style="font-size: 14px;" v-if="item.userId != loginUser.userId">{{ item.content }}</div>
						<div class="message_r" :class="{message_left: false, message_right: true}" style="font-size: 14px;" v-if="item.userId == loginUser.userId">{{ item.content }}</div>
					</div>
					<div class="avator" v-if="item.userId == loginUser.userId">
						<img :src="item.userHeadImg" alt="" />
					</div>
				</div>
			</div>
			<u-button type="primary" size="small" @click="send" text="发送" style="width: 40px; margin-right: 1%;"></u-button>
			<u-input v-model="textarea" placeholder="请输入内容" style="background-color: azure;"></u-input>
		</div>
	</div>
</template>

<script>
	import {
		listChatGroupMessageVo,
		sendChatGroupMessage
	} from "@/api/chat/chatGroupMessage.js";
	export default {
		data() {
			return {
				textarea: "",
				messageList: [
					{
						name: "张三",
						content: "你好",
						time: this.formatDate(new Date()),
					},
					{
						name: "李四",
						content: "你好",
						time: this.formatDate(new Date()),
					},
					{
						name: "王五",
						content: "你好",
						time: this.formatDate(new Date()),
					},
					{
						name: "赵六",
						content: "你好",
						time: this.formatDate(new Date()),
					},
					{
						name: "张三",
						content: "你好",
						time: this.formatDate(new Date()),
					},
				],
				loginUser: null,
				groupId: null,
				groupName: null,
				groupUserCount: null,
				heartbeatTimer: null,
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.groupName + '(' + this.groupUserCount + ')'
			});
		},
		onLoad(option) {
			console.log("执行了onLoad");
			var data = option.data;
			var dataJson = JSON.parse(data);
			uni.setNavigationBarTitle({
				title: dataJson.groupName + '(' + dataJson.groupUserCount + ')'
			});
			this.loginUser = uni.getStorageSync('user');
			this.groupId = dataJson.groupId;
			this.groupName = dataJson.groupName;
			this.groupUserCount = dataJson.groupUserCount;
			this.getChatGroupMessageList();
			this.initWebSocket();
		},
		onUnload() {
			console.log("执行了onUnload");
			this.closeWebSocket();
		},
		onNavigationBarButtonTap(e) {
			let a = {
				groupId: this.groupId,
				groupName: this.groupName,
			};
			let data = JSON.stringify(a);
			uni.navigateTo({
				url: '../addressBook/group/addGroupUser?data=' + data
			})
		},
		methods: {
			getChatGroupMessageList() {
				let queryParams = {
					pageNum: 1,
					pageSize: 10000000,
					groupId: this.groupId,
					params: {
						loginUserId: this.loginUser.userId,
					}
				};
				listChatGroupMessageVo(queryParams).then(res => {
					if (200 == res.code) {
						this.messageList = [];
						for (var i = 0; i < res.rows.length; i++) {
							var everyMessage = {
								userHeadImg: res.rows[i].fromUser.avatar,
								userId: res.rows[i].fromUserId,
								name: res.rows[i].fromUserRelation && res.rows[i].fromUserRelation.relationUserRemark ? res.rows[i].fromUserRelation.relationUserRemark : res.rows[i].fromUser.nickName,
								content: res.rows[i].messageContent,
								time: res.rows[i].createTime,
							};
							this.messageList.push(everyMessage);
						}
					} else {
						this.$modal.msgError(res.msg);
					}
				});
			},
			/* 回车发送消息 */
			keyDown(e) {
				// if (e.key == "Enter") {
				// 	this.send();
				// 	e.preventDefault(); // 去掉默认的换行
				// }
			},
			/* 点击发送消息 */
			send() {
				if (!this.textarea) return;
				let subForm = {
					groupId: this.groupId,
					fromUserId: this.loginUser.userId,
					messageContent: this.textarea
				};
				sendChatGroupMessage(subForm).then(res => {
					if (!200 == res.code) {
						this.$modal.msgError(res.msg);
					} else {
						var newMessage = {
							userHeadImg: this.loginUser.avatar,
							userId: this.loginUser.userId,
							name: this.loginUser.nickName,
							content: subForm.messageContent,
							time: this.formatDate(new Date())
						};
						this.messageList.push(newMessage);
						this.scrollToBottom();
					}
				});
				this.textarea = "";
			},
			/* 滚动到底部  永远保持显示最新消息 */
			scrollToBottom() {
				// 使用setTimeout确保DOM更新完成
				// setTimeout(() => {
				// 	this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight;
				// }, 0);
			},
			/* 时间格式化 */
			formatDate(date) {
				const d = new Date(date);
				let month = "" + (d.getMonth() + 1);
				let day = "" + d.getDate();
				let hour = "" + d.getHours();
				let minute = "" + d.getMinutes();
				let second = "" + d.getSeconds();
				let year = d.getFullYear();
				if (month.length < 2) month = "0" + month;
				if (day.length < 2) day = "0" + day;
				if (hour.length < 2) hour = "0" + hour;
				if (minute.length < 2) minute = "0" + minute;
				if (second.length < 2) second = "0" + second;
				return (
					[year, month, day].join("-") + " " + [hour, minute, second].join(":")
				);
			},
			// 初始化WebSocket连接
			initWebSocket() {
				const wsUrl = "ws://172.16.98.40:9210/chatGroupMessageSocket/" + this.loginUser.userId;
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
				});
				this.websocketTask.onMessage((message) => {
					console.log('收到服务器消息：', message.data);
					this.getChatGroupMessageList();
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
		},
	};
</script>

<style lang="scss" scoped>
	::v-deep .el-textarea {
		height: calc(100% - 60px);
	}
	::v-deep .el-textarea__inner {
		height: 105px !important;
		color: #fff;
		min-height: 105px !important;
		background-color: transparent;
		border: 0;
	}
	::v-deep ::-webkit-scrollbar {
		background-color: transparent !important;
	}
	.message_left {
		border-top-right-radius: 5px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.message_right {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.content {
		border: 2px solid #ffffff;
		border-radius: 5px;
		background-color: rgba(234, 234, 234, 0.5);
		box-shadow: 0 0 10px 1px #ffffff;
		margin-right: 10px;
		width: 100%;
		height: 780px;
		display: flex;
		.message_content {
			width: 38%;
		}
		.message_content {
			width: 100%;
			height: 100%;
			border-radius: 5px;
			box-shadow: 0 0 5px 1px #ffffff;
			background-color: rgba(255, 255, 255, 0.2);
			.message_title {
				height: 50px;
				line-height: 50px;
				color: #50d7d3;
				text-align: center;
				background-color: #174670;
			}
			.message_area {
				width: 100%;
				// height: calc(100% - 180px);
				height: 90%;
				overflow-y: auto;
				.message_item {
					display: flex;
					justify-content: flex-end;
					margin: 5px 0;
					.avator {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						margin-right: 10px;
						margin-left: 10px;
						img {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
					.name {
						color: #67798e;
					}
					.message_l {
						color: #000000;
						padding: 5px;
						background-color: #ffffff;
						border: 0px solid #71acbd;
					}
					.message_r {
						color: #000000;
						padding: 5px;
						background-color: #00b000;
						border: 0px solid #71acbd;
					}
				}
			}
			.message_input {
				// border: 1px solid #3e5a77;
				margin: 3px auto 0 auto;
				width: 96%;
				height: 165px;
				border-radius: 3px;
				box-shadow: 0 0 3px 1px #0d0d0d;
				background-color: rgba(230, 230, 230, 0.2);
			}
		}
	}
	::v-deep .el-button {
		color: #ffffff;
		border-radius: 5px;
		border: 1px solid #43a0a8;
		// background-image: linear-gradient(to bottom, #15263b, #238298);
		background-color: #00b000;
		margin-right: 10px;
		margin-top: -50px;
		height: 30px;
	}
</style>