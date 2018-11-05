<template>
	<div class="content">
			<div style="width: 80%;margin: 0 auto;">
				<cinema></cinema>
			</div>
			<div style="width: 80%; height:100%;margin: 0 auto;">
				<router-view/>	    
			</div>
			<div class="footer">
				<div class="footer-left">
					<button class="exit">退出</button>
					<div>
						<router-link to='/home/movieTickets/movieTicketsScreen'>影厅</router-link>
						<router-link to='/home/movieTickets/movieTicketsFilm'>影片</router-link>
					</div>
				</div>
				<div class="nav">
					<router-link to='/home/movieTickets'>
						<i class="icon-wodedianyingpiao nav-icon"></i>
						<p>影票</p>
					</router-link>
					<router-link to='/home/goods'>
						<i class="icon-weibiaoti2fuzhi14 nav-icon"></i>
						<p>卖品</p>
					</router-link>
					<router-link to='/home/cart'>
						<i class="icon-gouwuche nav-icon"></i>
						<p>购物车</p>
					</router-link>
					<router-link to='/login'>
						<i class="icon-membership-card_icon nav-icon"></i>
						<p>会员卡</p>
					</router-link>
					<router-link to='/login'>
						<i class="icon-saoma nav-icon"></i>
						<p>扫码</p>
					</router-link>
					<router-link to='/home/aa'>
						<i class="icon-gengduo nav-icon"></i>
						<p>更多</p>
					</router-link>
				</div>
				<div class="logo">
					<img src="../../../static/img/logo.png" alt="">
				</div>
			</div>
	</div>
</template>
<script>
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';
	import cinema from '../home/cinema.vue'
	import '../../assets/icon/iconfont.css'
	export default{
		components:{cinema},
		data(){
			return{
				
			}
		},
		mounted(){
            // 设置整体页面高度
            $('.content').css({'height':$(window).height()+'px'});
            let self = this;
            $(".exit").click(function(){
            	self.$router.push({name:"login"})
            })   
        },
        methods:{

        }
	}
</script>
<style lang="less" scoped>
	.content{
		background: #000000;
		overflow: hidden;
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 136px;
		width: 80%;
		height: 80px;
		margin: 0 auto;
		background: #1c1f24;
		.footer-left{
			width: 20%;
			height: 100%;
			float: left;
			border-top: 1px solid #01aaeb;
			box-sizing: border-box;
			.exit{
				background:#111111;
				color: #edebec;
				border: none;
				margin: 30px;
				border-radius: 3px;
				display: block;
				width: 50px;
				height: 30px;
				line-height: 30px;
				float: left;
				outline: none;
			}
			div{
				float: right;
				width: 50px;
				margin:5px 10px;
				a{
					display: block;
					background:#111111;
					color: #edebec;
					font-size: 14px;
					border:1px solid  #edebec;
					border-radius: 5px;
					margin-top: 8px;
					text-align: center;
					padding:3px 5px;
					text-decoration: none;
				}
				.router-link-active{
					border: 1px solid #01aaeb;
					color: #01aaeb;
				}
			}
		}
		.nav{
			width: 60%;
			height: 80%;
			float: left;
			a{
				float: left;
				width: 16.66%;
				border-top: 1px solid #01aaeb;
				box-sizing: border-box;
				text-decoration: none;
				
				.nav-icon{
					font-size: 35px;
					display: block;
					width: 35px;
					margin:0 auto;
					color: #edebec;
				}
				p{
					width: 100%;
					text-align: center;
					font-size: 14px;
					margin-bottom: 6px;
					color: #edebec;
				}
			}
			.router-link-active{
				border: 1px solid #01aaeb;
				border-bottom-left-radius: 5px;
				border-bottom-right-radius: 5px;
				border-top: none;
				background: #111111;
				.nav-icon{
					color:#01aaeb;
				}
				p{
					color:#01aaeb; 
				}
			}
		}
		.logo{
			float: left;
			width: 20%;
			border-top: 1px solid #01aaeb;
			img{
				width: 90%;
				display: block;
				margin: 15px auto;
			}
		}
	}
	
</style>