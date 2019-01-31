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

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("\nWelcome to Bamazon, Here are all our available products...\n");
        console.log('------------------------------------------------------------------------------');

        // Log all results of the SELECT statement
        for(var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY Available: " + res[i].stock_quantity);
            console.log('-----------------------------------------------------------------------------------');
        }

        console.log(' ');
        inquirer
            .prompt([

                {
                    type: "input",
                    name: "purchaseID",
                    message: "What is the ID number of the product you wish to purchase?",
                    validate: function (value) {
                        if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    type: "input",
                    name: "purchaseQTY",
                    message: "How many of these items would you like to purchase!",
                    validate: function (value) {
                        if (isNaN(value)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            ]).then(function (answer) {
                var itemToBuy = (answer.purchaseID) - 1;
                var qtyToBuy = parseInt(answer.purchaseQTY);
                var totalCost = parseFloat(((res[itemToBuy].price) * qtyToBuy).toFixed(2));

                //check if quantity is sufficient
                if (res[itemToBuy].stock_quantity >= qtyToBuy) {
                    //update qty in products table
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (res[itemToBuy].stock_quantity - qtyToBuy)
                            },
                            {
                                item_id: answer.purchaseID
                            }
                        ],
                        function (err, result) {
                            if (err) throw err;
                            console.log("Success! Your total is $" + totalCost.toFixed(2) + ". Your item(s) will be shipped in 3-5 business days.");
                        });
                    connection.query("SELECT * FROM departments", function (err, deptRes) {
                        if (err) throw err;
                        var index;
                        for (var i = 0; i < deptRes.length; i++) {
                            if (deptRes[i].Department_Name === res[itemToBuy].Department_Name) {
                                index = i;
                            }
                        }
                        //update total sales in departments table
                        connection.query("UPDATE departments SET ? WHERE ?",
                            [
                                {
                                    Total_Sales: deptRes[index].Total_Sales + totalCost
                                },
                                {
                                    Department_Name: res[itemToBuy].Department_Name
                                }
                            ],
                            function (err, deptRes) {
                                if (err) throw err;
                                console.log("Updated Department Sales.");
                            });
                    });
                } else {
                    console.log("Sorry, insufficient stock for that item! Please choose another quantity")
                }
                altprompt();
            })
    })
}

//Asks if they would like to make another purchase
function altprompt() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "reply",
            message: "Would you like to purchase another item?"
        }]).then(function (answer) {
            if (answer.reply) {
                start();
            } else {
                console.log("Thanks for choosing Bamazon, hope to see you soon!");
            }
        });
}
start();