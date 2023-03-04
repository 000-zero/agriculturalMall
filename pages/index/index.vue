<template>
	<view class="indexPage">
		<u-swiper radius="10"
			height="150"
			class="swiper"
			:list="swiperList"
			indicator
			indicatorMode="dot" />
		<view style="margin-top: 10rpx;">
			<u-grid col='4'>
				<u-grid-item :customStyle="{ 'margin-bottom': '20rpx' }"
					v-for="(optionItem,optionIndex) in optionList">
					<view :class='"iconfont " + optionItem.icon'
						style="font-size: 70rpx;color: #3fd72c;" />
					<text>{{optionItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<cardList :item="goods"/>
	</view>
</template>
<script>
	import {getindex} from '@/config/api.js';
	export default {
		data() {
			return {
				page: 1,
				swiperList: ['https://image.cnhnb.com/image/jpg/head/2022/06/19/3c12459dd0304346ac0257fd9aed34c7.jpg?imageView2/1/w/525/h/525/format/jpg/interlace/1/quality/100/ignore-error/1',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png'
				],
				goods: [],
				optionList: [{
					name: 'photo',
					title: '全部',
					icon:'icon-quanbu'
				}, {
					name: 'lock',
					title: '蔬菜',
					icon:'icon-shucai'
				}, {
					name: 'star',
					title: '水果',
					icon:'icon-alishangchuan-'
				}, {
					name: 'photo',
					title: '水产',
					icon:'icon-shuichanhaixian'
				}, {
					name: 'lock',
					title: '农副加工',
					icon:'icon-29gongyegongcheng_jiagonggongyi:before '
				}, {
					name: 'star',
					title: '中药材',
					icon:'icon-caoyao'
				}, {
					name: 'star',
					title: '柴米油盐',
					icon:'icon-liangyoumimian'
				}, {
					name: 'star',
					title: '其它',
					icon:'icon-qita'
				}]
			};
		},
		async onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				const params = {
					page: this.page,
				}
				const res = await getindex(params)
				this.goods = [...this.goods, ...res.goods.data]
			}
		},
		onReachBottom() {
			this.page += 1
			this.getData()
		}
	};
</script>
<style scoped
	lang="scss">
	.indexPage {
		margin-left: 15rpx;
		margin-right: 15rpx;
		padding-bottom: 10rpx;
		/* margin-bottom: 10; */
	}
</style>
