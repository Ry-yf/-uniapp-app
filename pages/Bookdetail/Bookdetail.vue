<template>
	<view style="position: relative; height: 100%;" >
		<view class="header">
			<!-- <span class="header-back" @click="goBack()"><</span> -->
			<image class="header-back" @click="goBack()" src="/static/icon/返回.png" mode="widthFix"></image>
			<image class="header-image" src="/static/icon/分享.png" mode="widthFix"></image>
		</view>

		<view class="book" style="position: relative;">
			<view class="book-header">
				<view class="book-header-left">
					<image :src="img" mode="widthFix"></image>
				</view>
				<view class="book-header-right">
					<p class="title">{{feed.entry.title}}</p>
					<view style="margin-bottom: 10rpx;">
						{{feed.entry["pris:book"].category}} | <span
							style="color: #76dcf3;">{{feed.entry.author.name}}</span>
					</view>
					<u-rate :count="count" v-model="value" active-color="#ffaa00"></u-rate>
					<p style="margin-top: 10rpx;">{{feed.entry["pris:book"].words}}字 |
						{{feed.entry["pris:subscribe"].clicks}}
					</p>
					<p style="margin-top: 30rpx;">{{feed.entry["pris:book"].wprice}}阅豆/千字</p>
				</view>
			</view>
			<view :class="border=== 0? 'book-summary line':'book-summary'">
				{{feed.entry.summary}}
				<!-- 				<view class="book-summary-block">
					<image src="/static/book-icon/下箭头.png" mode="widthFix"></image>
				</view> -->
			</view>
			<view @click="updateborder()" :class="border===0? 'book-summary-block':'none'">
				<image src="/static/book-icon/下箭头.png" mode="widthFix"></image>
			</view>
		</view>
		
		<view class="detail">
			<view class="detail-left">
				<image src="../../static/book-icon/章节.png" mode=""></image>
			</view>
			<view class="detail-right">
				<span>连载中</span>
				<image class="img" src="../../static/book-icon/右箭头.png" mode="widthFix"></image>
				
			</view>
		</view>
		
		<view class="assess">
			<view class="assess-left">
				评论
			</view>
			<view class="assess-right">
				<image src="../../static/book-icon/写.png" mode="widthFix"></image>
				写评论
			</view>
		</view>
		
		<view class="recomment" v-for="(item , id) in list" :key="id">
			<recommendItem
				:img="item.avatar || Mrimg"
				:comment="item.comment"
				:name ="item.nickName"
				:replyCount ="item.replyCount"
				:grade = "item.grade"
				:level = "item.userLevel"
				:commentid = "item.commentId"
				:like = "item.likes"
			></recommendItem>
		</view>
		
		<view class="banner">
			<span style="border-right:  solid 1px #8a8a8a; background-color: white;height: 100%;line-height: 80rpx;">购买</span>
			<span @click="addbookId()" style="height: 100%;line-height: 80rpx;background-color: white;">加入书架</span>
			<!-- <span @click="addbookId(this.id)" style="height: 100%;line-height: 80rpx;background-color: white;">加入书架</span> -->
			<span @click="gotoBookPage()"  style="background-color: red; color: white;height: 100%;line-height: 80rpx;">免费试读</span>
		</view>
		
	</view>
</template>

<script>
	import {
		http
	} from '../../utils/https/http.js'
	import recommendItem from '../../components/recommendItem.vue'
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	
	export default {
		name: "Bookdetail",
		data() {
			return {
				id: '',
				border: 0,
				count: 0,
				value: 0,
				img: '',
				Mrimg:'',
				title: '',
				feed: '',
				list:[]
			};
		},
		components:{
			recommendItem
		},
		created() {
			// 获取书籍信息
			http(`book/getsub.json?id=${this.id}&title=${this.title}`).then(res => {
				this.feed = res.feed
				console.log(res)
				this.count = this.feed.entry["pris:ranking"]["max-value"]
				this.value = this.feed.entry["pris:ranking"].value
			})
			
			// 获取评论信息
			http(`comment/getComments.json?bookId=${this.id}`).then(res=>{
				this.list = res.all.list
				// console.log(this.list)
			})
		},
		methods: {
			addbookId(){
				this.$store.commit('addbookid',this.id)
			},
			gotoBookPage(){
				uni.navigateTo({
					url:"/pages/bookPage/bookPage?id=" + this.feed.entry.id
				})
			},
			goBack() {
				uni.navigateBack()
			},
			updateborder() {
				this.border = 1
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(option.id); //打印出上个页面传递的参数。
			this.id = option.id
			this.title = option.title
			this.img = option.img
			// console.log(this.id)
			// console.log(this.title)
		}
	}
</script>

<style scoped>
	.header {
		display: flex;
		justify-content: space-between;
		/* margin-bottom: 100rpx; */

		.header-back {
			width: 38rpx;
			margin-left: 15rpx;
			margin-top: 13rpx;
		}

		.header-image {
			margin-top: 5rpx;
			width: 53rpx;
			margin-right: 15rpx;
		}
	}

	.book::before {
		content: '';
		position: absolute;
		left: 10rpx;
		bottom: -40rpx;
		right: auto;
		height: 1px;
		width: 730rpx;
		background-color: #bcbcbc;
	}

	.book-header {
		margin-left: 40rpx;
		margin-top: 40rpx;
		display: flex;

		image {
			width: 250rpx;
			height: 400rpx;
			/* 		margin-left: 15rpx;
		margin-top: 40rpx; */
		}

		.book-header-right {
			margin-left: 40rpx;

			.title {
				font-size: 24px;
				font-weight: 500;
				margin-bottom: 10rpx;
			}
		}
	}

	.book-summary {
		/* position: relative; */
		/* height: 400px; */
		/* padding-bottom: 10rpx; */
		/* border-bottom: solid 1px #8a8a8a; */

	}

	.book-summary-block {
		position: absolute;
		right: 10rpx;
		/* bottom: 1px; */
		/* border-bottom: solid 1px #8a8a8a; */

		image {
			width: 30rpx;
		}
	}

	.book-border {
		/* border-bottom: solid 1px #8a8a8a; */
	}
	
	.detail{
		margin-top: 70rpx;
		height: 70rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 20rpx #f5f5f5c2;
		border-radius: 3px;
		image{
			width: 30rpx;
			height: 16px;
		}
		.detail-left{
			margin-left: 20rpx;
		}
		.detail-right{
			margin-right: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			span{
				font-size: 16px;
				margin-right: 20rpx;
				color: #71c162;
			}
			.img{
				margin-top: 5rpx;
			}
		}
	}
	
	.assess{
		display: flex;
		justify-content: space-between;
		/* margin-top: 20rpx; */
		height: 100rpx;
		align-items: center;
		border-bottom: solid 2px #e3e3e3;
		.assess-left{
			margin-left: 20rpx;
			font-size: 20px;
		}
		
		.assess-right{
			margin-right: 20rpx;
			padding: 10rpx;
			border: solid 2px #8a8a8a;
			color: #8a8a8a;
			image{
				margin-right: 5rpx;
				width: 40rpx;
			}
		}
	}




	.banner{
		position: fixed;
		display: flex;
		width: 750rpx;
		height: 80rpx;
		justify-content: center;
		align-items: center;
		text-align: center;
		bottom: -3px;
		border-top: solid 1px #8a8a8a;
		
		span{
			flex: 1;
			font-size: 16px;
		}
	}
	
	.line {
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

	.none {
		display: none;
	}
</style>