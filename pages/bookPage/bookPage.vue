<template>
	<view style="position: relative;">
		<scroll-view id="scroll" scroll-y="true" style="height: 100vh;background-color: #fff6d2;position: absolute;z-index: 1;" show-scrollbar="false"  scrolltolower="150"  @scrolltolower="scrolltolower">
			<view @click="updatemenu" id="body" class="body">
				
			</view>
			<view class="">
				正在加载
				
			</view>
		</scroll-view>
<!-- 		 <k-touch-listen @touchLeft="touchLeft" @touchRight="touchRight">
		<view id="body" class="body">
			
		</view>
		</k-touch-listen> -->
		
<!-- 		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<view id="body" class="body">
				
			</view>
		</swiper> -->
		
		<view v-if="menu" style="position: absolute;top: 0;width: 750rpx;z-index: 10;background-color: white;height: 60rpx;">
			<view style="display: flex;justify-content: space-between;">
				<view @click="gotoBack()" class="">
					<image src="../../static/icon/返回.png" style="width: 40rpx;height: 40rpx;margin-left: 20rpx;margin-top: 10rpx;"></image>
				</view>
				<view class="">
					<image src="../../static/book-icon/评论.png" style="width: 40rpx;height: 40rpx;margin-right: 40rpx;margin-top: 10rpx;"></image>
					<image @click="shuqian = 2" v-if="shuqian === 1" src="../../static/book-icon/书签.png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx;margin-top: 10rpx;"></image>
					<image @click="shuqian = 1" v-if="shuqian === 2" src="../../static/book-icon/书签 (1).png" style="width: 40rpx;height: 40rpx;margin-right: 20rpx;margin-top: 10rpx;"></image>
				</view>
			</view>
		</view>
		
		<view v-if="menu" style="position: fixed;bottom: -10rpx;left: 0;width: 750rpx;z-index: 10;background-color: white;height: 120rpx;text-align: center;">
			<view style="display: flex;justify-content: space-between;justify-items: center;margin-top: 20rpx; ">
				<li style="margin-left: 20rpx;">
					<image src="../../static/book-icon/章节.png" style="width: 30rpx;height: 30rpx;"></image>
					<p style="margin-top: 8rpx;">目录</p>
				</li>
				<li @click="updateOptText">
					<image src="../../static/book-icon/字体.png" style="width: 40rpx;height: 40rpx;"></image>
					<p>设置</p>
				</li>
				<li>
					<image src="../../static/user-icon/月亮.png" style="width: 40rpx;height: 40rpx;"></image>
					<p>夜间</p>
				</li>
				<li @click="updateSetting" style="margin-right: 20rpx;">
					<image src="../../static/book-icon/更多.png" style="width: 40rpx;height: 40rpx;"></image>
					<p>更多</p>
				</li>
			</view>
		</view>
		
		<view v-if="optText" style="position: fixed;bottom: -10rpx;left: 0;width: 750rpx;z-index: 10;background-color: white;height: 370rpx;text-align: center;">
			<li style="text-align: center;">
				<span>亮度</span>
				<u-slider @input='updateHighopt(hightopt)' v-model="hightopt"></u-slider>
			</li>
			<li>
				<span>主题</span>
				<view style="display: flex;justify-content: space-evenly;">
					<view @click="updatebgColor('rgb(248 248 248 / 50%)')" style="width: 150rpx;height: 60rpx;background-color: rgb(248 248 248 / 50%);border: 1rpx solid #00000038;">
						
					</view>
					<view @click="updatebgColor('#f7f7f7')" style="width: 150rpx;height: 60rpx;background-color: #f7f7f7;">
						
					</view>
					<view @click="updatebgColor('black')" style="width: 150rpx;height: 60rpx;background-color: black;">
						
					</view>
					<view @click="updatebgColor('rgb(212 248 217)')" style="width: 150rpx;height: 60rpx;background-color: rgb(212 248 217);">
						
					</view>
				</view>
			</li>
			<li>
				<span>字号</span>
				<view style="display: flex;justify-content: space-evenly;">
					<view @click="smallSize()" style="width: 150rpx;height: 60rpx;border: 1rpx solid #00000038;line-height: 60rpx;">
						减小
					</view>
					<view @click="biggerSize()" style="width: 150rpx;height: 60rpx;border: 1rpx solid #00000038;line-height: 60rpx;">
						增大
					</view>
				</view>
			</li>
		</view>
		
		<view v-if="setting" style="position: fixed;bottom: -10rpx;left: 0;width: 750rpx;z-index: 10;background-color: white;height: 450rpx;text-align: center;">
			<li style="display: flex;justify-content: space-between;height: 70rpx;border-bottom: 1px solid #fff6d2;justify-items: center;text-align: center;align-items: center;">
				<view class="setting-left">
					<image src="../../static/icon/分享.png" style="width: 50rpx;height: 50rpx;margin-top: 10rpx;"></image>
					<p style="line-height: 70rpx;margin-left: 15rpx;">分享书籍</p>
				</view>
				<view class="setting-right">
					<image src="../../static/book-icon/右箭头.png" style="width: 50rpx;height: 50rpx;"></image>
				</view>
			</li>
			<li style="display: flex;justify-content: space-between;height: 70rpx;border-bottom: 1px solid #fff6d2;justify-items: center;text-align: center;align-items: center;">
				<view class="setting-left">
					<image src="../../static/setting/信息审核1.png" style="width: 50rpx;height: 50rpx;margin-top: 10rpx;"></image>
					<p style="line-height: 70rpx;margin-left: 15rpx;">搜索书籍内容</p>
				</view>
				<view class="setting-right">
					<image src="../../static/book-icon/右箭头.png" style="width: 50rpx;height: 50rpx;"></image>
				</view>
			</li>
			<li style="display: flex;justify-content: space-between;height: 70rpx;border-bottom: 1px solid #fff6d2;justify-items: center;text-align: center;align-items: center;">
				<view class="setting-left">
					<image src="../../static/setting/文件下载.png" style="width: 50rpx;height: 50rpx;margin-top: 10rpx;"></image>
					<p style="line-height: 70rpx;margin-left: 15rpx;">下载全部可读章节</p>
				</view>
				<view class="setting-right">
					<image src="../../static/book-icon/右箭头.png" style="width: 50rpx;height: 50rpx;"></image>
				</view>
			</li>
			<li style="display: flex;justify-content: space-between;height: 70rpx;border-bottom: 1px solid #fff6d2;justify-items: center;text-align: center;align-items: center;">
				<view class="setting-left">
					<image src="../../static/setting/购物车空.png" style="width: 50rpx;height: 50rpx;margin-top: 10rpx;"></image>
					<p style="line-height: 70rpx;margin-left: 15rpx;">自动购买下一章</p>
				</view>
				<view class="setting-right">
					<u-switch v-model="setShop" ></u-switch>
				</view>
			</li>
			<li style="display: flex;justify-content: space-between;height: 70rpx;border-bottom: 1px solid #fff6d2;justify-items: center;text-align: center;align-items: center;">
				<view class="setting-left">
					<image src="../../static/setting/3.1铃铛.png" style="width: 50rpx;height: 50rpx;margin-top: 10rpx;"></image>
					<p style="line-height: 70rpx;margin-left: 15rpx;">追更提醒</p>
				</view>
				<view class="setting-right">
					<u-switch v-model="setPur" ></u-switch>
				</view>
			</li>
			<li style="display: flex;justify-content: space-between;height: 70rpx;border-bottom: 1px solid #fff6d2;justify-items: center;text-align: center;align-items: center;">
				<view class="setting-left">
					<image src="../../static/setting/眼睛.png" style="width: 50rpx;height: 50rpx;margin-top: 10rpx;"></image>
					<p style="line-height: 70rpx;margin-left: 15rpx;">护眼模式</p>
				</view>
				<view class="setting-right">
					<u-switch v-model="setEye" ></u-switch>
				</view>
			</li>
		</view>
		
		<view class="">
			
		</view>
		
	</view>
</template>

<script>
	import transition from "../../uni_modules/uview-ui/libs/config/props/transition.js";
import {http} from "../../utils/https/http.js"
	
	export default {
		data() {
			return {
				catalog:[],
				index:0,
				thisPageId:[],
				beforePageId:[],
				latterPageId:[],
				thisPage:[],
				beforePage:[],
				latterPage:[],
				thisContent:[],
				latterContent:[],
				Status:0,
				childindex: 1,
				shuqian: 1,
				menu: false,
				optText: false,
				hightopt: 100,
				fontSize: 20,
				setting:false,
				setShop:false,
				setPur:false,
				setEye:false
			};
		},
		created() {
			http("reader/book/info.json?source_uuid=" + this.id).then(res=>{
				console.log(res)
				
				this.catalog = res.data.catalog
				this.thisPageId = res.data.catalog[this.index]
				this.latterPageId = res.data.catalog[this.index+1]
				
				// console.log(this.thisPageId)
				// console.log(this.latterPageId)
				http("reader/book/content.json?source_uuid=" + this.id + "&content_uuid=" + this.thisPageId.secId).then(res =>{
					// console.log(res)
					
					this.thisPage = res.data.content
					this.thisContent =this.StringToHtml(this.thisPage)
					this.addHtml(this.thisContent)
					// console.log(this.thisContent)
					
				})
				http("reader/book/content.json?source_uuid=" + this.id + "&content_uuid=" + this.latterPageId.secId).then(res =>{
					// console.log(res)
					
					this.latterPage = res.data.content
					this.latterContent =this.StringToHtml(this.latterPage)
					this.addHtml(this.latterContent)
				})
			})
			
		},
		mounted() {
			let body = document.querySelector('#body')
			// console.log(body)
			body.style.fontSize = this.fontSize + 'px'
			body.style.backgroundColor = 'rgb(248 248 248 / 50%)'
			// console.log(body)
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(option.id); //打印出上个页面传递的参数。
			this.id = option.id
			// console.log(this.id)
			// console.log(this.title)
		},
		methods:{
			updateSetting(){
				this.setting = !this.setting
				this.menu = false
			},
			gotoBack(){
				uni.navigateBack()
			},
			updateHighopt(e){
				// console.log(e);
				let body = document.querySelector('#body')
				body.style.filter = `brightness(${e}%)`
			},
			biggerSize(){
				if(this.fontSize> 24){
					// console.log("当前字体已无法增大");	
				}else{
					this.fontSize = this.fontSize+2
					let body = document.querySelector('#body')
					body.style.fontSize = this.fontSize + 'px'
				}
			},
			smallSize(){
				if(this.fontSize < 14){
					// console.log("当前字体已无法减小");
				}else{
					this.fontSize = this.fontSize-2
					let body = document.querySelector('#body')
					body.style.fontSize = this.fontSize + 'px'
				}
			},
			updatemenu(){
				if(this.optText == true || this.setting == true){
					this.optText = false
					this.setting = false
				}else{
					this.menu = !this.menu
				}
			},
			updatebgColor(e){
				let body = document.querySelector('#body')
				if(e == 'black'){
					body.style.backgroundColor = e
					body.style.color = '#ffffffa6'
				}else{
					body.style.backgroundColor = e
					body.style.color = 'black'
				}
			},
			updateOptText(){
				this.menu = !this.menu
				this.optText = !this.optText
			},
			queryIndexId(){
				http("reader/book/info.json?source_uuid=" + this.id).then(res=>{
					// console.log(res)
					
					this.catalog = res.data.catalog
					this.thisPageId = res.data.catalog[this.index]
					console.log(this.thisPageId)
					console.log(this.index)
					// this.latterPageId = res.data.catalog[this.index+1]
					this.querythiscontent()
				})
			},
			querythiscontent(){
				http("reader/book/content.json?source_uuid=" + this.id + "&content_uuid=" + this.thisPageId.secId).then(res =>{
					// console.log(res)
					
					this.thisPage = res.data.content
					this.thisContent =this.StringToHtml(this.thisPage)
					this.addHtml(this.thisContent)
					// console.log(this.thisContent)
					
				})
			},
			scrolltolower(){
				console.log("到达最下边")
				this.queryIndexId()
			},
			// touchLeft(){
			// 	// console.log("touchleift")
			// 	let body = document.getElementById('body').childNodes[this.index]
			// 	body.style.transform = `translateX(-${104  *(this.childindex)}%)`
			// 	body.style.transition = `transform ${0.4}s`
			// 	this.childindex +=1
			// 	console.log("touchleift")
			// },
			// touchRight(){
			// 	console.log("touchright")
			// 	let body = document.getElementById('body').childNodes[this.index]
			// 	if(this.childindex > 1){
			// 		body.style.transform = `translateX(-${104  *(this.childindex-2)}%)`
			// 		body.style.transition = `transform ${0.4}s`
			// 		this.childindex -=1
			// 	}
			// },
			StringToHtml(str){
				var dom = document.createElement('div');
				dom.innerHTML = str;
				dom.style.cssText= "margin-bottom: 40px"
				// var body = document.getElementById('body')
				// console.log(body)
				// body.appendChild(dom)
				return dom;
			},
			addHtml(str){
				var body = document.getElementById('body')
				body.appendChild(str)
				this.index +=1
			}
		}
		
	}
</script>

<style scoped>
ul,li{
	list-style: none;
}

.body{
	width: 750rpx;
	/* font-size: 20px; */
	h1{
		margin-bottom: 40rpx;
	}
	p{
		/* margin-left: 20rpx; */
		text-indent: 40px;
		margin-bottom: 20rpx;
	}
}

.setting-left{
	display: flex;
	margin-left: 20rpx;
}


</style>
