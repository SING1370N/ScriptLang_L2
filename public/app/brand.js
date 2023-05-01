
var app = new Vue({
  	el: '#app',
  	data: {
    	brands:null,
    	search:"",
    	btn_text:"Зберегти",
    	brand:{}
  	},
  	methods:{
	  	getBrands: function(){
	  		var self = this;
	        axios.get(BASE_API+"brand").then(function(result){
	            self.brands = result.data.data;
	        }, function(error){
	            console.log(error);
	        });
	    },
	    onSearch: function() {
	       	var self = this;
	       	axios.get(BASE_API+"brand_search?text="+self.search).then(function(result){
	            self.brands = result.data.data;
	        }, function(error){
	            console.log(error);
	        });
	    },
	    onSave: function() {
	       	var self = this;
	       	if (self.btn_text === "Зберегти") {
	       		axios.post(BASE_API+"brand",self.brand).then(function(result){
		            Swal.fire(
					  'Хороша робота!',
					  'Успішне збереження бренду...',
					  'success'
					);
					self.brand = {};
		        }, function(error){
		            console.log(error);
		        });
	       	}else{
	       		axios.put(BASE_API+"brand/"+self.brand.id,self.brand).then(function(result){
		            Swal.fire(
					  'Хороша робота!',
					  'Успішне оновлення бренду...',
					  'success'
					);
		        }, function(error){
		            console.log(error);
		        });
	       	}
	    },
	    onAdd:function(){
	    	this.brand = {};
	    	this.btn_text = "Зберегти";
	    },
	    onEdit:function(data){
	    	var self = this;
	    	self.btn_text = "Оновити";
	       	axios.get(BASE_API+"brand/"+data.id).then(function(result){
	            self.brand = result.data.data;
	            $('#myModal').modal({show:true});
	        }, function(error){
	            console.log(error);
	        });
	    },
	    onDelete:function(data){
	    	var self = this;
	    	Swal.fire({
			  title: 'Підтвердження',
			  text: "Точно бажаєте видалити "+data.name+"?",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Так!'
			}).then((result) => {
			  if (result.value) {
			  	axios.delete(BASE_API+"brand/"+data.id).then(function(result){
		            Swal.fire(
				      'Видалено!',
				      data.name+' було видалено.',
				      'Успіх!'
				    );
				    self.getBrands();
		        }, function(error){
		            console.log(error);
		        });
			    
			  }
			})
	       	
	    }
  	},
  	mounted: function () {
        this.getBrands();
    }
});