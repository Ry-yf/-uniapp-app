<template>
	<view style="margin-top: 20rpx;">
		<view class="list">
			<view class="list-left">
				<image :src="img" mode="widthFix" v-if="img!=''"></image>
				<image src="../static/icon/我的.png" mode="widthFix" v-if="img===''"></image>
				<image src="../static/icon/我的.png" mode="widthFix" v-if="img===null"></image>
				<view class="list-left-text">
					<span class="name">{{name}}</span>
					<span class="level">Lv{{level}}</span>
					<view class="">
						<u-rate :count="value" v-model="grade" active-color="#ffaa00"></u-rate>
					</view>
				</view>
			</view>
			<view class="list-right" style="margin-right: 20rpx;">
				<image src="../static/book-icon/点赞.png" mode="widthFix" v-if="good===false" @click="updategood()" style="margin-right: 5rpx;"></image>
				<image src="../static/book-icon/已点赞.png" mode="widthFix" v-if="good === true" @click="updategood()" style="margin-right: 5rpx;"></image>
				{{like}}
			</view>
		</view>
		<view class="detail">
			{{comment}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "recommentItem",
		data() {
			return {
				value: 5,
				good: false,
			};
		},
		created() {
			if(this.img===null){
				this.img = url('../static/icon/我的.png')
			}
		},
		props: ["img", "comment", "name", "replyCount", "grade", "level", "commentid","like"],
		methods:{
			updategood(){
				if(this.good===false){
					this.like = this.like+1
				}else{
					this.like = this.like-1
				}
				this.good = !this.good
			}
		}
	}
</script>

<style scoped>
.list{
	display: flex;
	justify-content: space-between;
	
	.list-left{
		display: flex;
		margin-left: 20rpx;
		
		image{
			width: 80rpx;
			border-radius: 50px;
		}
		
		.list-left-text{
			margin-left: 20rpx;
		}
	}
	
	.list-right{
		image{
			width: 40rpx;
		}
	}
}
.name{
	font-size: 20px;
	color: #32bab6;
}

.level{
	margin-left: 7rpx;
	/* padding-bottom: 10rpx; */
	font-size: 10px;
	color: #b30000;
	padding-left: 10rpx;
	padding-right: 10rpx;
	border: solid 1px #b30000;
}

.detail{
	margin-left: 20rpx;
}
</style>