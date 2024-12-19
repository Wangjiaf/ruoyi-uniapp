<template>
	<view class="u-page" style="background-color: #ffffff; margin-left: 4px; margin-right: 4px;">
		<u-form labelPosition="left">
			<u-form-item label="IC卡内容" labelWidth='90' borderBottom>
				<u-input v-model="cardInfo" border="none"></u-input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardInfo: null,
			};
		},
		onShow() {
			this.$nfc.readNFC(this.nfcListen);
		},
		methods: {
			nfcListen(code) {
				this.cardInfo = code;
			}
		},
	}
</script>

<style>
</style>