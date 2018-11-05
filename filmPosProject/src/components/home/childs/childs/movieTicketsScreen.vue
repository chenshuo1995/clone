<template>
	<div style="background: #111111;height: 100%;">
		<div class="time">
			<div>
				<button class="actbtn">今天</button><button>明天</button><button>后天</button><button>更多</button>
			</div>
		</div>
		<div class="content">
			<ul>
				<li v-for="(item,index) in screenArr" :key="index">{{item}}</li>
			</ul>
			<div style="overflow-y: auto; min-height: 500px;max-height:750px; width: 90%;margin: 20px auto;">
		    	<table class="table table-hover ">
				  	<thead>
						<tr>
							<th>影片</th>
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
							<td attr="filmName" :rowspan="item.filmNamespan" :class="{hidden: item.filmNamedis}">{{item.filmName}}</td>
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
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				screenArr:["1号厅","2号厅","3号厅","4号厅","5号厅","6号厅","7号厅","8号厅","9号厅","10号厅","11号厅","12号厅","13号厅"],
				filmTableData:[],//影厅影片信息
				today:''//日期
			}
		},
		methods:{
			// 获取影片场次信息
			getTableData(){
				axios.get('../../../../../static/filmTable.json')
				.then(res=>{
					this.filmTableData = res.data;
					this.getData(this.filmTableData);
				})
				.catch(err=>{
					console.log(err);
				})
			},
			//对影片重复数据处理
			getData(list){
                // console.log(list[0]);
                for ( let field in list[0]) {
                    var k = 0;
                    while (k < list.length) {
                        list[k][field + 'span'] = 1;
                        list[k][field + 'dis'] = false;
                        for (var i = k + 1; i <= list.length - 1; i++) {
                            if (list[k][field] == list[i][field] && list[k][field] != '') {
                                list[k][field + 'span']++;
                                list[k][field + 'dis'] = false;
                                list[i][field + 'span'] = 1;
                                list[i][field + 'dis'] = true;
                            } else {
                                break;
                            }
                        }
                        k = i;
                    }
                }
                return list;
            },
            //日期
            getDateStr(dayCount){    
	             var dd = new Date(); 
	             dd.setDate(dd.getDate()+dayCount);//设置日期  
	             var m = dd.getMonth()+1;//获取当前月份的日期  
	             var d = dd.getDate();  
	             this.today = m+'月'+d+'日'  
	        } 
		},
		created(){
			this.getTableData();

		},
		mounted(){
			let self = this;
			self.getDateStr(0);
			// 顶部时间栏切换
			$(".time div").find("button").click(function(){
				$(this).addClass("actbtn").siblings().removeClass();
	           	if ($(this).html()=="今天") {
	           		self.getDateStr(0);
	           	}else if($(this).html()=="明天"){
	           		self.getDateStr(1);
	           	}else if($(this).html()=="后天"){
	           		self.getDateStr(2);
	           	}
			})
			// 影厅栏切换
			$(".content ul").find("li").click(function(){
				$(this).addClass("actli").siblings().removeClass();
			})
			
            $('.table tbody').on( 'click','tr', function (e) {
            	// console.log(e.currentTarget);
            	let filmName = $(e.currentTarget).find("td[attr=filmName]").html();
            	let startTime = $(e.currentTarget).find("td[attr=startTime]").html();
            	let releaseVersion = $(e.currentTarget).find("td[attr=releaseVersion]").html();
            	let filmLanguage = $(e.currentTarget).find("td[attr=filmLanguage]").html();
            	let screenName = $(e.currentTarget).find("td[attr=screenName]").html();
            	let price = $(e.currentTarget).find("td[attr=price]").html();

            	self.$router.push({name:"selectSeat",params:{startTime:startTime,releaseVersion:releaseVersion,filmLanguage:filmLanguage,screenName:screenName,filmName:filmName,nowTime:self.today,price:price}});
            }) 
		}
	}
</script>
<style lang="less" scoped>
	.time{
		div{
			width: 20%;
			margin: 10px auto;
			button{
				background: transparent;
				color: #edebec;
				border: 1px solid #edebec;
				outline: none;
				padding: 5px 10px;
				&:first-child{
					border-top-left-radius: 3px;
					border-bottom-left-radius: 3px;
					margin-right:-1px;
				}
				&:last-child{
					border-top-right-radius: 3px;
					border-bottom-right-radius: 3px;
				}
				&:not(:last-child){
					margin-right:-1px;
				};
			}
			button:hover{
				border-color: #01aaeb;
			}
			.actbtn{
				border-color: #01aaeb;
				color: #01aaeb;
			}
		}
	}
	.content{
		overflow: hidden;
		ul{
			display: block;
			overflow: hidden;
			margin-top: 20px;
			li{
				float: left;
				color: #edebec;
				background: #2e2f31;
				margin-left: 22px;
				padding:5px 10px;
				border-radius: 5px;
				cursor: pointer;
			}
			.actli{
				background-image: linear-gradient(90deg, #00abeb 0%, #00d0e3 100%);
			}
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
						&:first-child{
							border-right: 1px solid #2d2f31;
						}
					}
					
				}
			}
		}
		.table-hover>tbody>tr:hover{
			background-image: linear-gradient(90deg, #00abeb 0%, #00d0e3 100%);
		}
	}
</style>
