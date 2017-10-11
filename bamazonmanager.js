
// GOALS: 
// Make user able to add stock to any item in the list DONE
// Make user able to make a new row and fill out the data inside 1/2









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
	switch (answer.command){
		
		case "View Product For Sale": productMenu();

		break;

		case "View Low Inventory": lowProduct();

		break;

		case "Add to Inventory": addProduct();

		break;

		case "Add New Product": addInventory();

		break;
	}
});

}


function productMenu(){
		connection.query("SELECT * FROM products",function(err,res){
			if(err) throw err;

			for(var i =0; i<res.length; i++){
		
			console.log(res[i].id + " | " + res[i].name + " | " + res[i].stock + " | " + res[i].department + " | ");
			console.log(" ------------------------------------------ ");
			}
		});
		menu();
}


function lowProduct(){
	connection.query("SELECT * FROM products WHERE stock < 5",function(err,res){
		if(err) throw err;
		console.log(res[0].id + " | " +res[0].name + " | " +res[0].department + " | " + "only " +res[0].stock + " left " );
		menu();
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
            connection.query("UPDATE products SET stock= (stock +" +answer.amount+")",function(err,res){
            	if(err) throw err;
            console.log("completed");
        console.log("-----------------------------------")
         connection.query("SELECT * FROM products",function(err,res){
         	if(err) throw err;
            			for(var i =0; i<res.length; i++){
            				
            			
            			console.log(res[i].name + " | " + res[i].stock);
            			console.log("-----------------------")
            		}
            		menu();
            		});

            	});

            });
		
}




function addInventory(){
	 inquirer.prompt([{
        name: 'item',
        type: 'text',
        message: 'Please enter the name of the product that you would like to add.'
    }, {
        name: 'department',
        type: 'list',
        message: 'Please choose the department you would like to add your product to.',
        choices: ["walmart","k-mart","target"]
    }, {
        name: 'price',
        type: 'text',
        message: 'Please enter the price for this product.',
        filter: Number
    }, {
        name: 'stock',
        type: 'text',
        message: 'Plese enter the Stock Quantity for this item to be entered into current Inventory',
        filter: Number
    }]).then(function(user) {
        
          
        connection.query('INSERT INTO products SET (name,stock,price,department) VALUES(?,?,?,?)',[user.item,user.stock,user.price,user.department],
            function(err) {
                if (err) throw err;
                console.log(user.item + ' has been added successfully to your inventory.');
                menu();
                
            });

    });

}


menu();