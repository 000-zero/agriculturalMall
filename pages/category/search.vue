<template>
	<view class="searchPage">
		<view class="flex searchBox">
			<u-search placeholder="请输入"
				:showAction="false"
				v-model="keyword"/>
			<u-button
				:customStyle="{ 'width': '20%','border-radius':'30rpx','margin-left':'10rpx','margin-right':'20rpx','background-color':'#01a252','color':'#fff','height':'70rpx' }"
				text="搜索"></u-button>
		</view>
		<view class="hotSearch" v-if="isShowHot">
			<text style="font-size: 36rpx;font-weight: 600;">热门搜索</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isShowHot: 'true'
			}
		},
		methods: {}
	}
</script>
<style scoped
	lang="scss">
	.searchPage {
		background-color: #f6f6f6;
		height: 100vh;
		width: 100vw;
		
		.searchBox{
			padding-left: 15rpx;
			padding-right: -30rpx;
			background-color: #fff;
			align-items: center;
			position: fixed;
			width: 100%;
			height: 100rpx;
			
		}
		
		.hotSearch{
			padding-left: 15rpx;
			padding-right: 15rpx;
			position: relative;
			top: 130rpx;
		}
	}
</style>
