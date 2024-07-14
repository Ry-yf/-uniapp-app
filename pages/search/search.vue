<template>
	<view>
		<view v-show="searchStr" class="background-color">
			
		</view>
		
		<view class="header">
			<view class="header-left">
				<image class="search" src="../../static/book-icon/搜索.png" mode="widthFix"></image>
				<input v-model="searchStr" type="text" placeholder="唐诗里的烟火人间" />
				<image @click="clicksearchStr()" v-show="searchStr" class="qingchu" src="../../static/icon/清楚.png" mode="widthFix" style="margin: 10rpx;width: 30rpx;"></image>
			</view>
			<view @click="goback()" class="header-right">
				取消
			</view>
		</view>

		<view v-show="searchStr">
			<view class="search-list" @click="gotosearchStr()" v-for="(s, i) in suggests" :key="i">
				<view style="display: flex;align-items: center;">
					<image v-if="i==0" src="../../static/book-icon/搜索.png" mode="widthFix" style="width: 30rpx;margin-left: 30rpx;margin-right: 25rpx;"></image>
					<image v-if="i!=0" src="../../static/book-icon/书籍.png" mode="widthFix"></image>
					<span v-if="i==0">搜索"{{searchStr}}"</span>
					<span v-if="i!=0">{{s.text}}</span>
				</view>
				<image src="../../static/book-icon/右箭头.png" mode="widthFix" style="width: 30rpx;"></image>
			</view>
		</view>

		<view class="hot-search-wrap" v-show="!searchStr">
			<view class="wrap-title">
				热门搜索
			</view>
			<view class="hot-search-label">
				<view class="hot-search-label-box" v-for="(h,i) in hotSearch" :key="i" @click="goSearch(h.name,h.id)"
					>
					<span v-if="i==0" class="hot-search-label-id one">{{i+1}}</span>
					<span v-if="i==1" class="hot-search-label-id two">{{i+1}}</span>
					<span v-if="i==2" class="hot-search-label-id three">{{i+1}}</span>
					<span v-if="i>2" class="hot-search-label-id">{{i+1}}</span>
					<span class="hot-search-label-name">{{h.name}}</span>
				</view>
			</view>
		</view>
		
		<view class="hot-search-wrap" v-show="!searchStr && searchHistoryArr.length">
			<view class="wrap-title">
				<span>最近搜索</span>
				<image style="width: 45rpx; margin-right: 20rpx;" src="../../static/book-icon/垃圾桶.png" mode="widthFix"></image>
			</view>
			<view class="hot-search-label">
				<view class="history-search-label-box" v-for="s in searchHistoryArr" :key="s" @click="goSearch(s)">
					{{s}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		http
	} from '../../utils/https/http.js'
	import {
		debounce
	} from '../../utils/tool.js'
	
	const SEARCHHISTORY = 'searchHistory'

	export default {
		data() {
			return {
				searchStr: '',
				suggests: [],
				searchHistoryArr: [],
				hotSearch:[],
			};
		},
		created() {
			this.searchHistoryArr = uni.getStorageSync(SEARCHHISTORY)
			this._getSearchSuggests = debounce(300, this.getSearchSuggests)
			this.getHotSearchArr()
			console.log(this.searchHistoryArr)
		},
		methods: {
			gotosearchStr(){
				uni.navigateTo({
					url:"/pages/searchDetail/searchDetail?searchStr=" + this.searchStr
				})
			},
			goback() {
				uni.navigateBack()
			},
			getSearchSuggests(kw) {
				// console.log('kw', kw);
				// kw = kw.trim()
				if (kw) {
					http('search/searchHint?search=' + kw).then((res) => {
						console.log(res);
						this.suggests = res.words.w
					})
				}
			},
			getHotSearchArr() {
				http('search/getHotWords').then(res=>{
					console.log('热门搜索', res);
					this.hotSearch = res.list
				})
			},
			clicksearchStr(){
				this.searchStr = ''
			},
			goSearch(kw) {
				this.searchStr = kw
				// uni.navigateTo({
				// 	url: '/pages/SearchDetail/SearchDetail?kw=' + kw
				// })
				
				// 每次存入前先获取之前存入的值
				let data = uni.getStorageSync(SEARCHHISTORY) || []
				console.log('storage sync', data);
				
				// 返回值为真保留，为假删除
				data = data.filter(item => item !== kw)
				
				uni.setStorage({
					key: SEARCHHISTORY,
					data: [kw, ...data]
				})
				
				this.searchHistoryArr = [kw, ...data]
				
				uni.navigateTo({
					url: '/pages/searchDetail/searchDetail?kw=' + kw
				})
			}
		},
		watch: {
			searchStr(newValue) {
				let kw = newValue.trim()
				// this._getSearchSuggests(newValue)

				if (!kw) {
					this.suggests = []
				}
				this._getSearchSuggests(kw)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.background-color{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f4f4f4;
		z-index: -1;
	}
	.header {
		position: relative;
		z-index: 5;
		background-color: white;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
		display: flex;
		justify-content: space-between;

		.header-left {
			z-index: 5;
			margin-left: 20rpx;
			display: flex;
			flex: 9;
			height: 50rpx;
			background-color: #ebebeb;
			border-radius: 20px;

			input {
				width: 80%;
				margin-top: 3rpx;
				margin-left: 20rpx;
			}

		}

		.header-right {
			flex: 1;
			margin-top: 7rpx;
			margin-left: 30rpx;
			margin-right: 20rpx;
		}


		.qingchu {
			margin-left: 10rpx;
			margin-top: 12rpx
		}

		image {
			width: 30rpx;
			margin-left: 15rpx;
			// display: block;
			// margin: 0 auto;
			margin-top: 10rpx;
			// line-height: 70rpx;
		}
	}
	
	
.search-list{
	z-index: 5;
	position: relative;
	align-items: center;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	height: 100rpx;
	background-color: #f4f4f4;
	
	span{
		font-size: 16px;
		line-height: 6rpx;
	}
	
	image{
		width: 50rpx;
		margin-left: 20rpx;
		margin-right: 10rpx;
	}
}

.search-list::before{
	content: '';
	position: absolute;
	color: black;
	width: 730rpx;
	right: 0px;
	height: 0.5px;
	bottom: 1px;
	background-color: #9a9a9a75;
}

.hot-search-wrap{
	margin-top: 80rpx;
	
	.wrap-title{
		display: flex;
		justify-content: space-between;
		margin-left: 20rpx;
		color: #262626a8;
	}

	.hot-search-label{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		// margin-left: 0rpx;
		margin-right: 50rpx;
		
		.one{
			background-color: #df0505e6;
		}
		
		.two{
			background-color: #e78120;
		}
		
		.three{
			background-color: #ff9a00eb;
		}
		
		.hot-search-label-box{
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			// flex-wrap: wrap;
			width: 300rpx;
			margin-left: 30rpx;
			// max-width: 280rpx;
			// position: relative;
			// overflow: hidden;
			// text-overflow: ellipsis;
			// // 只要超过宽度就换行，不论中文还是英文
			// word-break: break-all;
			// //最多展示两行
			// display: -webkit-box;
			// -webkit-box-orient: vertical;
			// -webkit-line-clamp: 1;
			// // font-size: 12px;
		}
	}
	
	.hot-search-label-id{
		display: block;
		text-align: center;
		border-radius: 70px;
		width: 40rpx;
		height: 40rpx;
		background-color: #9a9a9a90;
		line-height: 40rpx;
		color: white;
		margin-right: 40rpx;
	}
	
	.hot-search-label-name{
		max-width: 220rpx;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		// 只要超过宽度就换行，不论中文还是英文
		word-break: break-all;
		//最多展示两行
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		// font-size: 12px;
	}
}
</style>