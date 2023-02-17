<template>
	<view class="categoryPage">
		<!-- 头部 -->
		<view class="flex"
			@click='goSearch'
			style="margin-left: 15rpx;margin-top: 10rpx;position: fixed;z-index: 2;width: calc(100vw - 15rpx);background-color: #fff;">
			<u-search placeholder="请输入"
				:showAction="false"
				v-model="keyword"></u-search>
			<!-- 			<u-button
				:customStyle="{ 'width': '20%','border-radius':'30rpx','margin-left':'10rpx','background-color':'#01a252','color':'#fff','height':'70rpx' }"
				text="搜索"></u-button> -->
		</view>
		<!-- 购物车选择 -->
		<view class="flexColumn"
			style="z-index: -1;padding-top: 82rpx;">
			<view style="display: flex;flex: 1;">
				<!-- 左侧 -->
				<view style="flex: 1;background-color: #f7f7f7;margin-top: 10rpx">
					<template v-for="(item, index) in indexList">
						<view :class="index === selecedListItem ? 'listItemActive' : '' "
							@click="handleListItem(index)"
							class="flexCenter"
							style="height:150rpx;">
							<text style="font-size: 30rpx;color: #737373;">{{item}}</text>
						</view>
					</template>
				</view>
				<!-- 右侧 -->
				<view style="flex:3;margin-top: 10rpx;height:calc(100vh - 100rpx);overflow:scroll;margin-left: 10rpx;">
					<view v-for="index in 10"
						class="flex">
						<image mode="widthFix"
							style="width: 180rpx;max-height: 200px;margin-right: 10rpx ;"
							src="../../static/logo.png">
							<view>
								<view class="flex">
									<u-tag type="success"
										text="A级" />
									<text style="margin-left: 10rpx;">苹果（中） 1份/约500g</text>
								</view>
								<text style="color: #868686;font-size: 24rpx;">果肉细腻柔软，口感丝般顺滑</text>
								<view class="flexSpace"
									style="color: #f37782;font-size: 40rpx;">
									<text>￥6.0</text>
									<view style="position: relative;">
										<view style="position: absolute;top: -22rpx;right: 10rpx;">
											<u-badge numberType="limit"
												max="99"
												value="6" />
										</view>
										<i class="iconfont icon-plus-circle-fill"
											style="color: #3aac66;height: 40rpx;" />
									</view>
								</view>
								<u-divider />
							</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				keyword: '',
				selecedListItem: 0,
				indexList: ['爆款推荐', '草莓/车厘子', '柑橘橙柚', '苹果蕉梨', '其它']
			}
		},
		methods: {
			handleListItem(index) {
				this.selecedListItem = index
			},
			goSearch() {
				uni.$u.route({
					url: 'pages/category/search',
				})
			}
		}
	}
</script>
<style scoped
	lang="scss">
	.categoryPage {
		position: relative;
		margin-right: 15rpx;
		// font-size: 30rpx;
		// border-radius: ;
		// background-color: gray;
	}

	.listItemActive {
		background-color: #fff;
	}
</style>
