<template>
	<view>
		<view class="box">
			<view class="header">
				<view class="header-top">
					<view class="header-top-left">
						<image v-show="gender===1" src="../../static/book-icon/男生.png" mode="widthFix"></image>
						<image v-show="gender===2" src="../../static/book-icon/女生.png" mode="widthFix"></image>
					</view>
					<view class="header-top-right">
						<input @click="gotosearch()" type="text" placeholder="唐诗里的烟火人间" />
						<image class="search" src="../../static/book-icon/搜索.png" mode="widthFix"></image>
					</view>
				</view>
				
				<view class="header-list">
					<li @click="updateNaviIndex(item.id,item.name)" :class="naviIndex === item.id? 'liSelect':''" v-for="(item,id) in navi" :key="id">{{item.name}}</li>
				</view>
			</view>
		</view>
		
		<view class="">
			<component
			:is="currentComponents"
			:list="this.list"
			  ></component>
		</view>
	</view>
</template>

<script>
	import {http} from '../../utils/https/http.js'
	import BookRecommendItem from '../../components/BookRecommendItem.vue'
	import BookFree from '../../components/BookFree.vue'
	import BookMale from '../../components/BookMale.vue'
	import BookFemale from '../../components/BookFemale.vue'
	import BookPublication from '../../components/BookPublication.vue'
	import BookListen from '../../components/BookListen.vue'
	
	export default {
		data() {
			return {
				gender: 1,
				navi:[],
				naviIndex:0,
				naviurl:'recommend',
				banner:[],
				shortCut:[],
				list:[],
				currentComponents:'',
				
			};
		},
		components:{
			BookRecommendItem,
			BookFree,
			BookMale,
			BookFemale,
			BookPublication,
			BookListen
		},
		created() {
			http(`store/navi.json?gender=${this.gender}`).then(res => {
				console.log(res)
				this.navi = res.data.navi
				this.naviIndex = this.navi[0].id
				// console.log(this.navi[0].url)
				// this.naviurl = this.navi[0].url
				// this.naviurl = this.naviurl.substr(1)
				// console.log(this.naviurl)
			})
			
			http(`store/show.json?type=${this.naviurl}&uuid=${this.naviIndex}`).then(res =>{
				// console.log(res)
				this.list = res.data.list
				this.currentComponents = BookRecommendItem
				// console.log(this.list);
			})
			
		},
		methods:{
			gotosearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			currentCpt(){
				if((this.naviurl==='recommend'||this.naviurl==='female_recommend') && this.list.length !=0){
					this.currentComponents = BookRecommendItem
				}else if((this.naviurl === 'free' || this.naviurl ==='female_free') && this.list.length !=0){
					this.currentComponents =  BookFree
				}else if(this.naviurl === 'male' && this.list.length !=0){
					this.currentComponents = BookMale
				}else if(this.naviurl === 'femail' && this.list.length !=0){
					this.currentComponents = BookFemale
				}else if(this.naviurl === 'publish' && this.list.length !=0){
					this.currentComponents = BookPublication
				}else if(this.naviurl === 'audio' && this.list.length !=0){
					this.currentComponents = BookListen
				}
			},
			updateNaviIndex(e,name){
				// console.log(name);
				// console.log(e);
				// console.log(this.gender);
				// console.log(name == '免费');
				this.naviIndex = e
				if(this.gender === 1){
					if(name == '精选'){
						this.naviurl = "recommend"
					}
					else if(name == '免费'){
						this.naviurl = "free"
						// console.log(this.navirul)
					}
					else if(name == '男生'){
						this.naviurl = "male"
					}
					else if(name == "女生"){
						this.naviurl = "femail"
					}
					else if(name == "出版"){
						this.naviurl = "publish"
					}
					else if(name == "听书"){
						this.naviurl = "audio"
					}
					
				}else if(this.gender === 2){
					if(name == "精选"){
						this.naviurl = "female_recommend"
					}
					else if(name == "免费"){
						this.naviurl = "female_free"
					}
					else if(name == "男生"){
						this.naviurl = "male"
					}
					else if(name == "女生"){
						this.naviurl = "femail"
					}
					else if(name == "出版"){
						this.naviurl = "publish"
					}
					else if(name == "听书"){
						this.naviurl = "audio"
					}
				}
				// console.log(this.navi);
				console.log(this.naviurl);
				this.querystore()					
				// this.currentCpt()
			},
			querystore(){
				http(`store/show.json?type=${this.naviurl}&uuid=${this.naviIndex}`).then(res =>{
					this.list = res.data.list
					console.log(res);
					this.currentCpt()
				})
			},
		}
	}
</script>

<style lang="scss">
body{
	background-color: #e3e3e3;
}
// .box{
// 	height: 100px;
// }
.header{
	margin-top: 10rpx;
	// height: 100px;
	// position: fixed;
	// top: 0px;
	// bottom: auto;
	// left: 0px;
	// right: 0px;
	margin-bottom: 40rpx;
}	
	
.header-top{
	display: flex;
	
	image{
		width: 50rpx;
		// display: block;
		// margin: 0 auto;
		margin-top: 10rpx;
		// line-height: 70rpx;
	}
	
	.header-top-left{
		width: 70rpx;
		height: 70rpx;
		// line-height: 70rpx;
		border-radius: 30px;
		text-align: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 7rpx;
		box-shadow: 0px 0px 6px 3px #e2e2e2;
	}
	.header-top-right{
		display: flex;
		justify-content: space-between;
		width: 590rpx;
		max-height: 70rpx;
		margin-top: 7rpx;
		margin-left: 40rpx;
		border-radius: 20px;
		box-shadow: 0px 0px 6px 3px #e2e2e2;
		
		.search{
			width: 40rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
		
		input{
			width: 460rpx;
			margin-left: 30rpx;
			margin-top: 14rpx;
			font-size: 18px;
		}
	}
}

.header-list{
	display: flex;
	font-size: 18px;
	justify-content: space-between;
	font-weight: 500;
	
	.liSelect{
		font-size: 24px;
		margin-top: 24rpx;
		color: black;
		font-weight: 700;
		position: relative;
	}
	.liSelect::before{
		content: '';
		position: absolute;
		left: 30rpx;
		bottom: -20rpx;
		height: 7rpx;
		width: 30rpx;
		background-color: red;
	}
	
	li{
		margin-left: 20rpx;
		color: #6b6b6b;
		margin-right: 20rpx;
		margin-top: 30rpx;
	}
}

li{
	list-style: none;
}
</style>
