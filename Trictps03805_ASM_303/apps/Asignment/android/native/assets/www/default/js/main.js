
/* JavaScript content from js/main.js in folder common */

function wlCommonInit(){
	 loadFeeds();
	 loadTypeFeeds();
	 
}

function loadFeeds(){
	var invocationData = {
			adapter : 'CoffeeAdapter',
			procedure : 'getCoffeeAdapters',
			parameters : []
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadFeedsSuccess,
		onFailure : loadFeedsFailure
	});
}

function loadFeedsSuccess(result){
	WL.Logger.debug("Đọc dữ liệu thành công !");
	if (result.invocationResult.resultSet.length>0) 
		displayFeeds(result.invocationResult.resultSet);
	else 
		loadFeedsFailure();
}

function loadFeedsFailure(result){
	WL.Logger.error("Đọc dữ liệu thất bại");
	WL.SimpleDialog.show("EngadgetReader", "Cannot retrieve feed. Please check your internet connectivity.", 
	[{
		text : 'Reload App',
		handler : WL.Client.reloadApp 
	}]);
}

function displayFeeds(items){
	var tbody = $('#itemsList');
	for (var i = 0; i < items.length; i++) {
		var tr = $('<tr/>');
		var name = $('<td/>').html(items[i].TenSP);
		tr.append(name);
		var type = $('<td/>').html(items[i].TenLoai);
		tr.append(type);
		var price = $('<td/>').html(items[i].GiaSP);	
		tr.append(price);
		var btnupdate = $('<td/>');	
		var fup = $('<button/>', {'onclick': 'fUpdate("' + items[i].MaSP + '")'
			, 'type': 'button', 'class': 'btn btn-warning', 'data-toggle': 'modal',  'data-target': '#myModal'}).html("Cập nhật");
		btnupdate.append(fup);
		tr.append(btnupdate);
		var btndelete = $('<td/>');	
		var fde = $('<button/>', {'onclick': 'fDelete("' + items[i].MaSP + '")'
			,'type': 'button', 'class': 'btn btn-danger'}).html("Xoá");
		btndelete.append(fde);
		tr.append(btndelete);
		
		tbody.append(tr);
	}
}
function loadTypeFeeds(){
	var invocationData = {
			adapter : 'CoffeeAdapter',
			procedure : 'getTypeCoffeeAdapters',
			parameters : []
		};
	
	WL.Client.invokeProcedure(invocationData,{
		onSuccess : loadTypeFeedsSuccess,
		onFailure : loadTypeFeedsFailure
	});
}

function loadTypeFeedsSuccess(result){
	WL.Logger.debug("Đọc dữ liệu thành công !");
	if (result.invocationResult.resultSet.length>0) 
		displayTypeFeeds(result.invocationResult.resultSet);
	else 
		loadTypeFeedsFailure();
}

function loadTypeFeedsFailure(result){
	WL.Logger.error("Đọc dữ liệu thất bại");
	WL.SimpleDialog.show("EngadgetReader", "Cannot retrieve feed. Please check your internet connectivity.", 
	[{
		text : 'Reload App',
		handler : WL.Client.reloadApp 
	}]);
}

function displayTypeFeeds(items){
	var select = $('#type');
	for (var i = 0; i < items.length; i++) {
		var optionname = $('<option/>').html(items[i].TenLoai);
		select.append(optionname);
	}
}
function Add(){
	$("#up").hide();
	$("#add").show();
}
function AddFeeds(){
	var id = $("#id").val();
	var name = $("#name").val();
	var type = $("#type").val();
	var price = $("#price").val();
	var des = $("#des").val();
	
    var invocationData = {
            adapter 	: 'CoffeeAdapter',
            procedure 	: 'addCoffeeAdapter',
            parameters 	: [id, name, des, price, type]
        };
     
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : addFeedsSuccess,
        onFailure : addFeedsFailure
    });

}
 
function addFeedsSuccess(){
	$("#lbl_add").show();
	$("#AppDiv").show();
}
function addFeedsFailure(){
	$("#lbl_add_fail").show();
}
function UpdateCoffee(){
	var id = $("#id").val();
	var name = $("#name").val();
	var type = $("#type").val();
	var price = $("#price").val();
	var des = $("#des").val();
	
	
    var invocationData = {
            adapter 	: 'CoffeeAdapter',
            procedure 	: 'updateCoffeeAdapter',
            parameters 	: [name, des, price, type , id]
        };
     
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : updateFeedsSuccess,
        onFailure : updateFeedsFailure
    });
}
function updateFeedsSuccess() {
	$("#lbl_update").show();
	$("#AppDiv").show();
}
function updateFeedsFailure() {
	$("#lbl_update_fail").show();
}

function fUpdate(id) {
	$("#add").hide();
	$("#up").show();
	var invocationData = {
            adapter 	: 'CoffeeAdapter',
            procedure 	: 'getByIDAdapters',
            parameters 	: [id]
        };
     
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : fUpdateSuccess,
        onFailure : fUpdateFailure
    });
}

function fUpdateSuccess(result) {
	WL.Logger.debug("Đọc dữ liệu thành công !");
	if (result.invocationResult.resultSet.length>0) 
		fillToModal(result.invocationResult.resultSet);
	else 
		loadFeedsFailure();
}

function fUpdateFailure() {
	WL.Logger.debug("Khong tim thay!");
}

function fillToModal(items) {
		var id = items[0].MaSP;
		var name = items[0].TenSP;
		var type = items[0].TenLoai;
		var price = items[0].GiaSP;
		var des = items[0].MoTa;
		
		$("#id").val(id);
		$("#name").val(name);
		/*$("#type").val(type);*/
		$("#price").val(price);
		$("#des").val(des);
}
function deleteFeeds(){
	var id = $("#id").val();
    var invocationData = {
            adapter 	: 'CoffeeAdapter',
            procedure 	: 'deleteCoffeeAdapter',
            parameters 	: [id]
        };
     
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : deleteFeedsSuccess,
        onFailure : deleteFeedsFailure
    });
    
}
function fDelete(id) {
	var invocationData = {
            adapter 	: 'CoffeeAdapter',
            procedure 	: 'deleteCoffeeAdapter',
            parameters 	: [id]
        };
     
    WL.Client.invokeProcedure(invocationData,{
        onSuccess : deleteFeedsSuccess,
        onFailure : deleteFeedsFailure
    });
}

function deleteFeedsSuccess() {
	$("#lbl_delete").show();
	$("#AppDiv").show();
}
function deleteFeedsFailure() {
	$("#lbl_delete_fail").show();
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}