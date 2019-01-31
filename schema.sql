create database bamazon;
use bamazon;

create table products(
item_id int(10) not null auto_increment,
product_name varchar(100) not null,
department_name varchar(100) not null,
price decimal(6,2) not null,
stock_quantity int(5) not null,
primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values("knive set", "home and kitchen", 89.99, 100);

insert into products(product_name, department_name, price, stock_quantity)
values("bamboo cutting board", "home and kitchen", 39.99, 150);

insert into products(product_name, department_name, price, stock_quantity)
values("vegetable peeler", "home and kitchen", 12.99, 500);

insert into products(product_name, department_name, price, stock_quantity)
values("silicon baking mat", "home and kitchen", 19.99, 300);

insert into products(product_name, department_name, price, stock_quantity)
values("garlic press", "home and kitchen", 25.99, 180);

insert into products(product_name, department_name, price, stock_quantity)
values("measuring cup set", "home and kitchen", 16.99, 400);

insert into products(product_name, department_name, price, stock_quantity)
values("300w home theater soundbar", "electronics", 259.99, 80);

insert into products(product_name, department_name, price, stock_quantity)
values("600w home theater soundbar", "electronics", 459.99, 60);

insert into products(product_name, department_name, price, stock_quantity)
values("900w home theater soundbar", "electronics", 659.99, 40);

insert into products(product_name, department_name, price, stock_quantity)
values("bluray player", "electronics", 79.99, 150);

insert into products(product_name, department_name, price, stock_quantity)
values("65in flat screen tv", "electronics", 679.99, 50);

insert into products(product_name, department_name, price, stock_quantity)
values("75in flat screen tv", "electronics", 779.99, 40);

insert into products(product_name, department_name, price, stock_quantity)
values("85in flat screen tv", "electronics", 879.99, 30);

insert into products(product_name, department_name, price, stock_quantity)
values("record player", "electronics", 99.99, 100);

select * from products;

create table departments(
DepartmentID int auto_increment not null,
Department_Name varchar(50) not null,
Overhead_Costs decimal (10,2) not null,
Total_Sales  decimal(10,2) not null,
primary key(DepartmentID)
);

insert into departments(Department_Name, Overhead_Costs, Total_Sales)
values ("home and kitchen", 38965, 100000),
("electronics", 188400, 300000);