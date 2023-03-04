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
			<view v-if="isSearchNull">
				<u-empty mode="search" />
			</view>
			<cardList v-if="!isSearchNull" :item="goods"/>
		</view>
	</view>
</template>
<script>
	import {
		searchGoods
	} from '@/config/api.js';
	export default {
		data() {
			return {
				isShowHotSearch: 'true',
				keyword: '',
				isSearchNull:'true',
				page: 1,
				goods: [],
				tag: ['苹果', '草莓', '菠萝', '西瓜', '榴莲']
			}
		},
		methods: {
			handleTag(value){
				this.keyword = value
				this.handleSearch()
			},
			async handleSearch(){
				this.isShowHotSearch = false;
				this.getData();
				this.goods = [];
			},
			async getData(){
				const params = {
					keyword: this.keyword,
					current_page:this.page,
				}
				const res = await searchGoods(params)
				this.isSearchNull = res.data.length == 0 ? true : false;
				console.log("sd",this.isSearchNull)
				console.log("sd",this.isShowHotSearch)
				this.goods = [...this.goods, ...res.data]
			}
			,
			onReachBottom() {
				this.page += 1
				this.getData()
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
