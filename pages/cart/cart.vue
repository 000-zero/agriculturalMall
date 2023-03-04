<template>
	<view class="cardPage">
		<view class="checkboxGoods" v-for="item in goodsList">
			<u-checkbox-group placement="column"
				shape='circle' @change="checkChange(item.id)">
				<view class="flex cartItemBox">
					<u-checkbox :checked="item.is_checked?true:false" :name="item.id" />
					<image style="width: 150rpx;max-height: 200px;margin-right: 10rpx;"
						mode="widthFix"
						:src="item.goods.cover1">
						<view style="width: 100%;">
							<view class="flex">
								<u-tag type="success"
									text="A级" />
								<text style="margin-left: 10rpx;width: 400rpx;" class="ellipsis">{{item.goods.title}}</text>
							</view>
							<!-- <text style="display: block;">1份/约500g</text> -->
							<view class="flexSpace">
								<text style="width: 200rpx;color: red;font-size: 35rpx;">{{item.goods.price}}</text>
								<view>
									<u-number-box v-model="item.num"/>
								</view>
								<u-icon name="trash"
									color="#e83333"
									size="36" />
							</view>
						</view>
				</view>
			</u-checkbox-group>
		</view>
		<!-- 结算 -->
		<view class="bottomFixed">
			<view class="checkbox">
				<u-checkbox-group placement="column"
					@change="if_allCheck">
					<u-checkbox label="全选"
						size="25"
						shape="circle" />
				</u-checkbox-group>
			</view>
			<view class="calculate_price u-flex-7 u-row-around">
				<view class="title_price">
					<text class="title">合计:</text>
					<text class="price">￥{{totalPrice}}</text>
				</view>
				<view class="button">
					<u-button type="primary"
						:ripple="true"
						shape="square"
						:disabled="totalPrice>0?false:true"
						@click="submit">去结算</u-button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		cartGoods,
		numChange,
		delCartGoods,
		isCheck,
		allCheck
	} from "@/config/api.js"
	export default {
		data() {
			return {
				radioValue: 'false',
				goodsList:[]
			}
		},
		computed: {
			// 选中商品的总价
			totalPrice() {
				return this.goodsList.filter((goods) => { //过滤掉没有选中商品
					if (goods.is_checked) {
						return true
					}
				}).reduce((pre, goods) => { //价格累加
					console.log('goods',goods.goods.price.slice(0,3))
					return parseInt(pre) + Number(goods.goods.price.slice(0,3)) * goods.num //乘商品数量
				}, 0)
			}
		},
		onShow() {
			this.getCartGoods()
			// if (this.$u.utils.isLogin()) {
			// 	this.getCartGoods()
			// }
		},
		methods: {
			async if_allCheck() {
				this.radioValue = this.radioValue ? false : true
			},
			async getCartGoods() {
				const params = {
					include: "goods"
				}
				const data = await cartGoods(params)
				this.goodsList = data.data
				console.log("this.goodsList",this.goodsList)
			},
			async checkChange(id) {
				await isCheck(id)
				console.log("id",id)
				this.getCartGoods()
			},
		}
	}
</script>
<style scoped
	lang="scss">
	.cardPage {
		min-height: 100vh;
		height: 100%;
		background-color: #f6f6f6;
		position: relative;

		.checkboxGoods {
			padding-top: 10rpx;
			padding-left: 15rpx;
			padding-right: 15rpx;
		}

		.cartItemBox {
			background-color: #fff;
			padding: 10rpx;
			border-radius: 30rpx;
		}

		.cartItemBox:not(:last-of-type) {
			margin-bottom: 15rpx;
		}

		.settlement {
			padding-left: 10rpx;
			padding-right: 10rpx;
			position: fixed;
			bottom: 30px;
			background-color: red;
			width: 100%;
			height: 100rpx;
		}
		
		.bottomFixed {
			display: flex;
			bottom: 0;
			padding: 7px;
			align-items: center;
			justify-content: space-around;
			position: fixed;
			left: 0;
			right: 0;
			background-color: #fff;
			
			.checkbox{
				flex: 5;
			}
			
			.calculate_price{
				display: flex;
				flex: 7;
				justify-content: space-around;
				align-items: center;
		
				.button{
					width: 90px;
				}
			}
		}
	}
</style>
