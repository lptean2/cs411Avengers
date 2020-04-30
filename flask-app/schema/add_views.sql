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


/* Can't have a subselect in a view */
CREATE VIEW BasketSeriesDetailView AS
SELECT
	BI.BasketID,  P.RegionID , P.PriceDate, sum( BI.Quantity * P.Price) as Price
FROM
	Price P,
	BasketItems BI
WHERE
	BI.ItemID = P.ItemID
GROUP BY P.RegionID ,BI.BasketID, P.PriceDate
ORDER BY BI.BasketID, P.RegionID , P.PriceDate;


CREATE VIEW BasketSeriesView AS
SELECT
	BasketID,
	RegionID,
	MIN(Price) AS MinPrice,
	MAX(Price) AS MaxPrice,
	MIN(PriceDate) as StartDate,
	MAX(PriceDate) as EndDate
FROM
	BasketSeriesDetailView
GROUP BY
	BasketID,
	RegionID
;
