<template>
	<view>
		<view class="header">
			<view class="header-email">
				<u-icon name="email-fill" size="30"></u-icon>
			</view>
			<view class="header-index" >
				<view class="header-left">
					<image v-if="Statu==false" src="../../static/image/touxiang.png" ></image>
					<image v-if="Statu==true" src="../../static/user-icon/我的.jpg" style="width: 200rpx;height: 200rpx;margin-left: 40rpx;margin-top: 50rpx;"></image>
				</view>
				<view class="header-right" style="margin-left: 20rpx;">
					<p @click="Statu = !Statu" v-if="Statu==false" class="header-right-Dy">点击登录</p>
					<p v-if="Statu==true" class="header-right-name" style="margin-top: 50rpx;margin-left: 20rpx;">云翳云菲</p>
					<p v-if="Statu==false" class="header-right-text">登录即可免费读五天</p>
					<p v-if="Statu==true" class="header-right-Lv" style="width: 70rpx;margin-left: 20rpx;">lv1</p>
				</view>
			</view>
		</view>
		<view class="index" style="margin-top: 20rpx;">
			<view class="index-left">
				<p class="index-left-account">账户</p>
				<p class="index-left-text">充值送红包</p>
				<p class="index-left-button">充值</p>
			</view>
			<view class="index-right">
				<p class="index-right-account">签到</p>
				<p class="index-right-text">做任务领红包</p>
				<p class="index-right-button">签到</p>
			</view>
		</view>
		<view class="banner">
			<ul @click="goNotes()" class="list">
				<view class="list-left" style="display: flex;align-items: center">
					<image src="../../static/user-icon/笔记.png" mode="widthFix" style="width: 50rpx;"></image>
					<p style="   line-height: 36px;height: 31px;">笔记</p>
				</view>
				<image src="../../static/book-icon/右箭头.png" mode="widthFix" style="width: 50rpx;"></image>
			</ul>
			<ul class="list">
				<view class="list-left" style="display: flex;align-items: center">
					<image src="../../static/user-icon/上传.png" mode="widthFix" style="width: 50rpx;"></image>
					<p style="   line-height: 36px;height: 31px;">已购与上传</p>
				</view>
				<image src="../../static/book-icon/右箭头.png" mode="widthFix" style="width: 50rpx;"></image>
			</ul>
			<ul class="list">
				<view class="list-left" style="display: flex;align-items: center">
					<image src="../../static/user-icon/客服.png" mode="widthFix" style="width: 50rpx;"></image>
					<p style="   line-height: 36px;height: 31px;">在线客服</p>
				</view>
				<image src="../../static/book-icon/右箭头.png" mode="widthFix" style="width: 50rpx;"></image>
			</ul>
			<ul class="list">
				<view class="list-left" style="display: flex;align-items: center">
					<image src="../../static/user-icon/月亮.png" mode="widthFix" style="width: 50rpx;"></image>
					<p style="   line-height: 36px;height: 31px;">夜间模式</p>
				</view>
				<image src="../../static/book-icon/右箭头.png" mode="widthFix" style="width: 50rpx;"></image>
			</ul>
			<ul class="list">
				<view class="list-left" style="display: flex;align-items: center">
					<image src="../../static/user-icon/钻石-L.png" mode="widthFix" style="width: 50rpx;"></image>
					<p style="   line-height: 36px;height: 31px;">积分商城</p>
				</view>
				<image src="../../static/book-icon/右箭头.png" mode="widthFix" style="width: 50rpx;"></image>
			</ul>
			<ul @click="gotoSetting()" class="list">
				<view class="list-left" style="display: flex;align-items: center">
					<image src="../../static/user-icon/设置.png" mode="widthFix" style="width: 50rpx;"></image>
					<p style="   line-height: 36px;height: 31px;">设置</p>
				</view>
				<image src="../../static/book-icon/右箭头.png" mode="widthFix" style="width: 50rpx;"></image>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Statu:false,
			};
		},
		methods:{
			gotoSetting(){
				uni.navigateTo({
					url:"/pages/user/userSetting"
				})
			},
			goNotes(){
				uni.navigateTo({
					url:"/pages/user/userNotes"
				})
			}
		},
	}
</script>

<style lang="scss">
.header{
	.header-email{
		float: right;
		padding-right: 30rpx;
		padding-top: 20rpx;
	}
	.header-index{
		// margin-top: 40rpx;
		// padding-top: 40rpx;
		// text-align: center;
		align-items: center;
		display: flex;
	}
	.header-left{
		padding-top: 40rpx;
		image{
			width: 250rpx;
			height: 250rpx;
			border-radius: 1000rpx;
		}
	}
	.header-right{
		padding-bottom: 30rpx;
		
		.header-right-Dy{
			font-size: 28px;
			font-weight: 600;
			margin-bottom: 20rpx;
			color: #b1b1b1;
		}
		.header-right-name{
			font-size: 28px;
			font-weight: 600;
			margin-bottom: 20rpx;
			color: black;
		}
		.header-right-Lv{
			border-radius: 100rpx;
			text-align: center;
			background-color: #a3a3a329;
			color: #a3a3a3;
		}
	}
}

.index{
	display: flex;
	// margin-bottom: 20rpx;
	padding-bottom: 20rpx;
	// border-bottom: solid 3px #a3a3a3;
	box-shadow: 0px 5px 10px 0px #0000000f;
	
	.index-left{
		// background-color: yellow;
		flex: 1;
		text-align: center;
		border-right: solid 1px #b0b0b0;
		
		.index-left-account{
			font-size: 22px;
			margin-bottom: 10rpx;
			// border-right: solid 1px #b0b0b0;
		}
		.index-left-text{
			color: #a3a3a3;
			margin-bottom: 20rpx;
			font-weight: 500;
			// border-right: solid 1px #b0b0b0;
		}
		.index-left-button{
			width: 170rpx;
			height: 60rpx;
			line-height: 60rpx;
			margin-left: 100rpx;
			border-radius: 30px;
			background-color: red;
			color: white;
		}
	}
	
	.index-right{
		// background-color: rebeccapurple;
		text-align: center;
		flex: 1;
		
		.index-right-account{
			font-size: 22px;
			margin-bottom: 10rpx;
		}
		.index-right-text{
			color: #a3a3a3;
			margin-bottom: 20rpx;
			font-weight: 500;
		}
		.index-right-button{
			width: 170rpx;
			height: 60rpx;
			line-height: 60rpx;
			margin-left: 100rpx;
			border-radius: 30px;
			background-color: white;
			border: solid #ff6767;
			color: #ff6767;
		}
	}
}

.banner{
	margin-top: 70rpx;
	
	.list{
		display: flex;
		justify-content: space-between;
		// text-align: center;
		justify-items: center;
		align-items: center;
		margin-bottom: 70rpx;
		padding-left: 20rpx;
		
		
		.list-left{
			text-align: center;
		}
		image{
			margin-right: 20rpx;
			margin-top: 10rpx;
			// padding-top: 50rpx;
			line-height: 50rpx;
		}
		p{
			// padding-bottom: 50rpx;
			font-size: 20px;
		}
		span{
			font-size: 20px;
			color: #a3a3a3;
		}
	}
}
</style>
