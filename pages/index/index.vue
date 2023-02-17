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
					<image style="width: 100rpx;height: 100rpx;"
						src="https://cdn.uviewui.com/uview/swiper/swiper1.png" />
					<text>{{optionItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<cardList/>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				swiperList: ['https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png'
				],
				optionList: [{
					name: 'photo',
					title: '图片'
				}, {
					name: 'lock',
					title: '锁头'
				}, {
					name: 'star',
					title: '星星'
				}, {
					name: 'photo',
					title: '图片'
				}, {
					name: 'lock',
					title: '锁头'
				}, {
					name: 'star',
					title: '星星'
				}, {
					name: 'star',
					title: '星星'
				}, {
					name: 'star',
					title: '星星'
				}]
			};
		},
		onLoad() {},
		methods: {}
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
