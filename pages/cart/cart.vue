<template>
	<view class="cardPage">
		<view class="checkboxGoods">
			<u-checkbox-group placement="column"
				shape='circle'>
				<view class="flex cartItemBox">
					<u-checkbox />
					<image style="width: 150rpx;max-height: 200px;margin-right: 10rpx;"
						mode="widthFix"
						src="https://image.guo68.com/2019-09-28/93ad6f3d47f37c4c1ec62ca132989809.jpg.400_280_thumb.jpg">
						<view style="width: 100%;">
							<view class="flex">
								<u-tag type="success"
									text="A级" />
								<text style="margin-left: 10rpx;">苹果（中)</text>
							</view>
							<text style="display: block;">1份/约500g</text>
							<view class="flexSpace">
								<text>￥6.0</text>
								<view>
									<u-number-box />
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
					<text class="price">￥66</text>
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
	export default {
		data() {
			return {
				radioValue: 'false'
			}
		},
		methods: {
			async if_allCheck() {
				this.radioValue = this.radioValue ? false : true
				console.log('sda', this.radioValue)
			}
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
