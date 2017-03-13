//使用组件  先要注册组件
//组件就是自定义标签   命名方式： 驼峰() && 烤串(kaba-case) 
//组件中props 为绑定在组件上的属性 用来传递数据
//组件中的data必须是function形式
/*
	全局注册
 */
Vue.component("custom-select",{
	data:function(){
		return {
			selectShow:false,
			val:""  
		}
	},
	props:["btnValue","list"],//btnValue 必须驼峰
	template:`<section class="warp">
			<div class="searchIpt clearFix">
				<div class="clearFix">
					<input type="text" class="keyWord" v-bind:value="val" @click="{selectShow=!selectShow}"/>
					<input type="button" :value="btnValue">
					<span></span>
				</div>
				<custom-list 
					v-show="selectShow" 
					:list="list"
					v-on:receive="changeValueHandle"
				></custom-list>
			</div>
		</section>`,
	methods:{
		changeValueHandle(value){
			this.val = value;
		}
	}
});

Vue.component("custom-list",{
	props:['list'],
	template:`<ul class="list" >
					<li v-for="item of list" @click="selectValueHandle(item)">{{item}}</li>
				</ul>`,
	methods:{
		selectValueHandle:function(item){
			//在子组件有交互，数据要放到父组件里
			//把li中的value 传给父组件中的val
			//需要用到自定义事件    告知父组件 $emit("父组件事件")
			this.$emit("receive",item)
		}
	}
});




var data={
	list1:['北京','上海','杭州','深圳'],
	list2:['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
}
new Vue({
	el:"#app",
	data:data
})

