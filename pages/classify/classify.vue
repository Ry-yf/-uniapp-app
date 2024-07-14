<template>
	<scroll-view class="scroll" scroll-y="true" lower-threshold='50' @scrolltolower='scrolltolower()'>
		<view class="header">
			<view class="header-left">
				<p @click="updateIndex(0)" :class="indexedDB===0? 'selectp':''">男生</p>
				<p @click="updateIndex(1)" :class="indexedDB===1? 'selectp':''">女生</p>
				<p @click="updateIndex(2)" :class="indexedDB===2? 'selectp':''">出版</p>
				<p @click="updateIndex(3)" :class="indexedDB===3? 'selectp':''">听书</p>
			</view>
			<view class="header-right">
				<u-icon name="search" size="20"></u-icon>
			</view>
		</view>
		<view class="book-classify">
			<p @click="updateText(item.desc,item.url)" v-for="(item,id) in cate[indexedDB].cates" :key="id"
				:class="cateindex===item.desc? 'red':''">{{item.name}}</p>
		</view>
		<view class="book-tip">
			<view class="tip">
				<span @click="updateSort(1)" :class="sort===1? 'tip-select':''">畅销</span>
				|
				<span @click="updateSort(3)" :class="sort===3? 'tip-select':''">最新</span>
			</view>
			<!-- <view class="select">
					<u-icon name="arrow-down-fill"></u-icon>
					<span>筛选</span>
			</view> -->
		</view>
		<view class="select-detail">
			<view class="detail-one">
				<span @click="updatepay(0)" :class="pay===0? 'select-detail-on':''">全部</span> · <span
					@click="updatepay(1)" :class="pay===1? 'select-detail-on':''">收费</span> · <span
					@click="updatepay(2)" :class="pay===2? 'select-detail-on':''">免费</span> · <span
					@click="updatepay(3)" :class="pay===3? 'select-detail-on':''">包月</span>
			</view>
			<view class="detail-one">
				<span @click="updatestatu(0)" :class="status===0? 'select-detail-on':''">全部</span> · <span
					@click="updatestatu(1)" :class="status===1? 'select-detail-on':''">连载</span> · <span
					@click="updatestatu(2)" :class="status===2? 'select-detail-on':''">完本</span>
			</view>
			<view class="detail-three">
				<span @click="updateshow(0)" :class="showTotal===0? 'select-detail-on':''">全部</span> · <span
					@click="updateshow(1)" :class="showTotal===1? 'select-detail-on':''">30万字以下</span> · <span
					@click="updateshow(2)" :class="showTotal===2? 'select-detail-on':''">30-50万字</span> · <span
					@click="updateshow(3)" :class="showTotal===3? 'select-detail-on':''">50-100万字</span> · <span
					@click="updateshow(4)" :class="showTotal===4? 'select-detail-on':''">100万字以上</span>
			</view>
		</view>
		<view class="detail-style">
			<view class="detail" v-for="(item,index) in bookDate" :key="index+1000" @click="gotoBookdetail(item.id,item.title,item.cover)">
				<classifydetail  :img="item.cover" :title="item.title" :author="item.author" :id="item.id"></classifydetail>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {
		http
	} from '../../utils/https/http.js'
	import classifydetail from '../../components/classifydetail.vue'

	let url = 'simpleCategroy.json'
	export default {
		data() {
			return {
				indexedDB: 0,
				gender: 'male',
				sort: 1,
				uuid: '',
				cateindex: 7,
				cateid: 7,
				showTotal: 0,
				tipindex: 0,
				pay: 0,
				page: 1,
				status: 0,
				Mrimg:'',
				loading:false,
				bookDate: [],
				cate: []
			};
		},
		created() {
			this.loading = true
			http("mergedCategroy.json").then(res => {
				this.cate = res
				this.cateindex = res[this.indexedDB].cates[0].desc
				console.log(this.cate)
			})

			http(
					`source/v2/searchBook.json?catId=${this.cateid}&pay=${this.pay}&bookStatus=${this.status}&sort=${this.sort}&wordCount=${this.showTotal}&page=1`
				)
				.then(res => {
					// console.log(res)
					this.bookDate = res.list
					console.log(this.bookDate)
					this.$nextTick(() => {
						this.loading = false
					})
				})
		},
		components: {
			classifydetail
		},
		methods: {
			updateIndex(e) {
				this.indexedDB = e
				if (this.indexedDB == 0) {
					this.gender = 'male'
				} else if (this.indexedDB == 1) {
					this.gender = 'female'
				}
				else if (this.indexedDB == 2) {
					this.gender = 'female'
				}
				else if (this.indexedDB == 3) {
					this.gender = 'female'
				}
			},
			updateText(e,url) {
				this.loading = true
				// console.log(e)
				this.cateindex = e
				let emaid= url.match(/\d+(\.\d+)?/g);
				this.cateid = emaid[1]
				console.log(this.cateid)
				http(
						`source/v2/searchBook.json?catId=${this.cateid}&pay=${this.pay}&bookStatus=${this.status}&sort=${this.sort}&wordCount=${this.showTotal}&page=1`
					)
					.then(res => {
						this.bookDate = res.list
						this.page = 1
						// console.log(res.data)
						this.$nextTick(() => {
							this.loading = false
						})
					})
			},
			updateSort(e) {
				this.loading = true
				this.sort = e
				http(
						`source/v2/searchBook.json?catId=${this.cateid}&pay=${this.pay}&bookStatus=${this.status}&sort=${this.sort}&wordCount=${this.showTotal}&page=1`
					)
					.then(res => {
						this.bookDate = res.list
						this.page = 1
						// console.log(res.data)
						this.$nextTick(() => {
							this.loading = false
						})
					})
			},
			updatepay(e) {
				this.loading = true
				this.pay = e
				http(
						`source/v2/searchBook.json?catId=${this.cateid}&pay=${this.pay}&bookStatus=${this.status}&sort=${this.sort}&wordCount=${this.showTotal}&page=1`
						)
					.then(res => {
						this.bookDate = res.list
						this.page = 1
						// console.log(res.data)
						this.$nextTick(() => {
							this.loading = false
						})
					})
				// console.log(this.pay)
			},
			updatestatu(e) {
				this.loading = true
				this.status = e
				http(
						`source/v2/searchBook.json?catId=${this.cateid}&pay=${this.pay}&bookStatus=${this.status}&sort=${this.sort}&wordCount=${this.showTotal}&page=1`
					)
					.then(res => {
						this.page = 1
						this.bookDate = res.list
						// console.log(res.data)
						this.$nextTick(() => {
							this.loading = false
						})
					})
				// console.log(this.status)
			},
			updateshow(e){
				this.loading = true
				this.showTotal = e
				http(
						`source/v2/searchBook.json?catId=${this.cateid}&pay=${this.pay}&bookStatus=${this.status}&sort=${this.sort}&wordCount=${this.showTotal}&page=1`
					)
					.then(res => {
						this.page = 1
						this.bookDate = res.list
						// console.log(res.data)
						this.$nextTick(() => {
							this.loading = false
						})
					})
			},
			scrolltolower() {
				if (!this.loading) {
				console.log("滑动到底部")
				this.page += 1
				this.loading = true
				http(
						`source/v2/searchBook.json?catId=${this.cateid}&pay=${this.pay}&bookStatus=${this.status}&sort=${this.sort}&wordCount=${this.showTotal}&page=${this.page}`
					)
					.then(res => {
						this.bookDate = [...this.bookDate, ...res.list]
						// console.log(res.data)
						this.$nextTick(() => {
							this.loading = false
						})
					})
					}
				// console.log(this.status)
			},
			gotoBookdetail(id,title,img){
				uni.navigateTo({
					url:`/pages/Bookdetail/Bookdetail?id=${id}&title=${title}&img=${img}`
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.scroll {
		position: fixed;
		top: 1px;
		bottom: 50px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		margin-top: 5rpx;

		.header-left {
			display: flex;

			.selectp {
				font-size: 22px;
				font-weight: 700;
			}

			p {
				margin-left: 30rpx;
				margin-right: 30rpx;
				font-size: 18px;
				margin-top: 10rpx;
			}
		}

		.header-right {
			margin-right: 30rpx;
			margin-top: 10rpx;
			// line-height: 20rpx;
		}
	}

	.book-classify {
		display: flex;
		flex-wrap: wrap;
		background-color: #efefef;
		width: 750rpx;
		height: 150rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		margin-top: 20rpx;
		padding-top: 25rpx;

		.red {
			color: red;
			font-size: 16px;
			max-width: 32px;
			// border-bottom: 2px;
			// border-color: red;
		}

		p {
			max-width: 36px;
			overflow: hidden;
			white-space: nowrap;
			font-size: 18px;
			font-weight: 500;
			text-align: center;
			margin-right: 30rpx;
		}
	}

	.book-tip {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;

		.tip {
			font-size: 18px;

			.tip-select {
				font-size: 16px;
				color: red;
			}

			span {
				margin-left: 20rpx;
				margin-right: 20rpx;
			}
		}

		.select {
			width: 70px;
			color: #adadad;
			// text-align: center;
			justify-content: center;
			display: flex;
			border: solid 5rpx #adadad;
			margin-right: 20rpx;
			font-size: 12px;
			border-radius: 15px;
			// border-width: 5px;
			// border-color: black;
		}
	}

	.select-detail {
		margin-top: 30rpx;
		color: #6c6666cc;
		// margin-left: rpx;

		.select-detail-on {
			color: red;
		}

		span {
			margin-left: 20rpx;
			margin-right: 20rpx;
			// margin-bottom: 30rpx;
		}

		.detail-one {
			margin-bottom: 30rpx;
		}
	}

	.detail-style {
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;

		.detail {
			margin-left: 20rpx;
			margin-right: 10rpx;
		}
	}
</style>