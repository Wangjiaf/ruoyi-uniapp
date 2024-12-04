<template>
	<view class="u-page" style="background-color: #ffffff; margin-left: 4px; margin-right: 4px;">
		<u-form labelPosition="left" :model="subForm" :rules="rules" ref="uForm">
			<u-form-item label="群名称" labelWidth='70' prop="groupName" borderBottom ref="itemGroupName">
				<u-input v-model="subForm.groupName" border="none" placeholder="请输入群名称"></u-input>
			</u-form-item>
			<u-button type="primary" @click="subFun" text="提交"></u-button>
		</u-form>
	</view>
</template>

<script>
	import {
		addGroup
	} from "@/api/chat/chatGroup.js";
	export default {
		data() {
			return {
				subForm: {
					groupName: null,
				},
				rules: {
					'groupName': {
						type: 'string',
						required: true,
						message: '请填写群名称',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		methods: {
			subFun() {
				this.$refs["uForm"].validate().then(valid => {
				  if (valid) {
						addGroup(this.subForm).then(res => {
							if (!200 == res.code) {
								this.$modal.msgError(res.msg);
							} else {
								this.subForm.groupName = null;
								let self = this;
								uni.showModal({
									title: '提示',
									content: '创建成功！群号：' + res.msg,
									success: function (res) {
										if (res.confirm) {
											console.log('用户点击确定');
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
										self.goBack();
									}
								});
							}
						});
					}
				});
			},
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		},
	}
</script>

<style>
</style>