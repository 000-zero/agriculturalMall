<template>
	<view class="searchPage">
		<view class="flex searchBox">
			<u-search placeholder="请输入"
				:showAction="false"
				v-model="keyword" />
			<u-button
				@click="handleSearch"
				:customStyle="{ 'width': '20%','border-radius':'30rpx','margin-left':'10rpx','margin-right':'20rpx','background-color':'#01a252','color':'#fff','height':'70rpx' }"
				text="搜索"></u-button>
		</view>
		<view class="hotSearch"
			v-if="isShowHotSearch">
			<text style="font-size: 36rpx;font-weight: 600;">热门搜索</text>
			<view class="flex" style="margin-top: 40rpx;">
				<view class='tag' v-for="item in tag">
					<u-tag @click='handleTag(item)' type='success' shape='circle' :text="item" />
				</view>
			</view>
		</view>
		<view class="searchResult" v-else>
			<cardList/>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isShowHotSearch: 'true',
				keyword: '',
				tag: ['苹果', '草莓', '菠萝', '西瓜', '榴莲']
			}
		},
		methods: {
			handleTag(value){
				this.keyword = value
			},
			async handleSearch(){
				this.isShowHotSearch = false
			}
		}
	}
</script>
<style scoped
	lang="scss">
	.searchPage {
		background-color: #f6f6f6;
		height: 100vh;
		min-height: 100vh;
		height: 100%;

		.searchBox {
			padding-left: 15rpx;
			padding-right: -30rpx;
			background-color: #fff;
			align-items: center;
			position: fixed;
			width: 100%;
			height: 100rpx;
		}

		.hotSearch {
			padding-left: 15rpx;
			padding-right: 15rpx;
			position: relative;
			top: 130rpx;
		}
		
		.tag:not(:last-of-type){
			margin-right: 30rpx;
		}
		
		.searchResult{
			position: relative;
			top: 130rpx;
			padding-left: 15rpx;
			padding-right: 15rpx;
		}
	}
</style>
