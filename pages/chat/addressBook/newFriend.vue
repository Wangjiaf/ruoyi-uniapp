<template>
	<view class="u-page" style="background-color: #ffffff; margin-left: 4px; margin-right: 4px;">
		<u-form labelPosition="left" :model="subForm" :rules="rules" ref="uForm">
			<u-form-item label="好友账号" labelWidth='70' prop="friendUserName" borderBottom ref="itemUserName">
				<u-input v-model="subForm.friendUserName" border="none" placeholder="请输入好友账号"></u-input>
			</u-form-item>
			<u-button type="primary" @click="subFun" text="添加"></u-button>
		</u-form>
	</view>
</template>

<script>
	import {
		addFriend
	} from "@/api/chat/chatUserRelation.js";
	export default {
		data() {
			return {
				subForm: {
					friendUserName: null,
				},
				rules: {
					'friendUserName': {
						type: 'string',
						required: true,
						message: '请填写好友账号',
						trigger: ['blur', 'change']
					},
				},
			};
		},
		methods: {
			subFun() {
				this.$refs["uForm"].validate().then(valid => {
				  if (valid) {
						addFriend(this.subForm).then(res => {
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