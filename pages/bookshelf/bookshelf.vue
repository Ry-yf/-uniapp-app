<template>
	<view>
		<view class="header">
			<view class="header-left">
				书架
			</view>
			<view class="header-right">
				<image @click="gotosearch()" src="../../static/book-icon/搜索.png" mode="widthFix"></image>
				<image src="../../static/book-icon/历史记录.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="book-classify">
			<view @click="gotoBookdetail(item.id)" class="book-class" v-for="(item,id) in list" :key='id'>
				<classifydetail
					:img = "item.cover"
					:title = "item.title"
					:author = "item.author"
					:id = "item.id"
				></classifydetail>
			</view>
		</view>
<!-- 		<view class="book-classify">
			<view @click="gotoBookdetail(item.id)" class="book-class" v-for="(item,id) in book" :key='id'>
				<classifydetail
					:img = "item.cover"
					:title = "item.title"
					:author = "item.author"
					:id = "item.bookid"
				></classifydetail>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {http} from '../../utils/https/http.js'
	import classifydetail from '../../components/classifydetail.vue'
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				list:[],
				bookid:this.$store.state.bookid,
				length:this.$store.state.length,
				book:[],
			};
		},
		onShow:function(){
			console.log(this.bookid)
			for(let i=0;i<this.length;i++){
				http("book/info.json?sourceUuid=" + this.bookid[i]).then(res=>{
					console.log(res)
					this.book = {...this.book,...res.data.book}
					console.log(this.book)
				})
			}
		},
		created(){
			http("shelf/info.json").then(res=>{
				console.log(res)
				this.list = res.data.list
			})
			
		},
		methods:{
			gotosearch(){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			},
			gotoBookdetail(id,title,cover){
				uni.navigateTo({
					url:`/pages/bookPage/bookPage?id=${id}`
				})
			}
		},
		components:{
			classifydetail
		},
		computed:{
		},
	}
</script>

<style lang="scss" scoped>
.header{
	display: flex;
	justify-content: space-between;
	margin-bottom: 30rpx;
	
	.header-left{
		font-size: 18px;
		font-weight: 500;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}
	
	.header-right{
		margin-right: 20rpx;
		margin-top: 20rpx;
	}
	image{
		width: 50rpx;
		margin-left: 50rpx;
	}
}

.book-classify{
	display: flex;
	flex-wrap: wrap;
	
	.book-class{
		margin-left: 20rpx;
		margin-right: 10rpx;
	}
}
</style>
