<template>
	<view class="pages">
		<view class="text">
			退款理由：
		</view>
		<u--textarea v-model="value1"
			:height='120'
			placeholder="请输入内容"/>
		<view class="btn">
			<u-button
				:hair-line="false"
				:ripple="true"
				type='primary'
				size="medium"
				@click='handleSubmit'
				class="btn">申请退货</u-button>
		</view>
	</view>
</template>
<script>
	import {
		returnReson
	} from '@/config/api.js';
	export default {
		data() {
			return {
				value1: '',
				orders_id:null
			}
		},
		onLoad(option){
			this.orders_id = option.orders_id
		},
		methods: {
			async handleSubmit(){
				const params = {
					orders_id: this.orders_id,
					reason:this.value1
				}
				await returnReson(params).then(res =>{
					uni.showToast({
						title: '申请成功',
						duration: 1500
					});
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				})
			}
		}
	}
</script>
<style scoped
	lang="scss">
	.pages {
		height: 100vh;
		padding-left: 15rpx;
		padding-right: 15rpx;
		background-color: #f6f6f6;
		position: relative;
	}
	
	.text{
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
	
	.btn{
		width: calc(100vw - 30rpx);
		position: absolute;
		bottom: 60rpx;
	}
</style>
