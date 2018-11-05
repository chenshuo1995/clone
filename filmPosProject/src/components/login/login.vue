<template>
	<div class="login">
	  	<div class="content">
	    	<div class="login_bg"><img src="../../../static/img/bg.png" alt=""></div>
	    	<div class="input_box">
	    		<div class="login_logo"><img src="../../../static/img/logo.png" alt=""></div>
	    		<div class="accout">
	    			<i></i>
	    			<input type="text"  placeholder="请输入登录账号"/>
	    		</div>
	    		<div class="pass">
	    			<i></i>
	    			<input type="password"  placeholder="请输入登录密码"/>
	    		</div>
	    		<div class="btns">
	    			<button class="login_btn" @click="login">登录</button>
	    		</div>
	    	</div>
	  </div>
  	</div>
</template>

<script>
	export default {
		mounted(){
			$(window).resize(function(){
				
			})
			$('.login').css({'height':$(window).height()+'px'});
		},
		methods:{
			login(){
				this.$router.push({name:"movieTicketsFilm"});
			}
		}
	}
</script>

<style lang="less" scoped>
	.login{
		 background: #1c1f24;
	}
	.content{
		width: 100%;
		height: 100%;
		position: relative;
		.login_bg{
			height: 100%;
			width: 50%;
			position: absolute;
			left: 0;
			top: 0;
			display: block;
			img{
				display: block;
				width: 80%;
				height: 100%;
			}
		}
		.input_box{
			width: 50%;
			position: absolute;
			right: 10rem;
			top: 7rem;
			.login_logo{
				width: 100%;
				img{
					width: 55%;
					height: 100%;
					display: block;
					margin:  0 auto;
				}
			}
			.accout{
				position: relative;
				color: #545464;
				background: #fff;
				border: 1px solid #d9d9e8;
				border-radius: 31px;
				width: 396px;
				height: 66px;
				margin: 60px auto 34px;	
				i{
					position: absolute;
					left:3rem;
					top: 1.2rem;
					background: url(../../../static/img/login_nu.png) 0 0 no-repeat;
					background-size: 100% 100%;
					display: block;
					width: 30px;
					height: 30px;
				}
				input{
					background: #FFFFFF;
					display: block;
					outline: none;
					font-size: 18px;
					padding-left: 7rem;
					margin: 1.6rem 0 0 1rem;
					background: transparent;
				}
			}
			.pass{
				position: relative;
				background: #fff;
				color: #545464;
				border: 1px solid #d9d9e8;
				border-radius: 31px;
				width: 396px;
				height: 66px;
				margin: 60px auto 34px;	
				i{
					position: absolute;
					left: 3rem;
					top: 1.2rem;
					background: url(../../../static/img/login_password.png) 0 0 no-repeat;
					background-size: 90% 100%;
					display: block;
					width: 30px;
					height: 30px;
				}
				input{
					background: #FFFFFF;
					display: block;
					outline: none;
					font-size: 18px;
					padding-left: 7rem;
					margin: 1.6rem 0 0 1rem;
					background: transparent;
				}
			}
			.btns{
				button{
					border-radius: 31px;
					background-image: linear-gradient(90deg, #00abeb 0%, #00d0e3 100%);
					font-size: 22px;
					border: 1px solid #00abeb;
					outline: none;
					width: 396px;
					height: 66px;
					margin:34px auto;
					display: block;
					color:#fff;
				}
				.login_btn:hover{
					background: deepskyblue;
				}
			}
		}
	}
	input::-webkit-input-placeholder{ /*WebKit browsers*/
		color: #545365;
	}

	input::-moz-input-placeholder{ /*Mozilla Firefox*/
		color: #545365;
	}

	input::-ms-input-placeholder{ /*Internet Explorer*/ 
		color: #545365;
	}
</style>
