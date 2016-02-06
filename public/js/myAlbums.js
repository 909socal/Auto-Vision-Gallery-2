$(document).ready(init);

var arrayOfItemsObjectsG = [];
var arrayOfRowContainersObjectsG = [];
var originalArrayOfItemsObjectsG = [];
var priceTotalG = 0; 
var arrayOfItemsObjectsSortedByNameG = [];
var arrayOfItemsObjectsSortedByPriceG = [];
var sortedByNameFlagG = false; 
var sortedByPriceFlagG = false; 
	$('#logme').hide();
    $('#regme').hide();
function init(){
	$('.album-list').on('click', '.name-col', displayItemDetaialbum);
	$('.album-list').on('click', '.delete-col', deleteItem);  
	$('.album-list').on('click', '.edit-col', editItem);  
	$('.album-list').on('click', '.barter', barterItemalbum);
	$('.album-list').on('click', '.name-sort', sortByName); 

	$('#logme').hide();
    $('#regme').hide();

	getItems();
}

function getItems(){
	
	$.get('/transactions', function(data){
			arrayOfItemsObjectsG = data.slice();  
			originalArrayOfItemsObjectsG = data.slice();
			
		
   });
}


function deleteItem(){
	var album = $(this).closest('tr');
	var albumId = album.attr("id");
	var albumIndex = album.index();
	console.log(itemIndex)

	$.ajax({
  	method: "DELETE",
 		url: "/transactions/" + albumId
		})
		.done(function(status){
			album.remove();
			arrayOfItemsObjectsG.splice(albumIndex,1);
		
 		});
}


///FIX
function displayItemDetails(){
	var albumId = $(this).closest('tr').attr("id");
	location.href = '/itemDetails/' + albumId;
}




