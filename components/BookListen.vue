<template>
	<view>
		<view class="banner">
			<u-swiper :list="img" circular></u-swiper>
		</view>
		
		<image style="margin-top: 30rpx;" :src="image.cover" mode="widthFix"></image>
		
		<view class="Female_Ip" >
			<p class="name">{{Ip.name}}</p>
			<view class="" style="display: flex; justify-content: space-around;margin-top: 20rpx;">
				<view class="Ip_list" v-for="(ip,id) in Ip.list" :key="id+100">
					<image :src="ip.cover" mode=""></image>
					<p class="title">{{ip.title}}</p>
					<p class="author">{{ip.author}}</p>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"BookListen",
		data() {
			return {
				banner:[],
				img:[],
				image:[],
				Ip:[],
			};
		},
		props:["list"],
		created() {
			this.banner = this.list[0].banners
			for(let i=0 ;i<this.banner.length;i++){
				this.img[i] = this.banner[i].cover
			}
			this.image = this.list[1]
			this.Ip = this.list[2]
		}
		
	}
</script>

<style>
image{
	width: 750rpx;
	height: 200rpx;
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
		max-width: 150rpx;
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 10rpx;
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
	
	.author{
		max-width: 150rpx;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		// 只要超过宽度就换行，不论中文还是英文
		word-break: break-all;
		//最多展示两行
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		font-size: 12px;
		color: #636363;
	}

	image{
		width: 150rpx;
		height: 200rpx;
	}
}

/* .Female_Ip::before{
	content: '';
	position: absolute;
	left: 55rpx;
	bottom: -40rpx;
	height: 1rpx;
	width: 640rpx;
	background-color: #e3e3e3;
} */
</style>