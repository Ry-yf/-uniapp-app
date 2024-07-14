<template>
	<view style="position: relative;">
		<view class="bg">
			
		</view>
		
		<view class="header">
			<view @click="goback" class="header-left">
				<image src="../../static/icon/返回.png" mode=""></image>
			</view>
			<view class="header-right">
				<p>设置</p>
			</view>
		</view>
		
		<view class="list-one">
			<li class="t">
				<p>清除浏览缓存(0KB)</p>
			</li>
			<li>
				<p>清除听书缓存(0KB)</p>
			</li>
		</view>
		
		<view class="list-two">
			<li class="t">
				<p>评价云阅读</p>
				<image src="../../static/book-icon/右箭头.png" mode=""></image>
			</li>
			<li>
				<p>关于</p>
				<image src="../../static/book-icon/右箭头.png" mode=""></image>
			</li>
		</view>
		
		<view class="back">
			<view @click="run" class="button">
				<span>退出登录</span>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goback(){
				uni.navigateBack()
			},
			run(){
				uni.switchTab({
					url:"/pages/user/user?Status=false"
				})
			}
		},
	}
</script>

<style>
ul,li{
	list-style: none;
}
.bg{
	position: absolute;
	width: 750rpx;
	height: 100vh;
	background-color: #e3e3e34a;
	z-index: 0;
}
.header{
	background-color: white;
	position: sticky;
	z-index: 10;
	display: flex;
	align-items: center;
	
	.header-left{
		margin-top: 15rpx;
		margin-left: 20rpx;
		image{
			
			width: 40rpx;
			height: 40rpx;
		}
	}
	
	.header-right{
		text-align: center;
		width: 700rpx;
		p{
			font-size: 24px;
			font-weight: 500;
			padding-right: 70rpx;
		}
	}	
}
.list-one{
	margin-top: 30rpx;
	background-color: white;
	position: sticky;
	
	li{
		line-height: 80rpx;
		width: 750rpx;
		height: 80rpx;
		p{
			font-size: 16px;
			margin-left: 20rpx;
		}
	}
	
	.t{
		position: relative;
	}
	.t::before{
		content: '';
		position: absolute;
		left: 25rpx;
		bottom: 0rpx;
		height: 1rpx;
		width: 720rpx;
		background-color: #e3e3e34a;
	}
	
}

.list-two{
	margin-top: 30rpx;
	background-color: white;
	position: sticky;

	
	li{
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 80rpx;
		width: 750rpx;
		height: 80rpx;
		p{
			font-size: 16px;
			margin-left: 20rpx;
		}
		
		image{
			width: 50rpx;
			height: 40rpx;
		}
	}
	
	.t{
		position: relative;
	}
	.t::before{
		content: '';
		position: absolute;
		left: 25rpx;
		bottom: 0rpx;
		height: 1rpx;
		width: 720rpx;
		background-color: #e3e3e34a;
	}
	
}

.back{
	position: sticky;
	z-index: 10;
	margin-top: 60rpx;
	width: 750rpx;
	display: flex;
	justify-content: space-around;
	text-align: center;
	.button{
		width: 500rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: white;
		background-color: #ff0000;
		border-radius: 10rpx;
		
		span{
			font-size: 16px;
		}
	}
}
</style>
