<template>
	<view class="body">
		<view class="weekpopular" v-for="(list,id) in list" :key="id+100">
			<p class="name">{{list.name}}</p>
			<view v-for="(item , id) in list.list" :key="id">
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
		name:"Bookfree",
		data() {
			return {
				// list:[],
			}
		},
		props:["list"],
		created(){
			console.log(this.list)
		}
	}
</script>

<style>
.body{
	/* background-color: #e3e3e3; */
}
	
.weekpopular{
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
</style>