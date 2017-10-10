var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection ({
	host:"localhost",
	port:3306,
	user:"root",
	password: "Thirdpi1",
	database: "bamazon"
});


function menu (){
	
	inquirer.prompt([
{
	message: "Please select a command",
	name:"command",
	type:"list",
	choices: ["View Product For Sale","View Low Inventory","Add to Inventory","Add New Product"]

}
]).then(function(answer){
	if(answer.command === "View Product For Sale"){
		productMenu();
	}
});

}


function productMenu(){
		connection.query("SELECT * FROM products",function(err,res){

			for(var i =0; i<res.length; i++){
		
			console.log(res[i].id + " | " + res[i].name + " | " + res[i].stock + " | " + res[i].department + " | ");
			console.log(" ------------------------------------------ ");
			}
		});
}


function lowProduct(){
	connection.query("SELECT * FROM products WHERE stock < 29",function(err,res){
		console.log(res);
	});
}

 
function addProduct(){
	inquirer.prompt([{
        message: "How much stock would you like to add?",
        type: "input",
        filter: Number,
        name: "amount"

}
		]).then(function(answer){
            connection.query("UPDATE products SET stock= (stock +" +answer.amount,function(err,res){
            
            		connection.query("SELECT * FROM products",function(err,res){
            			
            			console.log(res);
            		});



            });
            });
		
}




function addInventory(){
	
	
}