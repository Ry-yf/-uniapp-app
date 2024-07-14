<template>
	<view>
		<view class="header">
			<view class="search-header">
				<view class="search-header-left">
					<image class="search" src="../../static/book-icon/搜索.png" mode="widthFix"></image>
					<input v-model="searchStr" type="text" />
					<image @click="clicksearchStr()" v-show="searchStr" class="qingchu" src="../../static/icon/清楚.png"
						mode="widthFix" style="margin: 10rpx;width: 30rpx;"></image>
				</view>
				<view @click="goback()" class="search-header-right">
					取消
				</view>
			</view>
			
			<view style="position: relative;margin-top: 10rpx;" class="">
				<view class="header-option">
					<li class="header-option-list t" @click="updateSearchIndex(0)">
						<span class="header-option-span">综合排序</span>
						<image v-show="searchIndex != 0" style="width: 20rpx;" src="../../static/book-icon/倒三角.png" mode="widthFix"></image>
						<image v-show="searchIndex == 0" style="width: 25rpx;" src="../../static/book-icon/正三角.png" mode="widthFix"></image>
					</li>
					<li class="header-option-list t" @click="updateSearchIndex(1)">
						<span class="header-option-span">全部频道</span>
						<image  v-show="searchIndex != 1" style="width: 20rpx;" src="../../static/book-icon/倒三角.png" mode="widthFix"></image>
						<image  v-show="searchIndex == 1" style="width: 25rpx;" src="../../static/book-icon/正三角.png" mode="widthFix"></image>
					</li>
					<li class="header-option-list" @click="updateSearchIndex(2)">
						<span class="header-option-span">筛选</span>
						<image v-show="searchIndex != 2" style="width: 20rpx;" src="../../static/book-icon/倒三角.png" mode="widthFix"></image>
						<image v-show="searchIndex == 2"style="width: 25rpx;" src="../../static/book-icon/正三角.png" mode="widthFix"></image>
					</li>
				</view>
				
				<view class="header-option-li ">
					<view v-if="searchIndex == 0" class="">
						<p @click="updatesort(0)" :class="sort ==0?  'header-option-li-p x red': 'header-option-li-p x'">综合排序</p>
						<p @click="updatesort(1)" :class="sort ==1?  'header-option-li-p x red': 'header-option-li-p x'">销量最高</p>
						<p @click="updatesort(2)" :class="sort ==2?  'header-option-li-p x red': 'header-option-li-p x'">人气最高</p>
						<p @click="updatesort(3)" :class="sort ==3?  'header-option-li-p x red': 'header-option-li-p x'">最新上架</p>
						<p @click="updatesort(4)" :class="sort ==4?  'header-option-li-p x red': 'header-option-li-p x'">最近更新</p>
					</view>
					<view v-if="searchIndex == 1" class="">
						<p @click="updatechannel(0)" :class="channel ==0?  'header-option-li-p x red': 'header-option-li-p x'">全部频道</p>
						<p @click="updatechannel(1)" :class="channel ==1?  'header-option-li-p x red': 'header-option-li-p x'">男生</p>
						<p @click="updatechannel(2)" :class="channel ==2?  'header-option-li-p x red': 'header-option-li-p x'">女生</p>
						<p @click="updatechannel(3)" :class="channel ==3?  'header-option-li-p x red': 'header-option-li-p x'">出版</p>
					</view>
					<view v-if="searchIndex == 2" class="">
						<view class="x header-option-three">
							<p style="padding-top: 20rpx;">完结状态</p>
							<view style="display: flex;">
								<p @click="updatebookStatus(0)" :class="bookStatus==0? 'header-option-li-three-p threered':'header-option-li-three-p'">全部</p>
								<p @click="updatebookStatus(1)" :class="bookStatus==1? 'header-option-li-three-p threered':'header-option-li-three-p'">完结</p>
								<p @click="updatebookStatus(2)" :class="bookStatus==2? 'header-option-li-three-p threered':'header-option-li-three-p'">连载</p>
							</view>
						</view>
						<view class="x  header-option-three">
							<p style="padding-top: 20rpx;">书籍价格</p>
							<view style="display: flex;">
								<p @click="updatepay(0)" :class="pay==0? 'header-option-li-three-p threered':'header-option-li-three-p'">全部</p>
								<p @click="updatepay(1)" :class="pay==1? 'header-option-li-three-p threered':'header-option-li-three-p'">免费</p>
								<p @click="updatepay(2)" :class="pay==2? 'header-option-li-three-p threered':'header-option-li-three-p'">包月</p>
								<p @click="updatepay(3)" :class="pay==3? 'header-option-li-three-p threered':'header-option-li-three-p'">收费</p>
							</view>
						</view>
						<view class="x  header-option-three">
							<p style="padding-top: 20rpx;">书籍字数</p>
							<view style="display: flex; flex-wrap: wrap;">
								<p @click="updatewordCount(0)" :class="wordCount==0? 'header-option-li-three-p3 threered':'header-option-li-three-p3'">30万字以下</p>
								<p @click="updatewordCount(1)" :class="wordCount==1? 'header-option-li-three-p3 threered':'header-option-li-three-p3'">30-50万字</p>
								<p @click="updatewordCount(2)" :class="wordCount==2? 'header-option-li-three-p3 threered':'header-option-li-three-p3'">50-100万字</p>
								<p @click="updatewordCount(3)" :class="wordCount==3? 'header-option-li-three-p3 threered':'header-option-li-three-p3'">100万字以上</p>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
		<view @click="gotoBookdetail(item)" v-for="(item,index) in list.books" :key='index'>
			<view style="display: flex;margin-bottom: 40rpx;margin-top: 20rpx;align-items: center;">
				<view class="left" style="margin-right: 30rpx;margin-left: 20rpx;">
					<image style="width: 200rpx;height: 300rpx;" :src="item.cover" mode=""></image>
				</view>
				<view class="right"	style="">
					<p class="list-title">{{item.title}}</p>
					<p class="list-author">{{item.author}}/{{item.category}}</p>
					<p class="list-summary">{{item.summary}}</p>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {http} from '../../utils/https/http.js'
	
	export default {
		data() {
			return {
				searchStr: '',
				searchIndex: 10,
				sort:0,
				channel:0,
				bookStatus:0,
				pay:0,
				wordCount:0,
				page: 0,
				list:[],
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.searchStr = option.searchStr
		},
		created() {
			this.queryList()
		},
		methods: {
			goback() {
				uni.navigateTo({
					url:"/pages/search/search"
				})
			},
			clicksearchStr(){
				this.searchStr = ''
				uni.navigateTo({
					url:"/pages/search/search"
				})
			},
			updateSearchIndex(e){
				if(this.searchIndex == e){
					this.searchIndex = 10
				}
				else{
					this.searchIndex = e
				}
			},
			updatesort(e){
				this.sort = e
				this.queryList()
			},
			updatechannel(e){
				this.channel = e
				this.queryList()
			},
			updatebookStatus(e){
				this.bookStatus = e
				this.queryList()
			},
			updatepay(e){
				this.pay = e
				this.queryList()
			},
			updatewordCount(e){
				this.wordCount = e
				this.queryList()
			},
			gotoBookdetail(e){
				uni.navigateTo({
					url:'/pages/Bookdetail/Bookdetail?id=' + e.bookId + '&img=' + e.cover + '&title=' + e.title
				})
			},
			queryList(){
				http(`search/book.json?keyword=${this.searchStr}&page=${this.page}&sort=${this.sort}&channel=${this.channel}&bookStatus=${this.bookStatus}&pay=${this.pay}&wordCount=${this.wordCount}`)
				.then(res=>{
					this.list = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	ul,li{
		list-style: none;
	}

	.search-header {
		position: relative;
		z-index: 5;
		background-color: white;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
		display: flex;
		justify-content: space-between;

		.search-header-left {
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

		.search-header-right {
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
	
	.header-option{
		display: flex;
		justify-content:space-around;
		align-items: center;
		height: 60rpx;
		font-size: 14px;
		
		.header-option-list{
			height: 100%;
			line-height: 60rpx;
			flex: 1;
			text-align: center;
			// height: 80rpx;
			// flex: 1;
		}
		
		.t{
			position: relative;
		}
		
		.t::before{
			content: '';
			position: absolute;
			right: 0rpx;
			top: 10rpx;
			// bottom: -40rpx;
			height: 40rpx;
			width: 1rpx;
			background-color: #e3e3e3;
		}
		
		.header-option-span{
			margin-right: 15rpx;
			color: #181818;
		}
	}
	
	.header-option-li{
		// position: absolute;
		// bottom: -700rpx;
		
		.x{
			position: relative;
		}
		
		.x::before{
			content: '';
			position: absolute;
			left: 55rpx;
			bottom: 0rpx;
			height: 1rpx;
			width: 695rpx;
			background-color: #e3e3e3;
		}
		
		.header-option-li-p{
			// position: relative;
			font-size: 16px;
			padding-left: 65rpx;
			display: block;
			width: 750rpx;
			height: 80rpx;
			// text-align: center;
			line-height: 80rpx;
			background-color: #efefefc7;
			
		}
		
		.header-option-three{
			padding-left: 65rpx;
			width: 750rpx;
			background-color: #efefefc7;
			// margin-bottom: 40rpx;
		}
		
		
		.header-option-li-three-p{
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 15rpx;
			background-color: white;
			text-align: center;
			margin-right: 30rpx;
			margin-top: 20rpx;
			margin-bottom: 30rpx;
		}
		
		.red{
			// background-color: red;
			color: red;
		}
		
		.header-option-li-three-p3{
			width: 230rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 15rpx;
			background-color: white;
			text-align: center;
			margin-top: 20rpx;
			margin-bottom: 10rpx;
			margin-right: 30rpx;
		}
		
		.threered{
			background-color: red;
			color: white;
		}
	}
	
	
	.list-title{
		font-size: 20px;
		margin-bottom: 20rpx;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		// 只要超过宽度就换行，不论中文还是英文
		word-break: break-all;
		//最多展示两行
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
	
	.list-author{
		font-size: 14px;
		color: #484848;
		margin-bottom: 10rpx;
	}
	
	.list-summary{
		max-width: 470rpx;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		// 只要超过宽度就换行，不论中文还是英文
		word-break: break-all;
		//最多展示两行
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 16px;
		// color: #636363;
	}
	.none{
		display: none;
	}
</style>