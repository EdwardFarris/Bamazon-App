# Bamazon-App
### **Description**:
A Node app similar to amazon in the way of browsing available inventory and selecting products for purchase through the command line. Users can specify a certain quantity of a product, unless that value is greater than the quantity in stock. Once a purchase is made, the datatable is updated to reflect the new quantity, and informs the user of their total cost.<br>

### **Before You Begin**
* Open Terminal or Gitbash
* Clone Repo
* within the directory of the repo, install Node packages:
    * npm install mysql
    * npm install inquirer<br>

### **What the App Does**
When this application is run through the terminal command line, it will do the following:
1. Prints all available items from the store along with other information including the price, quantity, and department.
2. Prompts the customer to choose an item to purchase by entering the item's unique ID number.
3. Then prompts the customer to enter a valid quantity of the item if they want more than one.
    * If there is enough of the item in stock, it will display the total cost to the customer.
    * If there is NOT enough of the item in stock, it will inform the customer of this.
    * If the purchase went through, the stock-quantity is immediately updated in the database to reflect the purchase.
    * It also updates the total sales in the departments table.<br>

### **Demo Videos**
* bamazonCustomer.js (URL)

### **Technologies Used
* Node.js
* MySQL 
* JavaScript
* Inquirer NPM package
* mysql NPM package<br>

### **Built With**
* Visual Studio Code
* MySQL Workbench
* Terminal/Gitbash






