
var app = new Vue({
  	el: '#app',
  	data: {
    	items:null,
    	search:"",
    	btn_text:"Зберегти",
    	item:{},
    	select_brand:null,
    	brands:null
  	},
  	methods:{
	  	getItems: function(){
	  		var self = this;
	        axios.get(BASE_API+"item").then(function(result){
	            self.items = result.data.data;
	            axios.get(BASE_API+"brand").then(function(result_brand){
		            self.brands = result_brand.data.data;
		        }, function(error){
		            console.log(error);
		        });
	        }, function(error){
	            console.log(error);
	        });
	    },
	    onSearch: function() {
	       	var self = this;
	       	axios.get(BASE_API+"item_search?text="+self.search).then(function(result){
	            self.items = result.data.data;
	        }, function(error){
	            console.log(error);
	        });
	    },
	    onSave: function() {
	       	var self = this;
	       	self.item.brand_id = self.select_brand;
	       	if (self.btn_text === "Зберегти") {
	       		axios.post(BASE_API+"item",self.item).then(function(result){
		            Swal.fire(
						'Хороша робота!',
						'Успішне збереження заліза...',
						'success'
					);
					self.item = {};
		        }, function(error){
		            console.log(error);
		        });
	       	}else{
	       		axios.put(BASE_API+"item/"+self.item.id,self.item).then(function(result){
		            Swal.fire(
						'Хороша робота!',
						'Успішне оновлення заліза...',
						'success'
					);
		        }, function(error){
		            console.log(error);
		        });
	       	}
	    },
	    onAdd:function(){
	    	this.item = {};
	    	this.btn_text = "Зберегти";
	    	this.select_brand = null;
	    },
	    onEdit:function(data){
	    	var self = this;
	    	self.btn_text = "Оновити";
	       	axios.get(BASE_API+"item/"+data.id).then(function(result){
	            self.item = result.data.data;
	            self.select_brand = self.item.brand.id;
	            $('#myModal').modal({show:true});
	        }, function(error){
	            console.log(error);
	        });
	    },
	    onDelete:function(data){
	    	var self = this;
	    	Swal.fire({
			  title: 'Підтвердження!',
			  text: "Бажаєте видалити "+data.name+"?",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Так, видалити!'
			}).then((result) => {
			  if (result.value) {
			  	axios.delete(BASE_API+"item/"+data.id).then(function(result){
		            Swal.fire(
				      'Видалення!',
				      data.name+' видалено!',
				      'success'
				    );
				    self.getItems();
		        }, function(error){
		            console.log(error);
		        });
			    
			  }
			})
	       	
	    }
  	},
  	mounted: function () {
        this.getItems();
    }
});