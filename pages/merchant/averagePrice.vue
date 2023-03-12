<template>
	<view class="averagePricePage">
		<view class="flex searchBox">
			<u-search placeholder="搜索农产品"
				:showAction="false"
				v-model="keyword" />
			<u-button @click="handleSearch"
				:customStyle="{ 'width': '20%','border-radius':'30rpx','margin-left':'10rpx','margin-right':'20rpx','background-color':'#01a252','color':'#fff','height':'70rpx' }"
				text="搜索"></u-button>
		</view>
		<view style="position: relative;top:130rpx">
			<u-list>
				<u-list-item v-for="(item, index) in goods"
					:key="index">
					<view class="listItem flexSpace">
						<view>
							<text class="block">{{item.name}}</text>
							<text class="block">{{item.address}}</text>
						</view>
						<view>
							<text class="block" style="text-align: right;">{{item.price}}</text>
							<text class="block" style="text-align: right;">{{item.date}}</text>
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>
<script>
	import {getMarket,marketSearch} from '@/config/api.js';
	export default {
		data() {
			return {
				goods: [],
				page: 0,
				keyword: '',
				isSearchBottom:false
			}
		},
		async onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				const params = {
					page: ++this.page,
				}
				const res = await getMarket(params)
				this.goods = [...this.goods, ...res.market.data]
			},
			async handleSearch(){
				this.page = 0;
				this.isSearchBottom = true;
				this.getSearchData();
				this.goods = [];
			},
			async getSearchData(){
				const params = {
					keyword: this.keyword,
					current_page:++this.page,
				}
				const res = await marketSearch(params)
				this.goods = [...this.goods, ...res.data]
			},
			async onReachBottom() {
				if(this.isSearchBottom){
					this.getSearchData()
				}else{
					this.getData()
				}
			}
		}
	}
</script>
<style scoped
	lang="scss">
	.averagePricePage {
		background-color: #f6f6f6;
		min-height: 100vh;
		height: 100%;
	}

	.listItem {
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;
		padding: 15rpx;
		background-color: #fff;
		border-radius: 15rpx;
	}

	.listItem:not(:last-of-type) {
		margin-bottom: 15rpx;
	}

	.block {
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
