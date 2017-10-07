var mysql = require ("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection ({
	host:"localhost",
	port:3306,
	user:"root",
	password: "Thirdpi1",
	database: "bamazon"
});





function menu(){
	connection.query("SELECT * FROM products",function(err,res){

		for(var i =0; i<res.length; i++){
		console.log(res[i].id + " | " + res[i].name + " | " + res[i].stock + " | " + res[i].department + " | ");
		console.log("------------------------------------------");
		}
	});
}



function itemSearch(){

	inquirer.prompt([
	{
	message: "what would you like to buy, use the id to pick an item",
	name: "order",
	type:"input",
	filter: Number


	},
	{
	message: "how many would you like to buy?",
	name: "amount",
	type:"input",
	filter:Number

}
	]).then(function(answer){
		var itemOrder = answer.order;
		var quantityOrder = answer.amount;

 			connection.query('SELECT * FROM products WHERE id = '+itemOrder,function(err,res){

    		var inventory = res[0].stock;
    		var product = res[0].name;
				if (res[0].stock >1){;
 				console.log("You are about to order " + itemOrder + " producs of " + product);
 					connection.query("UPDATE products SET stock= (stock -" +itemOrder+")  WHERE id="+itemOrder,function(err,res){
 					console.log("success");
 						connection.query("SELECT * FROM products WHERE id ="+itemOrder,function(err,res){
 						console.log(res);
 						});
 					}
 				});

            	 else{
				console.log(" we are out of stock! Come by later!");
	 						} 
			});

	});

}











function bamazon(){
	menu();
	itemSearch();
		

}

bamazon();