var mysql = require ("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection ({
	host:"localhost",
	port:3306,
	user:"root",
	password: "Thirdpi1",
	database: "bamazon"
});


connection.connect();


function menu(){
	connection.query("SELECT * FROM products",function(err,res){
console.log("---------------")
		for(var i =0; i<res.length; i++)
		{
		console.log(res[i].id + " | " + res[i].name + " | " + res[i].stock + " | " + res[i].department + " | " );
		console.log(" ------------------------------------------ ");
		}
	});
	itemSearch();
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
				if (res[0].stock > quantityOrder){
 					console.log("You are about to order " + itemOrder + " producs of " + product + "\n");
 						connection.query("UPDATE products SET stock= (stock -" +quantityOrder+")  WHERE id="+itemOrder,function(err,res){
 						console.log("success \n");
 							connection.query("SELECT * FROM products WHERE id ="+itemOrder,function(err,res){
 					
 							console.log(res[0].id + " | Item: " +res[0].name +  " | Quantity: " + res[0].stock);
 							console.log('_________________________________________________________________________');
 						
 						
 						});
 					});
 				}

            	 else{
					console.log(" we are out of stock! Come by later!");
	 						} 
			});

	});

}








menu();