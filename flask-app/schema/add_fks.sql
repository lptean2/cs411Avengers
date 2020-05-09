ALTER TABLE Price
    ADD FOREIGN KEY
    fk_price_item (ItemId)
    REFERENCES Item (ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE;


ALTER TABLE Price
    ADD FOREIGN KEY
    fk_price_region (RegionID)
    REFERENCES Region (ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE;


ALTER TABLE BasketItems
    ADD FOREIGN KEY
    fk_basket_item (ItemId)
    REFERENCES Item (ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE;


ALTER TABLE BasketItems
    ADD FOREIGN KEY
    fk_basket_id (BasketID)
    REFERENCES Basket (ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE;


ALTER TABLE ItemSeries
      ADD FOREIGN KEY
      fk_itemseries_item (ItemId)
      REFERENCES Item (ID)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
