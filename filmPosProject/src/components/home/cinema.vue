<template>
 	<div class="cinema">
		<span>影院编码:12345678</span>
		<span>影院名称:大地影院xxxxx</span>
		<span>影院状态:测试</span>
		<span class="name">admin</span>
		<span class="cinema-day"></span>
		<span class="hours">{{hourstr}}</span>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				showtime:'',
				hourstr:'',
			}
		},
		methods:{
			showTime(){
				let self = this;
				
				setInterval(function(){
					var date = new Date();
					var hh=date.getHours();
					if (hh<10) {
						hh = "0"+hh;
					}  
				    var mm=date.getMinutes(); 
				    if (mm<10){
						mm = "0"+mm;
					} 
				    var ss=date.getSeconds();
					if (ss<10) {
						ss = "0"+ss;
					}
					self.hourstr = hh+":"+mm+":"+ss;
				},1000)
				
			}
		},
		created(){
			this.showTime();
		},
		mounted(){
			// 设置年月日
			var date = new Date();
			var a = new Array("日", "一", "二", "三", "四", "五", "六");
			this.showtime = '周'+a[date.getDay()]+'&nbsp;&nbsp;'+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
			$('.cinema-day').html(this.showtime);

		},
		updated(){
			this.showTime();
		}
	}
</script>

<style lang="less" scoped>
	.cinema{
			padding-top: 5px;
			overflow: hidden;
			color: #f4f4f4;
			font-size: 12px;
			span{
				margin-left: 10px;
				display: inline-block;
				&:nth-child(2){
					margin-left: 20px;
				}
				&:nth-child(3){
					margin-left: 20px;
				}
				&:nth-child(4){
					margin-left: 390px;
				}
			}
			.cinema-day{
				margin-right: 20px;
			}
			
		}
</style>
