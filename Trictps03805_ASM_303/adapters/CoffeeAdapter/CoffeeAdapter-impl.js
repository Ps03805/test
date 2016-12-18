var selectTypeStatement = WL.Server.createSQLStatement("select * from loai");
var selectStatement = WL.Server.createSQLStatement("select * from sanpham");
var getByIDStatement = WL.Server.createSQLStatement("select * from sanpham where MaSP=?");
var deleteStatement = WL.Server.createSQLStatement("delete from sanpham where MaSP=?");
var updateStatement = WL.Server.createSQLStatement("update sanpham set TenSP=?, MoTa=?, GiaSP=?, TenLoai=? where MaSP=?");
var addStatement = WL.Server.createSQLStatement("insert into sanpham values (?, ?, ?, ?, ?)");
function getTypeCoffeeAdapters() {
		
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectTypeStatement,
		parameters : []
	});
}
function getCoffeeAdapters() {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : selectStatement,
		parameters : []
	});
}
function deleteCoffeeAdapter(id) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : deleteStatement,
		parameters : [id]
	});
}
function addCoffeeAdapter(id, name, des , price, typeid ) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : addStatement,
		parameters : [id, name, des , price, typeid]
	});
}
function getByIDAdapters(id) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : getByIDStatement,
		parameters : [id]
	});
}
function updateCoffeeAdapter( name, des , price, typeid , id) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : updateStatement,
		parameters : [name, des , price, typeid , id]
	});
}

