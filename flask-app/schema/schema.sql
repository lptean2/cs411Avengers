/*
Ahead of this run:

create user 'python'@'localhost';
GRANT ALL PRIVILEGES ON cpidata.* to 'python'@'localhost' IDENTIFIED BY '' WITH GRANT OPTION;

create user 'api'@'localhost';
GRANT ALL PRIVILEGES ON cpidata.Basket to 'api'@'localhost' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON cpidata.BasketItem to 'api'@'localhost' IDENTIFIED BY '';
Query OK, 0 rows affected (0.00 sec)
*/

CREATE TABLE Item (
	ID VARCHAR(64) NOT NULL,
	Name VARCHAR(256) NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE Region (
	ID VARCHAR(64) NOT NULL,
	Name VARCHAR(256) NOT NULL,
	ParentRegion INT,
	PRIMARY KEY (ID)
);

/* "HasPrice" in ER Diagram, but "Price" is better table name */
/* PriceDate is stored as yyyymm, as it will be easier to use as an int instead of parsing dates */
CREATE TABLE Price (
	ItemID VARCHAR(64) NOT NULL,
	RegionID VARCHAR(64) NOT NULL,
  PriceDate INT NOT NULL,
  Price FLOAT NOT NULL,
  PRIMARY KEY (ItemID, RegionID, PriceDate)
);


CREATE TABLE Basket (
	ID INT NOT NULL AUTO_INCREMENT,
	Name VARCHAR(256) NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE BasketItems (
	BasketID INT NOT NULL,
	ItemID VARCHAR(64) NOT NULL,
	Quantity FLOAT NOT NULL,
PRIMARY KEY(BasketID,ItemID)
);


/*  The relation is "HasSeriesData" in ER diagram. Domain terminology is that a set of data for an Item and Area is called a "Series", and this is a cleaner table name. */
/* As in Price, dates will be stored in yymmm format as an Int*/
/* This might become a view, but will probably be a table populated by a stored procedure called by a trigger on the Price table */
CREATE TABLE Series (
	ItemID VARCHAR(64) NOT NULL,
	RegionID VARCHAR(64) NOT NULL,
	StartDate INT NOT NULL,
	EndDate INT NOT NULL,
	MaxPrice FLOAT NOT NULL,
	MaxDate INT NOT NULL,
	MinPrice FLOAT NOT NULL,
	MinDate INT NOT NULL,
	PRIMARY KEY (ItemID, RegionID)
);

CREATE VIEW SeriesView AS
SELECT
	p.ItemID,
	i.Name as ItemName,
	p.RegionID,
	r.Name as RegionName,
	MIN(p.Price) AS MinPrice,
	MAX(p.Price) AS MaxPrice,
	MIN(p.PriceDate) as StartDate,
	MAX(p.PriceDate) as EndDate
FROM
	Price p,
	Item i,
	Region r
WHERE
	p.ItemID = i.ID
	AND r.ID = p.RegionID
GROUP BY
	p.ItemID,ItemName,p.RegionID,RegionName
;


/*
> show tables;
+-------------------+
| Tables_in_cpidata |
+-------------------+
| Basket            |
| BasketItems       |
| Item              |
| Price             |
| Region            |
| Series            |
+-------------------+
