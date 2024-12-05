<template>
	<view class="u-page" style="background-color: #ffffff; margin-left: 4px; margin-right: 4px;">
		<u-form labelPosition="left" :model="subForm" :rules="rules" ref="uForm">
			<u-form-item label="用户账号" labelWidth='70' prop="userName" borderBottom ref="itemUserName">
				<u-input v-model="subForm.userName" border="none" placeholder="请输入用户账号"></u-input>
			</u-form-item>
			<u-button type="primary" @click="subFun" text="添加"></u-button>
		</u-form>
	</view>
</template>

<script>
	import {
		addGroupUser
	} from "@/api/chat/chatGroupUser.js";
	export default {
		data() {
			return {
				subForm: {
					groupId: null,
					userName: null,
				},
				rules: {
					'userName': {
						type: 'string',
						required: true,
						message: '请填写用户账号',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		onLoad(option) {
			var data = option.data;
			var dataJson = JSON.parse(data);
			uni.setNavigationBarTitle({
				title: dataJson.groupName
			});
			this.subForm.groupId = dataJson.groupId;
		},
		methods: {
			subFun() {
				this.$refs["uForm"].validate().then(valid => {
				  if (valid) {
						addGroupUser(this.subForm).then(res => {
							if (!200 == res.code) {
								this.$modal.msgError(res.msg);
							} else {
								this.$modal.msgSuccess('添加成功');
							}
						});
					}
				});
			}
		},
	}
</script>

<style>
</style>