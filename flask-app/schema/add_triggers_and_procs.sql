
CREATE OR REPLACE VIEW ItemSeriesView AS
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
	AND p.RegionID = r.ID
	AND p.ItemID = i.ID
GROUP BY
	p.ItemID,ItemName,p.RegionID,RegionName;


/* Create Table version of view */
CREATE TABLE ItemSeries (
	ItemID VARCHAR(64) NOT NULL,
	ItemName VARCHAR(256) NOT NULL,
	RegionID VARCHAR(64) NOT NULL,
	RegionName VARCHAR(256) NOT NULL,
	MinPrice FLOAT,
	MaxPrice FLOAT,
	StartDate INT,
	EndDate INT,
	PRIMARY KEY (ItemID, RegionID)
);


/* Stored procedure to update table*/
DELIMITER //
CREATE PROCEDURE UpdateItemSeries(
	IN ItemID VARCHAR(64),
	IN RegionID VARCHAR(64)
)
BEGIN

INSERT INTO
	ItemSeries (
	ItemID, ItemName, RegionID, RegionName, MinPrice, MaxPrice, StartDate ,EndDate
	)
SELECT * FROM
	(SELECT p.ItemID,
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
	p.ItemID = ItemID
	AND p.RegionID = RegionID
	AND p.RegionID = r.ID
	AND p.ItemID = i.ID
GROUP BY
	p.ItemID,ItemName,RegionName,r.Name)  as t
ON DUPLICATE KEY UPDATE
	MinPrice = t.MinPrice,
	MaxPrice = t.MaxPrice,
	StartDate = t.StartDate,
	EndDate = t.EndDate;
End//



CREATE PROCEDURE UpdateItemSeriesAllRegions(
	IN ItemID VARCHAR(64)
)
BEGIN

INSERT INTO
	ItemSeries (
	ItemID, ItemName, RegionID, RegionName, MinPrice, MaxPrice, StartDate ,EndDate
	)
SELECT * FROM
	(SELECT p.ItemID,
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
	p.ItemID = ItemID
	AND p.RegionID = r.ID
	AND p.ItemID = i.ID
GROUP BY
	p.ItemID,ItemName,RegionName,r.Name)  as t
ON DUPLICATE KEY UPDATE
	MinPrice = t.MinPrice,
	MaxPrice = t.MaxPrice,
	StartDate = t.StartDate,
	EndDate = t.EndDate;

End//


CREATE PROCEDURE UpdateItemSeriesAll()
BEGIN

INSERT INTO
	ItemSeries (
	ItemID, ItemName, RegionID, RegionName, MinPrice, MaxPrice, StartDate ,EndDate
	)
SELECT * FROM
	(SELECT p.ItemID,
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
	p.RegionID = r.ID
	AND p.ItemID = i.ID
GROUP BY
	p.ItemID,ItemName,RegionName,r.Name)  as t
ON DUPLICATE KEY UPDATE
	MinPrice = t.MinPrice,
	MaxPrice = t.MaxPrice,
	StartDate = t.StartDate,
	EndDate = t.EndDate;

End//


CREATE TRIGGER after_price_update
AFTER UPDATE
ON Price FOR EACH ROW
BEGIN
CALL UpdateItemSeries(NEW.ItemID, NEW.RegionID);
END//

CREATE TRIGGER after_price_insert
AFTER INSERT
ON Price FOR EACH ROW
BEGIN
CALL UpdateItemSeries(NEW.ItemID, NEW.RegionID);
END//

CREATE TRIGGER after_price_delete
AFTER DELETE
ON Price FOR EACH ROW
BEGIN
CALL UpdateItemSeries(OLD.ItemID, OLD.RegionID);
END//


CREATE TRIGGER after_item_insert
AFTER INSERT
ON Item FOR EACH ROW
BEGIN
CALL UpdateItemSeriesAllRegions(NEW.ID);
END//

CREATE TRIGGER after_item_delete
AFTER DELETE
ON Item FOR EACH ROW
BEGIN
DELETE FROM ItemSeries where ItemID=OLD.ID;
END//

DELIMITER ;
