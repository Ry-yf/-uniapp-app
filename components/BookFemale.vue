<template>
	<view>
		<view class="Female_banner">
			<u-swiper :list="img" circular></u-swiper>
		</view>
		
		<view class="Female_weekpopular" v-for="(list,id) in rankList" :key="id+100">
			<p class="name">{{list.name}}</p>
			<view v-for="(item , id) in list.list" :key="id">
				<view @click="gotoBookdetail(list.id,list.title,list.cover)" class="weekpopularbox">
					<image :src="item.cover" mode=""></image>
					<view class="text">
						<p class="title">{{item.title}}</p>
						<view class="author"><span>{{item.author}}</span> <span v-show="item.category!=''">|</span>  <span>{{item.category}}</span></view>
						<p class="content">{{item.content}}</p>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="ranklist t">
			<p class="name">{{rankList_one.name}}</p>
			<view class="ranklists">
				<view style="display: flex;flex-direction: column;" v-for="(item_list,id) in rankList_one.list" :key="id+5000">
					<image style="right: 590rpx;" v-if="id==0" class="rank" src="../static/book-icon/金牌.png" mode="widthFix"></image>
					<image style="right: 335rpx;" v-if="id==1" class="rank" src="../static/book-icon/银牌.png" mode="widthFix"></image>
					<image style="right: 90rpx;" v-if="id==2" class="rank" src="../static/book-icon/铜牌.png" mode="widthFix"></image>
					<image class="book" :src="item_list.cover" mode=""></image>
					<p>{{item_list.title}}</p>
				</view>
			</view>
			<view class="more">
				<span>{{rankList_one.more.name}}</span>
				<image src="../static/icon/右箭头.png" mode="widthFix"></image>
			</view>
		</view>
		
		<view class="Female_Ip" >
			<p class="name">{{Ip.name}}</p>
			<view class="" style="display: flex; justify-content: space-around;margin-top: 20rpx;">
				<view  @click="gotoBookdetail(Ip.id,Ip.title,Ip.cover)" class="Ip_list" v-for="(ip,id) in Ip.list" :key="id+100">
					<image :src="ip.cover" mode=""></image>
					<p class="title">{{ip.title}}</p>
					<p class="author">{{ip.author}}</p>
				</view>
			</view>
		</view>
		
		<view class="ranklist">
			<p class="name">{{rankList_two.name}}</p>
			<view class="ranklists">
				<view style="display: flex;flex-direction: column;" v-for="(item_list,id) in rankList_two.list" :key="id+7000">
					<image style="right: 590rpx;" v-if="id==0" class="rank" src="../static/book-icon/金牌.png" mode="widthFix"></image>
					<image style="right: 335rpx;" v-if="id==1" class="rank" src="../static/book-icon/银牌.png" mode="widthFix"></image>
					<image style="right: 90rpx;" v-if="id==2" class="rank" src="../static/book-icon/铜牌.png" mode="widthFix"></image>
					<image class="book" :src="item_list.cover" mode=""></image>
					<p>{{item_list.title}}</p>
				</view>
			</view>
			<view class="more">
				<span>{{rankList_two.more.name}}</span>
				<image src="../static/icon/右箭头.png" mode="widthFix"></image>
			</view>
		</view>
				
	</view>
</template>

<script>
	export default {
		name:"BookFemale",
		data() {
			return {
				banner:[],
				img:[],
				rankList:[],
				rankList_one:[],
				Ip:[],
				rankList_two:[],
				
			};
		},
		props:["list"],
		created() {
			console.log(this.list)
			this.banner = this.list[0].banners
			for(let i=0 ;i<this.banner.length;i++){
				this.img[i] = this.banner[i].cover
			}
			for(let i=1 ;i < 3 ;i++){
				this.rankList[i-1] = this.list[i]
			}
			this.rankList_one = this.list[3]
			this.Ip = this.list[4]
			this.rankList_two = this.list[5]
		},
		methods:{
			gotoBookdetail(id,title,img){
				uni.navigateTo({
					url:`/pages/Bookdetail/Bookdetail?id=${id}&title=${title}&img=${img}`
				})
			}
		}
	}
</script>

<style>
.ranklist{
	position: relative;
	margin-bottom: 50rpx;
	
	.name{
		font-size: 22px;
		font-weight: 700;
	}
}
.t::before{
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

.Female_weekpopular{
	position: relative;
	margin-top: 80rpx;
	margin-left: 20rpx;
	.name{
		font-size: 18px;
		font-weight: 700;
		/* margin-right: 20rpx; */
	}
}

.Female_weekpopular::before{
	content: '';
	position: absolute;
	left: 25rpx;
	bottom: -40rpx;
	height: 1rpx;
	width: 640rpx;
	background-color: #e3e3e3;
}

	
.Female_Ip{
	margin-top: 80rpx;
	margin-bottom: 80rpx;
	position: relative;
	
	.name{
		font-size: 22px;
		font-weight: 700;
	}
	
	.title{
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 10rpx;
	}
	
	.author{
		font-size: 12px;
		color: #636363;
	}

	image{
		width: 150rpx;
		height: 200rpx;
	}
}

.Female_Ip::before{
	content: '';
	position: absolute;
	left: 55rpx;
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