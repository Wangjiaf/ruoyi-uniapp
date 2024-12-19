<template>
	<view class="u-page" style="background-color: #ffffff; margin-left: 4px; margin-right: 4px;">
		<u-form labelPosition="left">
			<u-form-item label="二维码内容" labelWidth='90' borderBottom>
				<u-input v-model="qrCodeInfo" border="none"></u-input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrCodeInfo: null
			};
		},
		onLoad() {
			this.$scan.initScan(this.scanListen);
			this.$scan.startScan();
		},
		onUnload() {
			this.$scan.stopScan();
		},
		methods: {
			scanListen(code) {
				this.qrCodeInfo = code;
			}
		},
	}
</script>

<style>
</style>