<template>
	<view class="groPages">
		<view>
			<view class="listItem">
				<text class="text">商品名称：</text>
				<u--input placeholder="请输入内容"  v-model="title"/>
			</view>
			<view class="listItem">
				<text class="text">商品描述：</text>
				<u--input placeholder="请输入内容" v-model="detail"/>
			</view>
			<view class="listItem">
				<text class="text">商品产地：</text>
				<u--input placeholder="请输入内容" v-model="place_pro"/>
			</view>
			<view class="listItem">
				<text class="text">商品价格：</text>
				<u--input placeholder="请输入内容" v-model="price"/>
			</view>
			<text class="text">商品分类：</text>
			<uni-data-select :localdata="range"
				@change="change"/>
			<view style="margin-top: 35rpx;">
				<u-upload :fileList="fileList1"
					@afterRead="afterRead"
					@delete="deletePic"
					name="1"
					multiple
					:maxCount="3" />
			</view>
			<view style="position: absolute;bottom: 40rpx;width: calc(100vw - 50rpx);">
				<u-button type='success'
					@click="submit"
					text="上架" />
			</view>
		</view>
	</view>
</template>
<script>
	import {
		addGoods,
	} from "@/config/api.js"
	export default {
		data() {
			return {
				range: [{
					value: 0,
					text: "蔬菜"
				}, {
					value: 1,
					text: "水果"
				}, {
					value: 2,
					text: "水产"
				}, {
					value: 3,
					text: "农副加工"
				}, {
					value: 4,
					text: "花草树木"
				}, {
					value: 5,
					text: "柴米油盐"
				}, {
					value: 6,
					text: "其它"
				}, ],
				fileList1: [],
				lists:[],
				title:null,
				detail:null,
				place_pro:null,
				price:null,
				category_id:null,
			}
		},
		methods: {
			change(e){
				this.category_id = 3
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				//#ifdef H5
				const fileName = event.file.name
				//#endif 
				//#ifndef H5
				const fileName = event.file.path
				//#endif
				this.lists.push(event.file[0])
				this.fileList1.push(event.file[0])
				let fileListLen = this[`fileList${event.name}`].length
			},
			async submit(){
				await addGoods({
					"user_id": 2,
					'title':this.title,
					'detail':this.detail,
					'place_pro':this.place_pro,
					'price':this.price,
					'category_id':this.category_id,
				}).then(res=>{
					if(this.$store.state.statusCode != 422){
						for (let i = 0; i < this.lists.length; i++) {
							const result = this.uploadFilePromise(this.lists[i].url,i,res.goods_id)
						}
					}
				})
			},
			uploadFilePromise(url,i,goods_id) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://127.0.0.1:3006/api/goods/uploadfile', 
						filePath: url,
						name: 'file',
						formData: {
							"user_id": 2,
							"index":i,
							"goods_id":goods_id
						},
						success: async (res) => {
							console.log('res',res)
							this.$u.toast('上传成功')
						}
					});
				})
			},
		}
	}
</script>
<style scoped
	lang="scss">
	.groPages {
		padding-top: 30rpx;
		padding-left: 25rpx;
		padding-right: 25rpx;
		min-height: 100vh;
		height: 100%;
	}

	.text {
		margin-bottom: 20rpx;
		display: block;
		font-size: 38rpx;
	}

	.listItem {
		margin-bottom: 20rpx;
	}
</style>
