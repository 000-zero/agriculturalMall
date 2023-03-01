<template>
	<view class="goodsDetailPage">
		<u-swiper radius="10"
			height="150"
			class="swiper"
			:list="swiperList"
			indicator
			indicatorMode="dot" />
		<view style="background-color: #fff;border-radius: 30rpx;margin-top: 20rpx;padding: 10rpx;">
			<view class="price">{{price}}</view>
			<view>{{title}}</view>
		</view>
		<u-divider text="商品详情"/>
		<view  style="background-color: #fff;border-radius: 30rpx;margin-top: 20rpx;padding: 10rpx;">
			<text>货品描述</text>
			<view>{{detail}}</view>
		</view>
	</view>
</template>
<script>
	import {
		getGoodsDetail
	} from "@/config/api.js"
	export default {
		data() {
			return {
				goods_id: null,
				title: null,
				price: null,
				swiperList: [],
				detail:null
			}
		},
		onLoad(option) {
			this.goods_id = option.id
			console.log("id", option.id)
			this.getData()
		},
		methods: {
			async getData() {
				const params = {}
				params.goods = this.goods_id
				const res = await getGoodsDetail(params)
				this.swiperList = [res.data.cover1, res.data.cover2, res.data.cover3]
				this.title = res.data.title
				this.price = res.data.price
				this.detail = res.data.detail
				console.log("testzky", res)
			}
		}
	}
</script>
<style scoped
	lang="scss">
	.goodsDetailPage {
		background-color: #f6f6f6;
		margin-left: 15rpx;
		margin-right: 15rpx;
		padding-bottom: 10rpx;
		min-height: 100vh;
		height: 100%;
	}

	.ellipsis {
		width: 250rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.price {
		font-size: 40rpx;
		margin-bottom: 15rpx;
		color: red;
	}
</style>
