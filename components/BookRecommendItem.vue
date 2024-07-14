<template>
	<view>
		<view class="banner">
			<u-swiper :list="img" circular></u-swiper>
		</view>
		
		<view class="shortCut">
			<view v-for="item in shortCut" :key="item.msgId" class="">
				<view class="shortCut_box">
					<image :src="item.cover" mode="widthFix"></image>
					<p>{{item.title}}</p>
				</view>
			</view>
		</view>
		
<!-- 		<view class="weekrecomment" style="margin-left: 20rpx;">
			<span style="font-size: 20px; font-weight: 700;">本周强推</span>
			<view class="big_recomment">
				<view class="image">
					<image :src="weekCount[0].cover" mode="widthFix"></image>
				</view>
				<view class="text">
					<p class="title">{{this.weekCount[0].title}}</p>
					<p class="author">{{this.weekCount[0].author}} / {{this.weekCount[0].category}}</p>
					<p class="content">{{this.weekCount[0].content}}</p>
				</view>
			</view>
			<view class="small_recomment">
				<view class="" v-for="item in weeksmallCount" :key="item.id">
					<image :src="item.cover" mode=""></image>
					<p class="title">{{item.title}}</p>
					<p class="author">{{item.author}}</p>
				</view>
			</view>
		</view> -->
		
		<view class="weekpopular" v-for="(list,id) in weekPopular" :key="id+100">
			<p class="name">{{list.name}}</p>
			<view  @click="gotoDetail(item.id,item.title,item.cover)" v-for="(item , id) in list.list" :key="id">
				<view class="weekpopularbox">
					<image :src="item.cover" mode=""></image>
					<view class="text">
						<p class="title">{{item.title}}</p>
						<view class="author"><span>{{item.author}}</span> <span v-show="item.category!=''">|</span>  <span>{{item.category}}</span></view>
						<p class="content">{{item.content}}</p>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name: "BookRecommendItem",
		data() {
			return {
				banner:'',
				img:[],
				shortCut:[],
				weekCount:[],
				weeksmallCount:[],
				weekPopular:[],
			}
		},
		props:["list"],
		methods:{
			gotoDetail(id,title,img){
				uni.navigateTo({
					url:"/pages/Bookdetail/Bookdetail?id=" + id + "&title=" + title + "&img=" +img
				})
			},
		},
		created() {
			console.log(this.list)
			this.banner = this.list[0].banners
			for(let i=0 ;i<this.banner.length;i++){
				this.img[i] = this.banner[i].cover
			}
			this.shortCut = this.list[1].shortCut
			this.weekCount = this.list[2].list
			for(let i=1 ;i<this.weekCount.length;i++){
				this.weeksmallCount[i-1] = this.weekCount[i]
			}
			for(let i=3 ;i<this.list.length;i++){
				this.weekPopular[i-3] = this.list[i]
			}
			// console.log(this.img)
			// console.log(this.banner)
		}
	}
</script>

<style>
.shortCut{
	position: relative;
	justify-content: center;
	text-align: center;
	align-items: center;
	display: flex;
	margin-top: 15rpx;

	.shortCut_box{
		margin-right: 30rpx; 
	}

	
	image{
		width: 100rpx;
	}
}
.shortCut::before{
	content: '';
	position: absolute;
	left: 55rpx;
	bottom: -40rpx;
	height: 1rpx;
	width: 640rpx;
	background-color: #e3e3e3;
}
.big_recomment{
	display: flex;
	margin-top: 20rpx;
	.text{
		margin-left: 20rpx;
	}
	
	.title{
		margin-bottom: 20rpx;
		font-size: 20px;
		font-weight: 600;
	}
	
	.author{
		color: #363636;
		margin-bottom: 20rpx;
	}
	
	.content{
		color: #363636;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		// 只要超过宽度就换行，不论中文还是英文
		word-break: break-all;
		//最多展示两行
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		//根据样式设置
		/* line-height: 1.2em; */
		/* max-height: 2.4em; */
	}
	
	
	image{
		width: 200rpx;
	}
}

.weekrecomment{
	margin-top: 80rpx;
	position: relative;
}

.weekrecomment::before{
	content: '';
	position: absolute;
	left: 25rpx;
	bottom: -40rpx;
	height: 1rpx;
	width: 640rpx;
	background-color: #e3e3e3;
}

.small_recomment{
	margin-top: 20rpx;
	display: flex;
	justify-content: center;
	.title{
		font-size: 16px;
		font-weight: 800;
		color: black;
		max-width: 160rpx;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		// 只要超过宽度就换行，不论中文还是英文
		word-break: break-all;
		//最多展示两行
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		//根据样式设置
		/* line-height: 1.2em; */
		/* max-height: 2.4em; */
	}
	
	.author{
		margin-top: 10rpx;
		color: #6b6b6b;
	}
	
	p{
		margin-right: 20rpx;
		margin-left: 5rpx;
	}
	
	image{
		width: 150rpx;
		height: 200rpx;
		margin-right: 20rpx;
		margin-left: 5rpx;
	}
}

.weekpopular{
	position: relative;
	margin-top: 80rpx;
	margin-left: 20rpx;
	.name{
		font-size: 18px;
		font-weight: 700;
		/* margin-right: 20rpx; */
	}
}

.weekpopular::before{
	content: '';
	position: absolute;
	left: 25rpx;
	bottom: -40rpx;
	height: 1rpx;
	width: 640rpx;
	background-color: #e3e3e3;
}

.weekpopularbox{
	margin-top: 20rpx;
	display: flex;
	margin-bottom: 40rpx;
	/* justify-content: space-around; */
	image{
		width: 150rpx;
		height: 200rpx;
	}
	
	.content{
		margin-top: 20rpx;
		color: #909090;
		max-width: 600rpx;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		// 只要超过宽度就换行，不论中文还是英文
		word-break: break-all;
		//最多展示两行
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.text{
		margin-left: 30rpx;
		.title{
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
			font-weight: 600;
		}
		
		span{
			margin-right: 15rpx;
			color: #909090;
		}
		
	}
}
</style>