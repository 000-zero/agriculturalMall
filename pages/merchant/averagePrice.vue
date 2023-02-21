<template>
	<view class="averagePricePage">
		<view class="flex searchBox">
			<u-search placeholder="搜索相关地区"
				:showAction="false"
				v-model="keyword" />
			<u-button @click="handleSearch"
				:customStyle="{ 'width': '20%','border-radius':'30rpx','margin-left':'10rpx','margin-right':'20rpx','background-color':'#01a252','color':'#fff','height':'70rpx' }"
				text="搜索"></u-button>
		</view>
		<view style="position: relative;top:130rpx">
			<u-list>
				<u-list-item v-for="(item, index) in 6" :key="index">
					<view class="listItem flexSpace">
						<view>
							<text class="block">水果名字</text>
							<text class="block">地区</text>
						</view>
						<text class="block">规格/价格</text>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		methods: {}
	}
</script>
<style scoped
	lang="scss">
	.averagePricePage{
		background-color: #f6f6f6;
		min-height: 100vh;
		height: 100%;
		
	}
	.listItem{
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;
		padding: 15rpx;
		background-color: #fff;
		border-radius: 15rpx;
	}
	
	.listItem:not(:last-of-type){
		margin-bottom: 15rpx;
	}
	
	.block{
		display: block;
	}
	
	.searchBox {
		padding-left: 15rpx;
		padding-right: -30rpx;
		background-color: #fff;
		align-items: center;
		position: fixed;
		width: 100%;
		height: 100rpx;
		z-index: 9;
	}
</style>
