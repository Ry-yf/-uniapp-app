<template>
	<view>
		
		<view class="header">
			<view @click="goback" class="header-left">
				<image src="../../static/icon/返回.png" mode=""></image>
			</view>
			<view class="header-right">
				<p>我的笔记</p>
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
			}
		}
	}
</script>

<style>
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
</style>
