<template>
	<view class="content">
		<view class="content-box" @touchstart="touchstart" id="content-box" :class="{'content-showfn':showFunBtn}">
			<!-- 背景图- 定位方式 -->
			<!-- <image class="content-box-bg" :src="user_info.chatBgImg" :style="{ height: imgHeight }"></image> -->
			<view class="content-box-loading" v-if="!loading"><u-loading-page mode="flower"></u-loading-page></view>
			<view class="message" v-for="(item, index) in messageList" :key="index" :id="`msg-${item.hasBeenSentId}`">
				<view class="message-item " :class="item.isItMe ? 'right' : 'left'">
					<image class="img" :src="item.fromUserHeadImg" mode="" @tap="linkToBusinessCard(item.fromUserId)"></image>
					<!-- contentType = 1 文本 -->
					<view class="content" v-if="item.contentType == 1">{{ item.content }}</view>
					<!-- contentType = 2 语音 -->
					<view class="content contentType2" :class="[{ 'content-type-right': item.isItMe }]"
						v-if="item.contentType == 2" @tap="handleAudio(item)" hover-class="contentType2-hover-class"
						:style="{width:`${130+(item.contentDuration*2)}rpx`}">
						<view class="voice_icon" :class="[
                                { voice_icon_right: item.isItMe },
                                { voice_icon_left: !item.isItMe },
                                { voice_icon_right_an: item.anmitionPlay && item.isItMe },
                                { voice_icon_left_an: item.anmitionPlay && !item.isItMe } ]"></view>
						<view class="">{{ item.contentDuration }}''</view>
					</view>
					<!-- contentType = 3 图片 -->
					<view class="content contentType3" v-if="item.contentType == 3" @tap="viewImg([item.content])">
						<image :src="item.content" class="img" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部聊天输入框 -->
		<view class="input-box2" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<view class="voice">
				<u-icon name="../../../static/images/chat/voice.png" size="36"></u-icon>
			</view>
			<view class="textbox">
				<!-- <view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view> -->
				<view class="text-mode">
					<view class="box">
						<editor id="editor" class="ql-container" placeholder=" " :show-img-size="true" @ready="onEditorReady">
						</editor>
						<!-- <textarea auto-height="true" v-model="formData.content" @focus="textareaFocus"/> -->
					</view>
					<view class="em" @tap="chooseEmoji">
						<u-icon name="../../../static/images/chat/emoji.png" size="32"></u-icon>
					</view>
				</view>
			</view>
			<!-- 功能性按钮 -->
			<view class="flex u-p-l-20" @click="switchFun">
				<u-icon name="../../../static/images/chat/add.png" size="36" color="#ff6a00"></u-icon>
			</view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<view class="emoji-swiper" :class="{hidden:hideEmoji}">
				<scroll-view scroll-y="true" style="height: 300rpx;">
					<view class="u-p u-flex u-flex-wrap">
						<view class="u-m-b-32 emoji-box flex" v-for="(page, pid) in emojiList" :key="pid" @tap="clickEmoji(page)">
							<image mode="widthFix" :src="'../../../static/images/chat/emoji/' + page.url"></image>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box u-flex-col" v-for="(item, index) in funList" :key="index">
						<u-icon :name="item.icon" :size="52"></u-icon>
						<view class="grid-text">{{ item.title }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- //语音动画 -->
		<view class="voice_an" v-if="recording">
			<view class="voice_an_icon">
				<view id="one" class="wave"></view>
				<view id="two" class="wave"></view>
				<view id="three" class="wave"></view>
				<view id="four" class="wave"></view>
				<view id="five" class="wave"></view>
				<view id="six" class="wave"></view>
				<view id="seven" class="wave"></view>
			</view>
			<view class="text">{{voiceIconText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fromUserInfo: {},
				// 抽屉参数
				popupLayerClass: '',
				formData: {
					content: '',
					limit: 15,
					index: 1
				},
				user_info: {
					address: "河南郑州",
					// chatBgImg: "/static/1.jpg",
					headImg: "/static/chat/huge.jpg",
					id: 1,
					phone: "13535351112",
					pictureBanner: "/static/chat/Ran.jpg",
					signature: "who do you want to meet.",
					userName: "DR",
					wechatNumber: "October"
				},
				messageList: [{
					anmitionPlay: false,
					content: "很高兴认识你，这是第1条消息。很高兴认识你，这是第1条消息。很高兴认识你，这是第1条消息。很高兴认识你，这是第1条消息。",
					contentType: 1,
					createTime: 1614069114032,
					fromUserHeadImg: "https://cdn.uviewui.com/uview/album/8.jpg",
					fromUserId: 1,
					hasBeenSentId: 1,
					isItMe: true
				}, {
					anmitionPlay: false,
					content: "很高兴认识你，这是第2条消息。",
					contentType: 1,
					createTime: 1614069114032,
					fromUserHeadImg: "https://cdn.uviewui.com/uview/album/8.jpg",
					fromUserId: 1,
					hasBeenSentId: 2,
					isItMe: false
				}, {
					anmitionPlay: false,
					content: "很高兴认识你，这是第3条消息。",
					contentType: 1,
					createTime: 1614069114032,
					fromUserHeadImg: "https://cdn.uviewui.com/uview/album/8.jpg",
					fromUserId: 1,
					hasBeenSentId: 3,
					isItMe: true
				}, {
					anmitionPlay: false,
					content: "很高兴认识你，这是第4条消息。",
					contentType: 1,
					createTime: 1614069114032,
					fromUserHeadImg: "https://cdn.uviewui.com/uview/album/8.jpg",
					fromUserId: 1,
					hasBeenSentId: 4,
					isItMe: false
				}, {
					anmitionPlay: false,
					content: "很高兴认识你，这是第5条消息。",
					contentType: 1,
					createTime: 1614069114032,
					fromUserHeadImg: "https://cdn.uviewui.com/uview/album/8.jpg",
					fromUserId: 1,
					hasBeenSentId: 5,
					isItMe: true
				}, ],
				loading: true, //标识是否正在获取数据
				imgHeight: '1000px',
				mpInputMargin: false, //适配微信小程序 底部输入框高度被顶起的问题
				chatType: "voice", // 图标类型 'voice'语音 'keyboard'键盘
				voiceTitle: '按住 说话',
				Recorder: uni.getRecorderManager(),
				Audio: uni.createInnerAudioContext(),
				recording: false, //标识是否正在录音
				isStopVoice: false, //加锁 防止点击过快引起的当录音正在准备(还没有开始录音)的时候,却调用了stop方法但并不能阻止录音的问题
				voiceInterval: null,
				voiceTime: 0, //总共录音时长
				canSend: true, //是否可以发送
				PointY: 0, //坐标位置
				voiceIconText: "正在录音...",
				showFunBtn: false, //是否展示功能型按钮
				AudioExam: null, //正在播放音频的实例
				funList: [{
						icon: "photo-fill",
						title: "照片",
						uploadType: ["album"]
					},
					{
						icon: "camera-fill",
						title: "拍摄",
						uploadType: ["camera"]
					},
				],
				// input
				customStyle: {
					padding: '15rpx'
				},
				// more参数
				hideMore: true,
				//表情定义
				hideEmoji: true,
				emojiList: [{
						"url": "001-anxious.png",
						alt: "[尴尬]"
					},
					{
						"url": "002-crying.png",
						alt: "[伤心]"
					},
					{
						"url": "003-dizzy.png",
						alt: "[闭眼]"
					},
					{
						"url": "004-expressionless.png",
						alt: "[发呆]"
					},
					{
						"url": "005-blowkiss.png",
						alt: "[飞吻]"
					},
					{
						"url": "006-full.png",
						alt: "[调皮]"
					},
					{
						"url": "007-screaming.png",
						alt: "[震惊]"
					},
					{
						"url": "008-laughing.png",
						alt: "[偷笑]"
					},
					{
						"url": "009-rollingeyes.png",
						alt: "[白眼]"
					},
					{
						"url": "010-angry.png",
						alt: "[生气]"
					},
					{
						"url": "011-laughing.png",
						alt: "[笑哭]"
					},
					{
						"url": "012-flushed.png",
						alt: "[害羞]"
					},
					{
						"url": "013-grinning.png",
						alt: "[笑]"
					},
					{
						"url": "014-hug.png",
						alt: "[惊讶]"
					},
					{
						"url": "015-crying.png",
						alt: "[难过]"
					},
					{
						"url": "016-angry.png",
						alt: "[抓狂]"
					},
					{
						"url": "017-sleeping.png",
						alt: "[晚安]"
					},
					{
						"url": "018-fallinlove.png",
						alt: "[哇哦]"
					},
					{
						"url": "019-thinking.png",
						alt: "[思考]"
					},
					{
						"url": "020-unamused.png",
						alt: "[笑]"
					},
					{
						"url": "021-winkingface.png",
						alt: "[快乐]"
					},
					{
						"url": "022-grinning.png",
						alt: "[笑]"
					}
				],
				backLocation: null,
				loginUser: null,
			};
		},
		methods: {
			test(e) {
				console.log(e);
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			discard() {
				return;
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus() {
				if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
					this.hideDrawer();
				}
			},
			//拼接消息 处理滚动
			async joinData() {
				if (!this.loading) {
					//如果没有获取数据 即loading为false时，return 避免用户重复上拉触发加载
					return;
				}
				this.loading = false;
				const data = await this.getMessageData();
				//获取节点信息
				const {
					index
				} = this.formData;
				const sel = `#msg-${index > 1 ? this.messageList[0].hasBeenSentId : data[data.length - 1].hasBeenSentId}`;
				this.messageList = [...data, ...this.messageList];
				//填充数据后，视图会自动滚动到最上面一层然后瞬间再跳回bindScroll的指定位置 ---体验不是很好，后期优化 ·
				this.$nextTick(() => {
					this.bindScroll(sel);
					//如果还有数据
					if (this.formData.limit >= data.length) {
						this.formData.index++;
						setTimeout(() => {
							this.loading = true;
						}, 200);
					}
				});
			},
			//处理滚动
			bindScroll(sel, duration = 0) {
				const query = uni.createSelectorQuery().in(this);
				query
					.select(sel)
					.boundingClientRect(data => {
						uni.pageScrollTo({
							scrollTop: data && data.top - 40,
							duration
						});
					})
					.exec();
			},
			//获取消息
			getMessageData() {
				let getData = () => {
					let arr = [];
					let startIndex = (this.formData.index - 1) * this.formData.limit;
					let endIndex = startIndex + this.formData.limit;
					for (let i = startIndex; i < endIndex; i++) {
						const isItMe = Math.random() > 0.5 ? true : false;
						arr.unshift({
							hasBeenSentId: i, //已发送过去消息的id
							content: `很高兴认识你，这是第${i + 1}条消息。`,
							fromUserHeadImg: isItMe ? this._user_info.headImg : this.fromUserInfo.fromUserHeadImg, //用户头像
							fromUserId: isItMe ? this._user_info.id : this.fromUserInfo.fromUserId,
							isItMe, //true此条信息是我发送的 false别人发送的
							createTime: Date.now(),
							contentType: 1, // 1文字文本 2语音
							anmitionPlay: false //标识音频是否在播放
						});
					}
					return arr;
				};
				return new Promise((resolve, reject) => {
					const data = getData();
					setTimeout(() => {
						resolve(data);
					}, 500);
				});
			},
			//切换语音或者键盘方式
			switchChatType(type) {
				this.chatType = type;
				this.showFunBtn = false;
			},
			//切换功能性按钮
			switchFun() {
				/* this.chatType = 'keyboard'
				this.showFunBtn = !this.showFunBtn;
				this.hideEmoji = false;
				uni.hideKeyboard()*/
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 点击选择表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//发送消息
			sendMsg(data) {
				const params = {
					hasBeenSentId: Date.now(), //已发送过去消息的id
					content: this.formData.content,
					fromUserHeadImg: this._user_info.headImg, //用户头像
					fromUserId: this._user_info.id,
					isItMe: true, //true此条信息是我发送的  false别人发送的
					createTime: Date.now(),
					contentType: 1
				};

				if (data) {
					if (data.contentType == 2) {
						//说明是发送语音
						params.content = data.content;
						params.contentType = data.contentType;
						params.contentDuration = data.contentDuration;
						params.anmitionPlay = false;
					} else if (data.contentType == 3) {
						//发送图片
						params.content = data.content;
						params.contentType = data.contentType;
					}
				} else if (!this.$u.trim(this.formData.content)) {
					//验证输入框书否为空字符传
					return;
				}

				this.messageList.push(params);

				this.$nextTick(() => {
					this.formData.content = '';
					// #ifdef MP-WEIXIN
					if (params.contentType == 1) {
						uni.pageScrollTo({
							scrollTop: 99999,
							duration: 0, //小程序如果有滚动效果 input的焦点也会随着页面滚动...
						});
					} else {
						setTimeout(() => {
							uni.pageScrollTo({
								scrollTop: 99999,
								duration: 0, //小程序如果有滚动效果 input的焦点也会随着页面滚动...
							});
						}, 150)
					}
					// #endif

					// #ifndef MP-WEIXIN
					uni.pageScrollTo({
						scrollTop: 99999,
						duration: 100
					});
					// #endif

					if (this.showFunBtn) {
						this.showFunBtn = false;
					}

					// #ifdef MP-WEIXIN 
					if (params.contentType == 1) {
						this.mpInputMargin = true;
					}
					// #endif
					//h5浏览器并没有很好的办法控制键盘一直处于唤起状态 而且会有样式性的问题
					// #ifdef H5
					uni.hideKeyboard();
					// #endif
				});
			},
			//用户触摸屏幕的时候隐藏键盘、更多功能、表情
			touchstart() {
				uni.hideKeyboard();
				this.hideEmoji = false;
				this.showFunBtn = false;
				this.hideDrawer(); // 关闭抽屉
			},
			// userid 用户id
			linkToBusinessCard(userId) {
				this.$u.route({
					url: 'pages/businessCard/businessCard',
					params: {
						userId
					}
				});
			},
			//准备开始录音
			startVoice(e) {
				console.log('准备开始录音');
				if (!this.Audio.paused) {
					//如果音频正在播放 先暂停。
					this.stopAudio(this.AudioExam)
				}
				this.recording = true;
				this.isStopVoice = false;
				this.canSend = true;
				this.voiceIconText = "正在录音..."
				this.PointY = e.touches[0].clientY;
				this.Recorder.start({
					format: 'mp3'
				});
			},
			//录音已经开始
			beginVoice() {
				console.log('录音已经开始');
				if (this.isStopVoice) {
					this.Recorder.stop();
					return;
				}
				this.voiceTitle = '松开 结束'
				this.voiceInterval = setInterval(() => {
					this.voiceTime++;
				}, 1000)
			},
			//move 正在录音中
			moveVoice(e) {
				console.log('正在录音中');
				const PointY = e.touches[0].clientY
				const slideY = this.PointY - PointY;
				if (slideY > uni.upx2px(120)) {
					this.canSend = false;
					this.voiceIconText = '松开手指 取消发送 '
				} else if (slideY > uni.upx2px(60)) {
					this.canSend = true;
					this.voiceIconText = '手指上滑 取消发送 '
				} else {
					this.voiceIconText = '正在录音... '
				}
			},
			//结束录音
			endVoice() {
				console.log('结束录音');
				this.isStopVoice = true; //加锁 确保已经结束录音并不会录制
				this.Recorder.stop();
				this.recording = false;
				this.voiceTitle = '按住 说话'
			},
			//录音被打断
			cancelVoice(e) {
				console.log('录音被打断');
				this.voiceTime = 0;
				this.voiceTitle = '按住 说话';
				this.canSend = false;
				this.recording = false;
				this.Recorder.stop();
			},
			//处理录音文件
			handleRecorder({
				tempFilePath,
				duration
			}) {
				let contentDuration;
				// #ifdef MP-WEIXIN
				this.voiceTime = 0;
				if (duration < 600) {
					this.voiceIconText = "说话时间过短";
					setTimeout(() => {
						this.recording = false;
					}, 200)
					return;
				}
				contentDuration = duration / 1000;
				// #endif

				// #ifdef APP-PLUS
				contentDuration = this.voiceTime + 1;
				this.voiceTime = 0;
				if (contentDuration <= 0) {
					this.voiceIconText = "说话时间过短";
					setTimeout(() => {
						this.recording = false;
					}, 200)
					return;
				};
				// #endif

				this.recording = false;
				const params = {
					contentType: 2,
					content: tempFilePath,
					contentDuration: Math.ceil(contentDuration)
				};
				this.canSend && this.sendMsg(params);
			},
			//控制播放还是暂停音频文件
			handleAudio(item) {
				this.AudioExam = item;
				this.Audio.paused ? this.playAudio(item) : this.stopAudio(item);
			},
			//播放音频
			playAudio(item) {
				this.Audio.src = item.content;
				this.Audio.hasBeenSentId = item.hasBeenSentId;
				this.Audio.play();
				item.anmitionPlay = true;
			},
			//停止音频
			stopAudio(item) {
				item.anmitionPlay = false;
				this.Audio.src = '';
				this.Audio.stop();
			},
			//关闭动画
			closeAnmition() {
				const hasBeenSentId = this.Audio.hasBeenSentId;
				const item = this.messageList.find(it => it.hasBeenSentId == hasBeenSentId);
				item.anmitionPlay = false;
			},
			//添加表情
			clickEmoji(page) {
				// '/static/img/emoji/'+page.url
				// this.formData.content += page.alt;
				this.editorCtx.insertImage({
					src: '../../../static/images/chat/emoji/' + page.url,
					alt: page.alt,
					width: 20,
					height: 20,
					extClass: 'emojiIamge',
					success: function() {
						console.log('insert image success')
					}
				})

			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			/*textareaFocus(){
			    this.hideEmoji = false;
			    this.showFunBtn = false;
			},*/
			//点击宫格时触发
			clickGrid(index) {
				if (index == 0) {
					this.chooseImage(['album'])
				} else if (index == 1) {
					this.chooseImage(['camera'])
				}
			},
			//发送图片
			chooseImage(sourceType) {
				uni.chooseImage({
					sourceType,
					sizeType: ['compressed'],
					success: res => {
						this.showFunBtn = false;
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							const params = {
								contentType: 3,
								content: res.tempFilePaths[i],
							};
							this.sendMsg(params)
						}
					}
				})
			},
			//查看大图
			viewImg(imgList) {
				uni.previewImage({
					urls: imgList,
				});
			},
		},
		onPageScroll(e) {

		},
		onNavigationBarButtonTap() {
			//返回按钮
			this.$u.route({
					type: 'switchTab',
					url: this.backLocation
			});
		},
		//返回按钮事件
		onBackPress(e) {
			this.$u.route({
					type: 'switchTab',
					url: this.backLocation
			});
			return true;
		},
		onLoad(option) {
			var data = option.data;
			var dataJson = JSON.parse(data);
			this.backLocation = dataJson.backLocation;
			uni.setNavigationBarTitle({
					title: dataJson.relationUserRemark
			});
			this.loginUser = uni.getStorageSync('user');
		},
		onReady() {
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/ui/chat/message/chatUserMessage.scss'
</style>