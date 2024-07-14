<template>
	<view>
		<view class="Pubbanner">
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
		
		<view class="ranklist">
			<p class="name">{{rankList.name}}</p>
			<view class="ranklists">
				<view style="display: flex;flex-direction: column;" v-for="(item_list,id) in rankList.list" :key="id+7000">
					<image style="right: 590rpx;" v-if="id==0" class="rank" src="../static/book-icon/金牌.png" mode="widthFix"></image>
					<image style="right: 335rpx;" v-if="id==1" class="rank" src="../static/book-icon/银牌.png" mode="widthFix"></image>
					<image style="right: 90rpx;" v-if="id==2" class="rank" src="../static/book-icon/铜牌.png" mode="widthFix"></image>
					<image class="book" :src="item_list.cover" mode=""></image>
					<p class="title">{{item_list.title}}</p>
				</view>
			</view>
			<view class="more">
				<span>{{rankList.more.name}}</span>
				<image src="../static/icon/右箭头.png" mode="widthFix"></image>
			</view>
		</view>
		
		<view class="weekpopular">
			<p class="name">{{Book.name}}</p>
			<!-- <view v-for="(item , id) in Book.list" :key="id"> -->
				<view class="weekpopularbox">
					<image :src="Book.cover" mode=""></image>
					<view class="text">
						<p class="title">{{Book.title}}</p>
						<view class="author"><span>{{Book.author}}</span> <span v-show="Book.category!=''">|</span>  <span>{{Book.category}}</span></view>
						<p class="content">{{Book.content}}</p>
					</view>
				</view>
			<!-- </view> -->
		</view>
		
		<view class="img" v-for="(img,id) in UlImg" :key="id+300">
			<image :src="img.cover" mode="widthFix"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"BookPublication",
		data() {
			return {
				banner:[],
				img:[],
				shortCut:[],
				rankList:[],
				Book:[],
				UlImg:[],
			};
		},
		props:["list"],
		created() {
			console.log(this.list)
			this.banner = this.list[0].banners
			for(let i=0 ;i<this.banner.length;i++){
				this.img[i] = this.banner[i].cover
			}
			this.shortCut = this.list[1].shortCut
			this.rankList = this.list[2]
			this.Book = this.list[3]
			for(let i=4 ;i<this.list.length;i++){
				this.UlImg[i-4] = this.list[i]
			}
		}
	}
</script>

<style>
.shortCut{
	position: relative;
	justify-content: space-evenly;
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

.ranklist{
	margin-top: 80rpx;
	position: relative;
	margin-bottom: 50rpx;
	
	.name{
		margin-left: 20rpx;
		font-size: 22px;
		font-weight: 700;
	}
}
.ranklist::before{
	content: '';
	position: absolute;
	left: 55rpx;
	bottom: -40rpx;
	height: 1rpx;
	width: 640rpx;
	background-color: #e3e3e3;
}

.ranklists{
	margin-top: 100rpx;
	display: flex;
	justify-content: space-evenly;
	position: relative;
	
	.title{
		max-width: 200rpx;
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
	
	.rank{
		width: 70rpx;
		position: absolute;
		top: -70rpx;
		/* right: 1rpx; */
		
	}
	.book{
		width: 200rpx;
		height: 250rpx;
	}
}

.more{
	margin-top: 20rpx;
	text-align: center;
	align-content: center;
	span{
		margin-right: 10rpx;
		line-height: -10rpx;
	}
	image{
		width: 40rpx;
		/* margin-top: 10rpx; */
	}
}

.weekpopular{
	margin-top: 80rpx;
	position: relative;
	/* margin-top: 20rpx; */
	margin-bottom: 80rpx;
	margin-left: 20rpx;
	.name{
		font-size: 20px;
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

.img{
	margin-bottom: 30rpx;
	image{
		width: 750rpx;
	}
}
</style>