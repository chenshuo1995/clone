<template>
	<div class="content">
		<div style="width: 80%;margin: 0 auto;">
			<!-- 座位部分 -->
			<div class="seats-block">
				<div style="overflow: hidden;">
					<ul class="row-container">
						<li v-for="item in 13" :key="item">{{item}}</li>
					</ul>
					<div class="seats-container">
						<div class="screen-logo"></div>
						<h3>首都电影院(西单店){{$route.params.screenName}}</h3>
						<div class="seats-wrapper">
							<div v-for="(item,index) in seatData" :key="index" :colname="item.seat_name" :status="item.seat_state"  class="one" :xaxis="item.seat_x_axis" :code="item.seat_code"></div>
						</div>
					</div>
				</div>
				<ul class="icon-des">
					<li><img src="../../../static/img/putong.png"><span>可选座位</span></li>
					<li><img src="../../../static/img/yishou.png"><span>不可选座位</span></li>
					<li><img src="../../../static/img/select.png"><span>已选座位</span></li>
				</ul>
			</div>
			<!-- 底部信息 -->
			<div class="footer">
				<div class="footer-left">
					<p class="screen-info">
						<span>{{$route.params.filmName}}</span>
						<span>{{$route.params.releaseVersion}}{{$route.params.filmLanguage}}版</span>
						<span>{{$route.params.filmTime}}</span>
						<span>{{$route.params.nowTime}}</span>
						<span>{{$route.params.startTime}}</span>
					</p>
					<div class="seat-detail">
						<div class="pieces">
							<span>座位 :</span>
							<span>({{pieces}}张)</span>
						</div>
						<ul>
							<!-- <li><span>7排2座</span><span>(成)</span></li> -->
						</ul>
						<div class="ticket-tip" v-show="tooltipShow">
							<p code="01"><a><span>成人票</span><span>(35元)</span></a></p>
							<p code="02"><a><span>学生票</span><span>(20元)</span></a></p>
							<p code="03"><a><span>团体票</span><span>(20元)</span></a></p>
						</div>
					</div>
				</div>
				<div class="footer-right">
					<div class="seat-confirm" @click="goCart">座位确认</div>
					<div class="seat-again">
						<p>清除</p>
						<span @click="chooseFilm">重新选片</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import store from "@/././vuex/store"
	export default{
		data(){
			return{
				seatData:[],//座位数据
				maxY:'',//最大列数
				flag:false,//座位背景图点击判断
				obj:'',//座位名称
				code:'',//座位编码
				pieces:0,//影票张数
				tooltipShow:false,
				ticketPriece:'',//点击的影票对象
			}
		},
		methods:{
			//获取座位信息
			getSeat(){
				axios.get("../../../static/selectSeat.json")
				.then(res=>{
					// console.log(res);
					this.seatData = res.data;

				})
				.catch(err=>{
					console.log(err)
				})
			},
			//根据座位状态进行加载,生成座位
			seatLoad(){
				for (var i = 0; i < this.seatData.length; i++) {
					if (this.seatData[i].seat_state == 1) {
						$(".seats-wrapper .one").eq(i).css({
							"background":"url(../../../../static/img/putong.png) 0 0 no-repeat",
							"width":"30px",
							"height":"30px",
							"background-size": "70%"
						})
						let self = this;
						$(".seats-wrapper .one").eq(i).click(function(){
							this.obj= $(this).attr("colname");
							this.code = $(this).attr("code");
							if (this.flag) {
								$(this).css({
									"background":"url(../../../../static/img/putong.png) 0 0 no-repeat",
									"width":"30px",
									"height":"30px",
									"background-size": "70%"
								})
								this.flag = false;
								$("#"+$(this).index()).remove();
								
							}else{
								$(this).css({
									"background":"url(../../../../static/img/select.png) 0 0 no-repeat",
									"width":"30px",
									"height":"30px",
									"background-size": "70%",
									
								})
								this.flag = true;
								let aa = $(this).index();
								$('.seat-detail ul').append('<li id="'+aa+'" code="'+this.code+'"><span style="font-size:15px;">'+this.obj+'</span><span style="font-size:12px;">(成)</span></li>');
								$('.seat-detail ul li').css({
									"float":"left",
									"background": "#1a1e27",
									"margin":"10px 0  0 10px",
									"padding": "5px 10px",
									"cursor":"pointer"
								});
								
							}
							self.pieces = $('.seat-detail ul li').length;
						})
							
					}else if(this.seatData[i].seat_state == 2){
						$(".seats-wrapper .one").eq(i).css("background","none");
					}else{
						$(".seats-wrapper .one").eq(i).css({
							"background":"url(../../../../static/img/yishou.png) 0 0 no-repeat",
							"width":"30px",
							"height":"30px",
							"background-size": "70%"
						})
					}
				}	
			},
			//更改影票类型
			updateTicket(){
				let self = this;
				$(document).on('click',function(e){
				    self.tooltipShow = false;
				});
				//弹框	
				$('.seat-detail ul').on("click","li",function(e){
					e.stopPropagation();//阻止冒泡
					self.tooltipShow = true;
					let left = $(e.currentTarget).offset().left - 100;
					let top = $(e.currentTarget).offset().top -50;
					$(".ticket-tip").css({
						"position":"absolute",
						"top":top+"px",
						"left":left+"px"
					});
					self.ticketPriece = $(e.currentTarget);
				});
				//更改
				$(".ticket-tip").on("click","p",function(e){
					e.stopPropagation();
					let code = $(e.currentTarget).attr("code");
					// console.log(code);
					if (code == "01") {
						$(self.ticketPriece).find("span").eq(1).html("(成)");
					}else if (code == "02"){
						$(self.ticketPriece).find("span").eq(1).html("(学)");
					}else if (code == "03"){
						$(self.ticketPriece).find("span").eq(1).html("(团)");
					}
				})
			},
			//跳转购物车页面
			goCart(){
				if ($('.seat-detail ul li').length > 0) {
					let arr = [];
					for (var i = 0; i < $('.seat-detail ul li').length; i++) {
						let name = $('.seat-detail ul li').eq(i).find("span").text();
						arr.push(name);
					}
					this.$router.push({name:'cart',params:{
							filmName:this.$route.params.filmName,
							nowTime:this.$route.params.nowTime,
							startTime:this.$route.params.startTime,
							filmLanguage:this.$route.params.filmLanguage,
							releaseVersion:this.$route.params.releaseVersion,
							screenName:this.$route.params.screenName,
							pieces:this.pieces,
							price:this.$route.params.price,
							seatName:arr.join("/")
						}
					})
				}
			},
			//重新选片
			chooseFilm(){
				this.$router.go(-1);
			}
		},
		created(){
			this.getSeat();
		},
		mounted(){
			setTimeout(this.seatLoad,500);
			setTimeout(this.updateTicket,500);		
		},
		updated(){
			// 设置影院的宽度
			this.maxY=this.seatData[this.seatData.length-1].seat_y_axis;
			$(".seats-wrapper").width(this.maxY * $(".seats-wrapper .one").width());
		},
		computed:{
			url(){
				return this.$store.state.url;
			}
		},
		store
	}
</script>
<style lang="less" scoped>
	.content{
		background: #111111;
		width: 100%;
		/*height: 100%;*/
		padding-bottom: 13px;
		.seats-block{
			width: 100%;
			overflow: hidden;
			color: #edebec;
			background: #1a1e27;
			border-bottom: 4px solid #01aaeb;
			.row-container{
				float: left;
				width: 5%;
				margin-top: 80px;
				li{
					text-align: center;
					height: 30px;
					line-height: 30px;
					font-size: 16px;
				}
			}
			.seats-container{
				float: left;
				width: 95%;
				.screen-logo{
					height: 45px;
					margin: 10px auto 0;
					background: url(../../../static/img/screen.png) 0 0 no-repeat;
					background-size: 100% 100%;
				}
				h3{
					font-size: 14px;
					width:158px; 
					margin: 0 auto;
					display: block;
				}
				.seats-wrapper{
					overflow:hidden;
					margin: 10px auto;
					.one{
						/*background: url(../../../static/img/putong.png) 0 0 no-repeat;*/
						width: 30px;
						height: 30px;
						background-size: 70%;
						float: left;	
					}
				}
			}
			.icon-des{
				overflow: hidden;
				width: 35%;
				margin: 0 400px 20px;
				li{
					float:left;
					margin-left: 20px;
					img{
						width: 22px;
						height: 22px;
					}
					span{
						color: #edebec;
						font-size: 14px;
						margin-left: 10px;
					}
				}
			}
		}
		.footer{
			/*height: 140px;*/
			overflow: hidden;
			.footer-left{
				float: left;
				width: 60%;
				color: #edebec;
				padding:10px 0 0 20px;
				.screen-info{
					span{
						&:nth-child(1){
							font-size: 16px;
						}
						&:nth-child(2),&:nth-child(3){
							font-size: 12px;
							margin-left: 10px;
						}
						&:nth-child(4),&:nth-child(5){
							font-size: 14px;
							color: #01aaeb;
							margin-left: 10px;
						}
					}
				}
				.seat-detail{
					width: 100%;
					overflow: hidden;
					.pieces{
						float: left;
						width: 8%;
						margin-top: 15px;
						span{
							width: 100%;
							padding: 5px;
							display: inline-block;
							text-align: left;
						}
					}
					ul{
						float: left;
						width: 80%;
						overflow: hidden;
						li{
							float: left;
							background: #1a1e27;
							margin:10px 0  0 10px;
							padding: 5px 10px;
						}
					}
					.ticket-tip{
						width: 290px;
						height: 40px;
						z-index: 100;
						background: #00abeb;
						border-radius: 5px;
						position: absolute;
						left: 0;
						top: 0;
						p{
							float: left;
							height: 100%;
							line-height: 40px;
							padding: 0 10px;
							a{
								color: #fff;
								text-decoration: underline;
							}
							span{
								&:nth-child(1){
									font-size: 14px;
								}
								&:nth-child(2){
									font-size: 12px;
								}
							}
						}
					}
					.ticket-tip:after{
						content: '';
						width: 0;
						height: 0;
						color: transparent;
						position: absolute;
						border: 10px solid;
						border-top-color: #00abeb;
						top: 100%;
						left: 50%;
						margin-left: -15px;  
					}
				}
			}
			.footer-right{
				float: right;
				width: 30%;
				overflow: hidden;
				margin-top: 30px;
				.seat-confirm{
					float: left;
					width: 170px;
					height: 90px;
					color: #edebec;
					background-image: linear-gradient(90deg, #00abeb 0%, #00d0e3 100%);
					text-align: center;
					line-height: 90px;
					font-size: 20px;
					cursor: pointer;
					border-radius: 5px;
				}
				.seat-again{
					float: left;
					margin-left: 20px;
					width: 100px;
					text-align: center;
					color: #edebec;
					p{
						text-decoration: underline;
						margin-top: 8px;
					}
					span{
						display: inline-block;
						background-image: linear-gradient(90deg, #00abeb 0%, #00d0e3 100%);
						cursor: pointer;
						height: 40px;
						padding: 10px;
						margin-top: 8px;
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>