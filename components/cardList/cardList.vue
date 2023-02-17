<template>
	<view class="falls">
		<view class="column">
			<view class="columnItem"
				v-for="columnItem1 in splitData.column1">
				<image mode="widthFix"
					class="img"
					:src="columnItem1.src" />
				<view class="flexSpace mt10"
					style="padding-left: 10rpx;padding-right: 5rpx;">
					<u-tag text="A级" />
					<text style="margin-left: 10rpx;">苹果（中） 1份/约500g</text>
				</view>
			</view>
		</view>
		<view class="column">
			<view class="columnItem"
				v-for="columnItem2 in splitData.column2">
				<image mode="widthFix"
					class="img"
					:src="columnItem2.src" />
				<view class="flexSpace mt10"
					style="padding-left: 5rpx;padding-right: 5rpx;">
					<u-tag text="A级" />
					<text style="margin-left: 10rpx;">苹果（中） 1份/约500g</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "cardList",
		// mounted() {
		// 	console.log('sd', this.splitData.column1[0].src)
		// },
		data() {
			return {
				cardListData: [{
					src: 'https://cdn.pixabay.com/photo/2023/01/14/22/23/geometric-7719159_640.png',
				}, {
					src: 'https://cdn.pixabay.com/photo/2023/01/22/23/59/couple-7737589_640.png'
				}, {
					src: 'https://cdn.pixabay.com/photo/2023/01/14/22/23/geometric-7719159_640.png',
				}, {
					src: 'https://cdn.pixabay.com/photo/2023/01/22/23/59/couple-7737589_640.png'
				}]
			};
		},
		computed: {
			splitData() {
				return this.shunt(this.cardListData)
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
		
		.columnItem:nth-child(n+2){
			margin-top: 20rpx;
		}

		.img {
			width: 100%;
		}
	}

	.column:not(:last-of-type) {
		margin-right: 10rpx;
	}
</style>
