<template>
	<div class="cart">
		<div class="cart-content">
			<!-- 购物车详情 -->
			<div class="order">
				<table class="table jambo_table bulk_action"  v-if="tableShowflag">
						<thead>
							<tr style="background: #2b3242;">
								<th>订单详情</th>
								<th>数量</th>
								<th>金额</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th><b class="newday">影票</b></th>
								<th></th>
								<th></th>
							</tr>
							<tr v-for="item in ticket">
								<th>{{item.filmName}}/{{item.nowTime}}/{{item.startTime}}/{{item.filmLanguage}}/{{item.releaseVersion}}/{{item.screenName}}<br>{{item.seatName}}</th>
								<th>X{{item.pieces}}</th>
								<th>{{item.allMoney}}</th>
							</tr>
						</tbody>
					</table>
			</div>
			<!-- 支付方式 -->
			<div class="pay">
				<div class="pay-top">
					<h5>订单应付总金额:</h5>
					<p><span>￥</span><span>{{totalMoney.toFixed(2)}}</span></p>
				</div>
				<div class="pay-bottom" v-if="payShow">
					<ul>
						<li @click="cash">现金</li>
						<li>票券</li>
						<li>微信</li>
						<li>支付宝</li>
						<li>会员卡</li>
						<li>微信</li>
						<li>银行卡</li>
						<li>混合支付</li>
						<li>挂单</li>
					</ul>
					<div class="clear-btn" @click="empty">清空</div>
					<p><a>留座</a><a>订票</a></p>
				</div>
				<div class="change" v-if="changeShow">
					<p>实收:<input type="text" name="" v-model="money"></p>
					<p>找零:<span v-if="surpluShow">￥{{surplus}}</span></p>
					<div style="margin-top: 40px;">
						<button>确定</button><button>快速结算</button>
						<button class="cancel" @click="cancel">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import store from '@/./././vuex/store' 
	export default{
		data(){
			return{
				tableShowflag:false,
				payShow:true,
				changeShow:false,
				totalMoney:0,//应付总金额
				money:'',//实收金额
				surpluShow:false,//找零是否加载
			}
		},
		methods:{
			//存放购物车数据
			addTicket:function(){
				// 座位页传送的数据
				let ticketlist = {
					filmName:this.$route.params.filmName,
					nowTime:this.$route.params.nowTime,
					startTime:this.$route.params.startTime,
					filmLanguage:this.$route.params.filmLanguage,
					releaseVersion:this.$route.params.releaseVersion,
					screenName:this.$route.params.screenName,
					pieces:this.$route.params.pieces,
					price:this.$route.params.price,
					allMoney:this.$route.params.pieces*this.$route.params.price,
					seatName:this.$route.params.seatName
				};
				if (this.$route.params.filmName==undefined) {
				}else{
					this.ticket.push(ticketlist);
				}	
			},
			// 总金额结算
			gettotalMoney(){
				for (var i = 0; i < this.ticket.length; i++) {
					 this.totalMoney+=this.ticket[i].allMoney;
				}	
			},
			//现金支付跳转
			cash(){
				this.payShow = false;
				this.changeShow = true;
			},
			//取消现金支付
			cancel(){
				this.payShow = true;
				this.changeShow = false;
			},
			//清空购物车
			empty(){
				this.totalMoney = 0;
				this.$store.state.ticket = [];
				alert("确定要清空购物车吗?");
				this.tableShowflag = false;
			}
		},
		created(){
			this.addTicket();
			this.gettotalMoney();
		},
		mounted(){
			// 购物车为空提示是否出现
			if ( this.$store.state.ticket.length==0 && this.$route.params.filmName==undefined ) {
				// $(".carttip").css("display","block");
			}else{
				this.tableShowflag = true;
			}
		},
		watch:{
			//监听实收金额 找零是否加载
			money:function(newVal,oldVal){
				if (newVal == "") {
					this.surpluShow = false
				}else{
					this.surpluShow = true;
				}
			}
		},
		computed:{
			//找零
			surplus(){
				return this.money - this.totalMoney;
			},
			//购物车数据
			ticket(){
				return this.$store.state.ticket;
			},
		},
		store
	}
</script>
<style lang="less" scoped>
	.cart{
		margin: 5px 0;
		color: #fff;
		font-size: 12px;
		height: 100%;
		.cart-content{
			width: 100%;
			height: 100%;
			overflow: hidden;
			.order{
				float: left;
				width: 75%;
				height: 100%;
				background: #1a1e27;
				.table{
					margin-top: 20px;
					thead{
						tr{
							th{
								border-bottom: 1px solid #2d2f31;
								padding-left: 40px;
							}
						}
					}
					tbody{
						tr{
							th{
								border-bottom: 1px solid #2d2f31;
								padding-left: 40px;
							}
						}
					}
				}
			}
			.pay{
				float: right;
				width: 25%;
				height: 100%;
				background: #111111;
				.pay-top{
					padding-bottom: 20px;
					h5{
						padding-left: 20px;
					}
					p{
						text-align: center;
						margin-top: 40px;
						
						span{
							&:nth-child(1){
								font-size: 18px;
							}
							&:nth-child(2){
								font-size: 40px;
							}
						}
					}
				}
				.pay-bottom{
					margin-top: 10px;
					ul{
						overflow: hidden;
						padding-left: 13px;
						li{
							float: left;
							width: 70px;
							height: 50px;
							margin: 6px;
							text-align: center;
							font-size: 16px;
							line-height: 50px;
							background: #1a1e27;
							color: #01aaeb;
							border-radius: 5px;
							cursor: pointer;
						}
						li:hover{
							background-image: linear-gradient(90deg, #00abeb 0%, #00d0e3 100%);
							color: #fff;
						}
					}
					.clear-btn{
						display: block;
						text-align: center;
						margin: 30px auto;
						width: 80%;
						padding: 10px 20px;
						background: #00abeb;
						border-radius: 5px;
						font-size: 16px;
						cursor: pointer;
					}
					p{
						margin-top: 60px;
						a{
							text-decoration: underline;
							margin:0 30px;
						}
					}
				}
				.change{
					width: 100%;
					margin-top: 50px;
					p{
						text-align: left;
						margin-left: 20px;
						color: #01aaeb;
						font-size: 16px;
						input{
							background: transparent;
							border: 1px solid #01aaeb;
							outline: none;
							width: 180px;
							height: 35px;
							border-radius: 5px;
							padding: 0 10px;
							margin-left: 10px;
						}
						span{
							margin-left: 40px;
							color: #fff;
							font-size: 14px;
						}
					}
					button{
						font-size: 16px;
						background-image: linear-gradient(90deg, #00abeb 0%, #00d0e3 100%);
						outline: none;
						border: 1px solid transparent;
						margin-left: 18px;
						border-radius: 5px;
						display: block;
						float: left;
						width: 40%;
						height: 40px;
						
					}
					.cancel{
						width: 87%;
						margin: 20px 0 0 18px;
					}
				}
			}
		}
	}
</style>
