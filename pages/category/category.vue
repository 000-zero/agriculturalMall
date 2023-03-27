<template>
	<view class="categoryPage">
		<!-- 头部 -->
		<view class="flex"
			@click='goSearch'
			style="margin-left: 15rpx;position: fixed;z-index: 2;width: calc(100vw - 15rpx);background-color: #fff;z-index: 9;">
			<u-search placeholder="请输入"
				:showAction="false"
				v-model="keyword"></u-search>
			<!-- 			<u-button
				:customStyle=全部"{ 'width': '20%','border-radius':'30rpx','margin-left':'10rpx','background-color':'#01a252','color':'#fff','height':'70rpx' }"
				text="搜索"></u-button> -->
		</view>
		<!-- 购物车选择 -->
		<view style="z-index: -1;padding-top: 82rpx">
			<!-- 左侧 -->
			<view class="left">
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
			<view style="margin-top: 10rpx;margin-left: 190rpx;">
				<view v-for="(item,index) in goods">
					<navigator class="flex"
						:url="`/pages/goods/goodsDetail?id=${item.id}`">
						<view style="flex:1;margin-right: 15rpx;">
							<image style="height: 200rpx;"
								mode="heightFix"
								:src="item.cover1"></image>
						</view>
						<view style="flex:3">
							<view class="flex">
								<u-tag type="success"
									text="A级" />
								<text class="ellipsis"
									style="margin-left: 10rpx;width: 250rpx;">{{item.title}}</text>
							</view>
							<text class="place_pro">{{item.place_pro}}</text>
							<view class="flexSpace"
								style="color: #f37782;font-size: 40rpx;">
								<text>{{item.price}}</text>
							</view>
						</view>
					</navigator>
					<view @click="addCart(item.id,index)" style="position: relative;top: -40rpx;">
						<view  style="position: absolute;top: -25rpx;right: 10rpx;z-index: 2;">
							<u-badge numberType="limit"
								max="99"
								:value="tempCartNum[index]" />
						</view>
						<view style="position: absolute;top: -10rpx;right: 25rpx;z-index: 1;">
							<i class="iconfont icon-plus-circle-fill"
								style="color: #3aac66;height: 40rpx;" />
						</view>
					</view>
					<u-divider />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		category,addCart
	} from '@/config/api.js';
	export default {
		data() {
			return {
				keyword: '',
				goods: [],
				page: 1,
				category_id: null,
				selecedListItem: 0,
				indexList: ['全部', '蔬菜', '水果', '水产', '农副加工', '花草树木', '柴米油盐'],
				tempCartNum:[],
				categoryTitle:null
			}
		},
		async onLoad(option) {
			this.getData()
			if(option){
				this.categoryTitle = this.indexList.indexOf(option.title)
				this.selecedListItem = this.categoryTitle
				this.handleListItem(this.selecedListItem)
				this.getData()
			}
		},
		methods: {
			async handleListItem(index) {
				this.selecedListItem = index;
				if (index == 0) this.category_id = undefined;
				if (index == 1) this.category_id = 2;
				if (index == 2) this.category_id = 3;
				if (index == 3) this.category_id = 6;
				if (index == 4) this.category_id = 5;
				if (index == 5) this.category_id = 7;
				if (index == 6) this.category_id = 4;
				this.page = 1;
				this.goods = [];
				this.getData();
			},
			goSearch() {
				uni.$u.route({
					url: 'pages/category/search',
				})
			},
			async getData() {
				const params = {
					page: this.page,
					category_id: this.category_id
				}
				const res = await category(params)
				this.goods = [...this.goods, ...res.goods.data]
				
				for(let goodsItem of this.goods){
					this.tempCartNum.push(goodsItem.cartNum)
				}
			},
			onReachBottom() {
				this.page += 1
				this.getData()
			},
			async addCart(id,index) {
				// if (!this.$u.utils.isLogin()) {} 
				// 准备参数
				const params = {
					goods_id: id
				}
				// 发送请求
				const res = await addCart(params)
				this.getData()
				this.tempCartNum[index] = this.tempCartNum[index] + 1;
			},
		}
	}
</script>
<style scoped
	lang="scss">
	.categoryPage {
		position: relative;
		margin-right: 15rpx;
	}

	.left {
		position: fixed;
		background-color: #f7f7f7;
		width: 180rpx;
		height: 100vh;
	}

	.listItemActive {
		background-color: #fff;
	}

	.place_pro {
		color: #868686;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 340rpx;
		display: block;
		white-space: nowrap;
	}
</style>
