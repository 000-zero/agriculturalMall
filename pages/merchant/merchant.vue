<template>
	<view class="merchant">
		<view class="head">
			<text class="block">已完成订单：6单</text>
			<text class="block">退单数量：6单</text>
		</view>
		<view class="order flexAlignCenter">
			<template v-for="item in orderStatus">
				<view class="flexColumnCenter"
					@click="goOrder">
					<view :class='"iconfont " + item.icon'
						style="font-size: 70rpx;color: #3fd72c;" />
					<view>{{item.name}}</view>
				</view>
			</template>
		</view>
		<button class="btn1" @click="goAveragePrice">查看地区农产品均价</button>
		<button class="btn1" @click="goGrounding">上架商品</button>
		<u-divider text="我的商品" />
		<view class="flexSpace goodsInf" v-for="item in goodsList">
			<view class="flex">
				<image mode='widthFix'
					style="width: 200rpx;"
					:src="item.cover1" />
				<view class="flexSpace"
					style="flex-direction: column;margin-left: 15rpx;">
					<text class="block ellipsis">{{item.title}}</text>
					<text class="block ellipsis">{{item.price}}</text>
				</view>
			</view>
			<view>
				<button class="btn">编辑</button>
				<button class="btn">下架</button>
			</view>
		</view>
	</view>
</template>
<script>
	import {merchantGoods} from '@/config/api.js';
	export default {
		data() {
			return {
				orderStatus: [{
					icon: 'icon-jinhangzhong',
					name: '进行中'
				}, {
					icon: 'icon-tuikuan',
					name: '退款/售后'
				}, {
					icon: 'icon-moban',
					name: '全部订单'
				}],
				goodsList:[]
			}
		},
		async onShow() {
			this.getData()
		},
		methods: {
			goAveragePrice(){
				uni.$u.route({
					url: 'pages/merchant/averagePrice',
				})
			},
			goGrounding(){
				uni.$u.route({
					url: 'pages/merchant/grounding',
				})
			},
			async getData(){
				const params = {
					farmers_id: 2,
				}
				const res = await merchantGoods(params)
				this.goodsList = res.data
			}
		}
	}
</script>
<style scoped
	lang="scss">
	.merchant {
		padding-left: 15rpx;
		padding-right: 15rpx;
		background-color: #f6f6f6;
		min-height: 100vh;
		height: 100%;

		.head {
			border-radius: 30rpx;
			background-color: #fff;
			padding: 15rpx;
		}

		.block {
			display: block;
			font-size: 40rpx;
		}

		.block:not(:last-of-type) {
			margin-bottom: 15rpx;
		}

		.order {
			width: calc(100% - 30rpx);
			height: 150rpx;
			margin-top: 30rpx;
			background-color: #fff;
			justify-content: space-around;
			border-radius: 30rpx;
			padding-left: 15rpx;
			padding-right: 15rpx;
			margin-bottom: 15rpx;
		}
		
		.ellipsis{
			width: 250rpx;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		
		.goodsInf{
			padding: 15rpx;
			background-color: #fff;
			border-radius: 15rpx;
		}
		
		.btn{
			border-radius: 30rpx;
			width: 150rpx;
			hieght:80rpx;
		}
		.btn:not(:last-of-type){
			margin-bottom: 10rpx;
		}
		
		.btn1{
			background-color: #3fd72c;
			border-radius: 30rpx;
			margin-bottom: 15rpx;
		}
	}
</style>
