<template>
	<view>
		<view class="weekpopular" v-for="(list,id) in lists" :key="id+100">
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
		
		<view class="ranklist" v-for="(item,id) in rankList" :key="id+1000">
			<p class="name">{{item.name}}</p>
			<view class="ranklists">
				<view style="display: flex;flex-direction: column;" v-for="(item_list,id) in item.list" :key="id+5000">
					<image style="right: 590rpx;" v-if="id==0" class="rank" src="../static/book-icon/金牌.png" mode="widthFix"></image>
					<image style="right: 335rpx;" v-if="id==1" class="rank" src="../static/book-icon/银牌.png" mode="widthFix"></image>
					<image style="right: 90rpx;" v-if="id==2" class="rank" src="../static/book-icon/铜牌.png" mode="widthFix"></image>
					<image class="book" :src="item_list.cover" mode=""></image>
					<p>{{item_list.title}}</p>
				</view>
			</view>
			<view class="more">
				<span>{{item.more.name}}</span>
				<image src="../static/icon/右箭头.png" mode="widthFix"></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		name:"BookMale",
		data() {
			return {
				lists:[],
				rankList:[],
			};
		},
		props:["list"],
		created(){
			console.log(this.list)
			for (let i = 0; i < 2; i++) {
				this.lists[i] = this.list[i]
			}
			console.log(this.lists)
			
			for(let i = 2 ; i< this.list.length;i++){
				this.rankList[i-2] = this.list[i] 
			}
		}
	}
</script>

<style>
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

.ranklist{
	position: relative;
	margin-bottom: 50rpx;
	
	.name{
		font-size: 22px;
		font-weight: 700;
	}
}
.ranklist::before{
	content: '';
	position: absolute;
	left: 25rpx;
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

</style>