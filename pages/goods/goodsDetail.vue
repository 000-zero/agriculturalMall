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
		<!-- 提交订单栏 -->
		<view class="navigation">
			<view class="left">
				<view class="item collect" @tap="collect">
					<u-icon v-if="!collectNum" name="heart" size="28" :color="$u.color['contentColor']"></u-icon>
					<u-icon v-else name="heart-fill" :size="28" color="#2979ff"></u-icon>
					<view class="text u-line-1">{{collectNum?"已收藏":"收藏"}}</view>
				</view>
				<view class="item" @tap="toCart">
					<view class="box">
						<u-badge :value="cartNum" absolute :offset="[-9, -10]" :type="type"></u-badge>
					</view>
					<u-icon name="shopping-cart" :size="28" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<u-button class="cart btn" @click="addCart" :ripple="true"
					type="primary">加入购物车</u-button>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getGoodsDetail,addCart,cartGoods
	} from "@/config/api.js"
	export default {
		data() {
			return {
				goods_id: null,
				title: null,
				price: null,
				swiperList: [],
				detail:null,
				cartNum: 0,
				type: "warning",
			}
		},
		onLoad(option) {
			this.goods_id = option.id
			console.log("id", option.id)
			this.getData()
			this.cartLen()
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
			},
			async addCart(){
				// if (!this.$u.utils.isLogin()) {} 
				// 准备参数
				const params = {
					goods_id: this.goods_id
				}
				// 发送请求
				const res = await addCart(params)
				this.cartNum++
			},
			async cartLen() {
				// 如果登录成功在调用这个接口
				const params = {
					include: "goods"
				}
				// 获取购物车商品数量
				const res = await cartGoods(params)
				// 累加总的商品数量
				this.cartNum = res.data.reduce((pre, item) => {
					return parseInt(pre) + parseInt(item.num);
				}, 0)
				// if (this.vuex_token) {

				// }
			},
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
	
	.navigation {
		position: fixed;
		bottom: -6px;
		left: 0;
		right: 0;
		display: flex;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		justify-content: space-between;
	
		.left {
			flex: 3;
			display: flex;
			font-size: 20rpx;
			align-items: flex-end;
			justify-content: space-around;
	
			.collect {
				position: absolute;
				bottom: 0;
			}
	
			.item {
				position: relative;
	
			}
		}
	
		.right {
			flex: 9;
			display: flex;
			font-size: 28rpx;
			justify-content: flex-end;
			align-items: center;
	
			.btn {
				text-align: center;
				line-height: 66rpx;
				width: 90%;
				border-radius: 10rpx;
				color: #ffffff;
			}
	
			.cart {
				background-color: #2979ff;
				margin-right: 30rpx;
			}
	
			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
