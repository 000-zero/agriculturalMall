<template>
	<view class="falls">
		<view class="column">
			<view class="columnItem"
				v-for="columnItem1 in splitData.column1">
				<navigator class="goods-item"
					:url="`/pages/goods/goodsDetail?id=${columnItem1.id}`">
					<image mode="widthFix"
						class="img"
						:src="columnItem1.cover1" />
					<view class="flexSpace mt10"
						style="padding: 10rpx;">
						<u-tag text="A级" />
						<text  class="ellipsis"  style="margin-left: 10rpx;">{{columnItem1.title}} 1份/约500g</text>
					</view>
					<view class="flexSpace" style="padding: 10rpx;">
						<view class="price" style="white-space:nowrap">{{columnItem1.price}}</view>
						<view class="sales">{{columnItem1.sales}}</view>
					</view>
				</navigator>
			</view>
		</view>
		<view class="column">
			<view class="columnItem"
				v-for="columnItem2 in splitData.column2">
				<navigator class="goods-item"
					:url="`/pages/goods/goodsDetail?id=${columnItem2.id}`">
					<image mode="widthFix"
						class="img"
						:src="columnItem2.cover1" />
					<view class="flexSpace mt10"
						style="padding: 10rpx;">
						<u-tag text="A级" />
						<text class="ellipsis" style="margin-left: 10rpx;">{{columnItem2.title}} 1份/约500g</text>
					</view>
					<view class="flexSpace" style="padding: 10rpx;">
						<view class="price" style="white-space:nowrap">{{columnItem2.price}}</view>
						<view class="sales">{{columnItem2.sales}}</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "cardList",
		props: {
			item: {
				type: Array,
				default () {
					return {}
				}
			}
		},
		mounted() {
			console.log('item', this.item)
		},
		data() {
			return {};
		},
		computed: {
			splitData() {
				return this.shunt(this.item)
			}
		},
		methods: {
			shunt(data) {
				let column1 = [], //第一列
					column2 = [], //第二列
					i = 0;
				while (i < data.length) {
					column1.push(data[i++]);
					if (i < data.length) {
						column2.push(data[i++]);
					}
				}
				return {
					column1,
					column2
				}
			}
		},
	}
</script>
<style scoped
	lang="scss">
	.falls {
		width: 100%;
		display: flex; // 设置为Flex容器
		flex-direction: row; // 主轴方向设置为水平方向
	}

	.column {
		width: 50%;
		display: flex; // 设置为Flex容器
		flex-direction: column; // 主轴方向设置为垂直方向

		.columnItem {
			border-radius: 10rpx;
			padding-bottom: 10rpx;
			background-color: #fff;
			border: 1rpx solid #8498aa;
		}

		.columnItem:nth-child(n+2) {
			margin-top: 20rpx;
		}

		.img {
			width: 100%;
		}
	}
	
	.ellipsis {
		width: 250rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.column:not(:last-of-type) {
		margin-right: 10rpx;
	}
	
	.sales{
		font-size: 28rpx;
		color: #9f9f9f;
	}
	.price{
		font-size: 28rpx;
		color: red;
	}
</style>
