/*var list = [
	{
		title:"吃饭打豆豆",
		isChecked:false //false 为任务未完成 
	},
	{
		title:"吃饭打豆豆2",
		isChecked:true
	}
];*/

var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));//转字符串
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];//json转数组
	}
};
var list = store.fetch("new_s");
//渲染列表
/*
	v-for指令 
	v-for ="item in list" 在html行间
*/
var vm = new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		edtorTodos:'',//记录正在编辑的数据
		beforTitle:'',//用来记录正在编辑的数据的title
		visibility: 'all'// 通过这个属性值的变化 对数据进行筛选默认为all
	},
	watch:{//监控 key值为被监控的对象
		/*list:function(){//浅监控 无法监控list对象里面的变化
			//list属性发生变化，就执行函数
			store.save("newStr",this.list)
		}*/
		list:{//深度监控
			handler:function(){
				store.save("new_s",this.list)
			},
			deep:true
		}
	},
	methods:{//统一存放事件处理函数
		/*addTodo:function(){
			
		}*/
		addTodo(){
			//Es6简写函数          向list中添加一项任务 
			/*	
			事件处理函数中的this指向当前这个根实例
			*/
			if(this.todo){
				this.list.push({
					title:this.todo,
					isChecked: false
				});
				this.todo='';
				
			}
			
		},
		deleteTodo(todo){
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		},
		entorTodo(todo){//编辑任务
			this.edtorTodos = todo;
			this.beforTitle= todo.title;
		},
		edtored(todo){//编辑成功
			this.edtorTodos='';//让div显示出来 input隐藏
		},
		cancelTodo(todo){//取消编辑
			todo.title=this.beforTitle;
			this.edtorTodos='';
		}
	},
	directives:{//自定义指令
		"focus":{
			update(ev,binding){
				//ev 当前指令操作的元素
				//binding 当前指令的表达式对象
				if(binding.value){
					ev.focus();
				}
			}
		}
	},
	computed:{//计算属性
		noCheckedLength:function(){
			return	this.list.filter(function(item){
	        		return !item.isChecked
	        	}).length;
		},
		filteredList:function(){//筛选list数据规则
			var filter = {
				all:function(list){
					return list;
				},
				finished:function(list){
					return list.filter(
						function(item){
							return item.isChecked;
						}
					);
				},
				unfinished:function(list){
					return list.filter(
						function(item){
							return !item.isChecked;
						}
					);
				}
			};
			return filter[this.visibility]?filter[this.visibility](list):list;
		}
	}
});
function watchHashChange(){
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
	
}
window.addEventListener("hashchange",watchHashChange)