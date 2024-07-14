<template>
	<view>
		<image :src="img" mode=""></image>
		<p class="title">{{title}}</p>
		<p class="author">{{author}}</p>
	</view>
</template>

<script>
	export default {
		name:"classifydetail",
		data() {
			return {
				// id:"",
				// id:id,
			};
		},
		props:["img","title","author","id"],
		created() {
			// this.id = id
			// console.log(this.id)
		},
		methods:{
		}
	}
</script>

<style>
image{
	width: 220rpx;
	height: 300rpx;
}
.title{
	font-weight: 500;
	font-size: 16px;
	max-width: 200rpx;
}
.author{
	margin-top: 5px;
	color: #9e9e9e;
}
</style>