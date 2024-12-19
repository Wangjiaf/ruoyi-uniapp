<template> <u-grid :col="4">
		<u-grid-item @click="goto('/pages/mine/demo/icCard')">
			<u-icon name="../../../static/images/demo/miCard.png" :size="60"></u-icon>
			<view class="grid-text">IC卡</view>
		</u-grid-item>
		<u-grid-item @click="goto('/pages/mine/demo/miCard')">
			<u-icon name="../../../static/images/demo/miCard.png" :size="60"></u-icon>
			<view class="grid-text">MI卡</view>
		</u-grid-item>
		<u-grid-item @click="goto('/pages/mine/demo/qrCode')">
			<u-icon name="../../../static/images/demo/miCard.png" :size="60"></u-icon>
			<view class="grid-text">二维码</view>
		</u-grid-item>
	</u-grid>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			goto(urls) {
				uni.navigateTo({
					url: urls
				});
			}
		}
	}
</script>
<style lang="scss">
	.grid-text {
		font-size: 14px;
		color: #000000;
		padding: 10rpx 0 20rpx 0rpx;
	}
</style>