<template>
	<div style="background: #111111;height: 100%;">
		<div class="time" style="display: none;"></div>
		<!-- 顶部影片图片 -->
		<div class="swiper-container" style="width: 90%;margin: 0px auto;padding-top: 20px;">
	        <div class="swiper-wrapper">
	            <div class="swiper-slide" v-for="(item,index) in filmData" :key="index">
					<img :src="item.url">
					<h3>{{item.filmName}}</h3>
					<span>{{item.filmTime}}</span><span>{{item.filmVersion}}</span>
	            </div>
	        </div>
	        <!-- 前进后退 -->
	        <div class="swiper-button-prev swiper-button-white"></div>
    		<div class="swiper-button-next swiper-button-white"></div>
	    </div>
	    <!-- 表格数据 -->
	    <div style="overflow-y: auto; min-height: 200px;max-height:250px; width: 80%;margin: 20px auto 0;">
	    	<table class="table table-hover ">
			  	<thead>
					<tr>
						<th>开始时间</th>
						<th>结束时间</th>
						<th>发行版本</th>
						<th>语言</th>
						<th>放映厅</th>
						<th>余票/总票数</th>
						<th>票价(元/张)</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in filmTableData" :key="index">
						<td attr="startTime">{{item.startTime}}</td>
						<td>{{item.endTime}}</td>
						<td attr="releaseVersion">{{item.releaseVersion}}</td>
						<td attr="filmLanguage">{{item.filmLanguage}}</td>
						<td attr="screenName">{{item.screenName}}</td> 
						<td class="ticketNum">
							<span class="ticketLeft">{{item.moreTickets}}</span>/
							<span class="allTicket">{{item.totalTickets}}</span>
						</td> 
						<td attr="price">{{item.price}}</td>
					</tr>
				</tbody>
			</table>
	    </div>
	</div>
</template>
<script>
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';
	import axios from 'axios'
	export default{
		data(){
			return{
				filmData:[],//影片数据
				filmTableData:[],//影片场次数据
				filmName:'',//影片名称
				filmTime:''//影片时长
			}
		},
		methods:{
			// 获取影片数据
			getFilmData(){
				let date = new Date();
				console.log(date);
				let aa = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&nbsp;'+date.getHours()+':'+date.getSeconds();
		        $('.time').html(aa);
		        let time = $('.time').text();
		        console.log(time);
				axios.get('../../../../../static/filmData.json')
				// axios.get('http://172.23.159.23:8070/posWeb/getFilmMessage/00000001/'+time)
				.then(res=>{
					// console.log(res);
					this.filmData = res.data;
					
				})
				.catch(err=>{
					console.log(err);
				})
			},
			//获取影片场次信息
			getTableData(){
				axios.get('../../../../../static/filmTable.json')
				.then(res=>{
					this.filmTableData = res.data;
					
				})
				.catch(err=>{
					console.log(err);
				})	
			}
		},
		created(){
			
			this.getTableData();

		},
		mounted(){
			//获取当前时间后发送请求
	        this.getFilmData();

			let self = this;
			// 延迟加载 
			setTimeout(function(){
				var mySwiper = new Swiper('.swiper-container', {
					// 前进后退
					navigation: {
					    nextEl: '.swiper-button-next',
					    prevEl: '.swiper-button-prev',
					},
	                slidesPerView : 5,
					slidesPerGroup : 5,
	            });
	            mySwiper.slides[0].style.background="#00bbe8";
	            $(mySwiper.slides[0]).find("h3").css("color","#ffffff");
	    		self.filmName = $(mySwiper.slides[0]).find("h3").html();
	    		self.filmTime = $(mySwiper.slides[0]).find("span").eq(0).html();
	    		
	    		//影片选择
	            $(".swiper-slide").click(function(e){
	   				//点击切换样式
	            	$(e.currentTarget).css("background","#00bbe8").siblings().css("background","none");
	            	$(e.currentTarget).find("h3").css("color","#ffffff").parents().siblings().find("h3").css("color","#01aaeb");
	            	self.filmName = $(e.currentTarget).find("h3").html();
	            	self.filmTime = $(e.currentTarget).find("span").eq(0).html();
	            });

				// 跳转选座页面
				$('.table tbody').on( 'click','tr', function (e) {
	            	let startTime = $(e.currentTarget).find("td[attr=startTime]").html();
	            	let releaseVersion = $(e.currentTarget).find("td[attr=releaseVersion]").html();
	            	let filmLanguage = $(e.currentTarget).find("td[attr=filmLanguage]").html();
	            	let screenName = $(e.currentTarget).find("td[attr=screenName]").html();
	            	let price = $(e.currentTarget).find("td[attr=price]").html();
	            	//获取当天时间
	            	let date = new Date();
	            	let today = (date.getMonth()+1)+'月'+date.getDate()+'日';

	            	self.$router.push({name:"selectSeat",params:{startTime:startTime,releaseVersion:releaseVersion,filmLanguage:filmLanguage,screenName:screenName,filmName:self.filmName,filmTime:self.filmTime,nowTime:today,price:price}});
	            }); 
			},500);             
        },
	}
</script>
<style lang="less" scoped>
	
	.swiper-slide{
		padding-bottom: 10px;
		width: 15% !important;
		margin-left: 40px;
		img{
			width: 92%;
			display: block;
			margin:  3px auto;
		}
		h3{
			color: #01aaeb;
			text-align: center;
			font-size: 14px;
			margin: 12px 0 5px;
		}
		span{
			color: #fff;
			margin-left: 25px ;
			font-size: 12px;
		}
	}
	.swiper-button-next, .swiper-button-prev{
		height: 27px !important;
	}
	.table{
		width: 100%;
		margin: 0 auto;
		thead{
			color: #edebec;
			tr{
				th{
					border-bottom: 1px solid #2d2f31;
				}
			}
		}
		tbody{
			tr{
				td{
					color: #edebec;
					border-bottom: 1px solid #2d2f31;
				}
			}
		}
	}
	.table-hover>tbody>tr:hover{
		background-image: linear-gradient(90deg, #00abeb 0%, #00d0e3 100%);
	}
</style>