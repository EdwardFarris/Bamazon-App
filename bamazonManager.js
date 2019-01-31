var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "LukeNLeia007!",
    database: "bamazon"
});

//prompt menu to provide 3 possible commands(View all products, View LOW inventory, Add to inventory, Add a new product)
function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Products", "View Low Inventory", "Add Item to Inventory", "Add a New Product", "End Session"],
            name: "managerChoices"
        },
    ]).then(function (ans) {
        switch (ans.managerChoices) {
            case "View All Products":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add Item to Inventory":
                addToInventory();
                break;
            case "Add a New Product":
                addNewProduct();
                break;
            case "End Session":
            console.log("Thanks, Bye Bye!!!");
        }
    });
}

//Displays ALL inventory items
function viewProducts() {
    console.log("\nHere are all products available for purchase...\n");

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log('-------------------------------------------------------------------------------------------------------------------------------------------------------------------------');

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY Available: " + res[i].stock_quantity);
            console.log('---------------------------------------------------------------------------------------------------------------------------------------------------------------------');
        }

        start();
    });
}

//shows only inventory with a quantity less than 5
function viewLowInventory() {
    console.log("\nHere are products with less than 5 items in stock...\n")

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log('-------------------------------------------------------------------------------------------------------------------------------------------------------------------------');

        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY Available: " + res[i].stock_quantity);
                console.log('-------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
            }
        }
        start();
    });
}

//prompts user to add an item(s) to inventory and asks how many to add
function addToInventory() {
    console.log("\nAdding More ExistingProducts to Inventory...\n");

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var itemArray = [];
        //pushes items into the itemArray
        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i].product_name);
        }

        inquirer.prompt([
            {
                type: "list",
                name: "addProduct",
                message: "Which item would you like to add to the inventory?",
                choices: itemArray
            },
            {
                type: "input",
                name: "qty",
                message: "How many of these items would you like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }]).then(function (ans) {
                var currentQty;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === ans.addProduct) {
                        currentQty = res[i].stock_quantity;
                    }
                }
                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: currentQty + parseInt(ans.qty)
                    },
                    {
                        product_name: ans.addProduct
                    }
                ], function (err, res) {
                    if (err) throw err;
                    console.log("The quantity of this item has been updated!");
                    start();
                });
            })
    });
}
//Adds a totally new product to the database table or inventory
function addNewProduct() {
    console.log("\nAdding a New Product to Inventory...\n");
    var deptNames = [];

    //gets the names of departments
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //pushes items into the itemArray
        for (var i = 0; i < res.length; i++) {
            
            if (!deptNames.includes(res[i].department_name)){
                deptNames.push(res[i].department_name);
            }
        }
    })

    inquirer.prompt([
        {
            type: "input",
            name: "product",
            message: "Product: ",
            validate: function (value) {
                if (value) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "department",
            message: "Department: ",
            choices: deptNames
        },
    {
        type: "input",
        name: "price",
        message: "Price: ",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                return false;
            }
    }    
    },
    {
        type: "input",
        name: "quantity",
        message: "Quantity: ",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                return false;
            }
    }
}]).then(function(ans) {
    connection.query("INSERT INTO products SET ?", {
       product_name: ans.product,
       department_name: ans.department,
       price: ans.price,
       stock_quantity: ans.quantity
    }, function (err, res) {
        if(err) throw err;
        console.log("A NEW item has been added to the store!");
    })
    start();
});
}

start();
