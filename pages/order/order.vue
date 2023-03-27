<template>
	<view class="orderPage">
		<u-sticky bgColor="#fff">
			<u-tabs :list="tabs"
				:scrollable='false'
				:current='tabIndex'
				@click="clicktabs" />
		</u-sticky>
		<block v-if="length>0?true:false">
			<scroll-view scroll-y
				:lower-threshold="50"
				enable-flex='true'
				v-if="goodsList.length != 0"
				@scrolltolower="toLower">
				<view class="page-box u-p-l-20 u-p-r-20 u-p-t-10">
					<view class="thumb-box"
						v-for="(goods,index) in goodsList"
						:key="index">
						<view class="list">
							<view>订单序号: {{goods.id}}</view>
							<view>订单编号: {{goods.order_no}}</view>
							<view>下单时间: {{goods.created_at}}</view>
							<view>订单总价: {{goods.amount}}</view>
							<view class="flex">
								<u-button v-if="isPeasant ||  (!isPeasant && goods.status> 2) " @click="toInfo(goods.id)"
									:hair-line="false"
									:ripple="true"
									size="medium"
									class="btn">查看订单</u-button>
								<view v-else class="flex btnBox">
									<view>
										<u-button @click="toInfo(goods.id)"
											:hair-line="false"
											:ripple="true"
											type='primary'
											size="medium"
											class="btn">查看订单</u-button>
									</view>
									<view>
										<u-button @click="toDrawBack(goods.id)"
											:hair-line="false"
											:ripple="true"
											:customStyle="{ 'background-color': 'darkgrey' }"
											size="medium"
											class="btn">申请退款</u-button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<u-empty v-else
				mode="list" />
		</block>
		<view class="empty">
			<u-empty class="empty"
				icon-size="100px"
				:show="length>0?false:true"
				mode="list"></u-empty>
		</view>
	</view>
</template>
<script>
	import {
		ordersList,
		peasantOrders
	} from '@/config/api.js';
	export default {
		data() {
			return {
				tabs: [{
					name: '待支付'
				}, {
					name: '已支付'
				}, {
					name: '退款中'
				}, {
					name: '已退款'
				}, {
					name: '已收货'
				}],
				goodsList: [],
				current: 0,
				page: 1,
				isLast: false,
				length: 1,
				isPeasant: false,
				tabIndex: 0,
				peasantOrderList:[]
			}
		},
		onLoad(option) {
			this.tabIndex = option.index
			this.current = this.tabIndex
			if (option.peasantId) {
				this.isPeasant = true
				this.tabs = [{
					name: '进行中'
				}, {
					name: '退款/售后'
				}, {
					name: '已完成'
				}]
			}
			this.myOrders();
		},
		onShow() {
			this.myOrders()
		},
		methods: {
			async myOrders() {
				const params = {}
				params.current = this.current
				params.orderList = this.orderList
				if (this.current == 0) params.status = 1
				else if (this.current == 1) params.status = 2
				else if (this.current == 2) params.status = 3
				else if (this.current == 3) params.status = 4
				else if (this.current == 4) params.status = 5
				params.page = this.page
				if (!this.isPeasant) {
					const res = await ordersList(params)
					this.length = res.data.length
					this.goodsList = [...this.goodsList, ...res.data]
					if (res.data.length <= 0) {
						this.isLast = true
					}
				} else {
					params.orderList = this.$store.state.peasantOrderList
					const res = await peasantOrders(params)
					this.goodsList = [...this.goodsList, ...res.data]
					if (res.data.length <= 0) {
						this.isLast = true
					}
				}
			},
			clicktabs(item) {
				this.current = item.index
				this.page = 1
				this.goodsList = [],
					// console.log(this.current)
					this.myOrders()
			},
			toLower(e) {
				if (this.isLast) {
					this.$u.toast('已经到底了')
					return
				}
				this.page++;
				this.myOrders()
			},
			toInfo(data) {
				// #ifdef MP-WEIXIN
				uni.$u.vuex('orderID', data)
				// #endif
				let params = data
				uni.$u.route({
					url: "pages/order/orderDetails",
					params: {
						params
					}
				})
			},
			toDrawBack(goodId) {
				uni.navigateTo({
					url: `/pages/order/drawback?&&orders_id=${goodId}`,
				})
			}
		}
	}
</script>
<style>
	.orderPage {
		background-color: #f6f6f6;
		min-height: 100vh;
		height: 100%;
	}

	.top {
		position: fixed;
		/* #ifdef H5 */
		top: 43px;
		/* #endif */
		/* 	#ifdef MP-WEIXIN */
		top: 0px;
		/* #endif */
		z-index: 99;
		width: 100%;
		background-color: #ffffff;
		border-bottom: 1px solid #eee;
	}

	.empty {
		margin-top: 60%;
	}

	.btnBox {
		justify-content: space-around;
		width: 100%;
		margin-top: 15rpx;
	}

	.page-box {
		overflow: hidden;
		padding-left: 15px;
		padding-right: 15px;
		padding-top: 10px;
	}

	.thumb-box {
		display: flex;
		padding: 40rpx 30rpx;
		flex-direction: column;
		margin-top: 20rpx;
		background-color: #fff;
		border: 1px solid #eee;
	}

	.btn {
		width: 200rpx;
		line-height: 64rpx;
		border: 1px solid #2979ff;
		color: #2979ff;
		float: right;
	}
</style>
