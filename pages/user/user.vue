<template>
	<view class="userPage">
		<view class="flexAlignCenter">
			<u-avatar size="50" />
			<text style="margin-left: 20rpx;font-size: 40rpx;">手机/用户名字</text>
		</view>
		<view class="order flexAlignCenter">
			<template v-for="item in orderStatus">
				<view class="flexColumnCenter" @click="goOrder">
					<view :class='"iconfont " + item.icon'
						style="font-size: 70rpx;color: #3fd72c;" />
					<view>{{item.name}}</view>
				</view>
			</template>
		</view>
		<!-- 推荐功能 -->
		<view class="recommendFun flex">
			<view class="flexColumnCenter"
				@click="goAddress">
				<view class='iconfont icon-location'
					style="font-size: 70rpx;color: #3fd72c;" />
				<view>收获地址</view>
			</view>
			<view class="flexColumnCenter">
				<view class='iconfont icon-addteam'
					style="font-size: 70rpx;color: #3fd72c;" />
				<view>企业购</view>
			</view>
			<view class="flexColumnCenter" @click="goMerchant">
				<view class='iconfont icon-addteam'
					style="font-size: 70rpx;color: #3fd72c;" />
				<view>我是商家</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				orderStatus: [{
					icon: 'icon-dengdaizhifu',
					name: '待支付'
				}, {
					icon: 'icon-jinhangzhong',
					name: '进行中'
				}, {
					icon: 'icon-daipingjia',
					name: '待评价'
				}, {
					icon: 'icon-tuikuan',
					name: '退款/售后'
				}, {
					icon: 'icon-moban',
					name: '全部订单'
				}]
			}
		},
		methods: {
			goAddress() {
				uni.$u.route({
					url: 'pages/address/address',
				})
			},
			goOrder(){
				uni.$u.route({
					url: 'pages/order/order',
				})
			},
			goMerchant(){
				uni.$u.route({
					url: 'pages/merchant/merchant',
				})
			}
		}
	}
</script>
<style scoped
	lang="scss">
	.userPage {
		background-color: #f6f6f6;
		height: 100vh;
		padding: 20rpx 20rpx 0 20rpx;

		.order {
			width: calc(100% - 30rpx);
			height: 150rpx;
			margin-top: 30rpx;
			background-color: #fff;
			justify-content: space-around;
			border-radius: 30rpx;
			padding-left: 15rpx;
			padding-right: 15rpx;
		}

		.recommendFun {
			justify-content: space-around;
			margin-top: 20rpx;
			width: calc(100% - 30rpx);
			margin-top: 30rpx;
			background-color: #fff;
			border-radius: 30rpx;
			padding: 15rpx;
		}
	}
</style>
