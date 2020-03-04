#!/usr/bin/env python
from lib.dbo.DbObjects import Item, Region, Price
import urllib2


def addPrice(series_id, year, period, value):
    area_id = series_id[3:7]
    item_id = series_id[7:]
    mon = int(period[1:]) - 1
    date = year + str(mon).zfill(2)

    price = Price({'ItemID':item_id, 'RegionID':area_id, 'PriceDate':date, 'Price':value})
    price.save()


def loadPrice(price_url):
    data = urllib2.urlopen(price_url) # it's a file like object and works just like a file
    line_count = 0;
    for line in data: # files are iterable
        if (line_count > 0):
            terms = line.split("\t")
            addPrice(
                terms[0].strip(),
                terms[1].strip(),
                terms[2].strip(),
                terms[3].strip()
            )

        line_count = line_count + 1


# Load item data
item_url = 'https://download.bls.gov/pub/time.series/ap/ap.item'

data = urllib2.urlopen(item_url) # it's a file like object and works just like a file
line_count = 0;
for line in data: # files are iterable
    if (line_count > 0):
        terms = line.split("\t",2)
        item = Item({'ID' : terms[0].strip(), 'Name' : terms[1].strip()})
        item.save()

    line_count = line_count + 1


# Load Region data
region_url = 'https://download.bls.gov/pub/time.series/ap/ap.area'
data = urllib2.urlopen(region_url) # it's a file like object and works just like a file
line_count = 0;
for line in data: # files are iterable
    if (line_count > 0):
        terms = line.split("\t",2)
        region = Region({'ID' : terms[0].strip(), 'Name' : terms[1].strip()})
        region.save()

    line_count = line_count + 1

# Load prices
price_urls    = [
    'https://download.bls.gov/pub/time.series/ap/ap.data.0.Current',
    'https://download.bls.gov/pub/time.series/ap/ap.data.1.HouseholdFuels',
    'https://download.bls.gov/pub/time.series/ap/ap.data.2.Gasoline',
    'https://download.bls.gov/pub/time.series/ap/ap.data.3.Food'
]

for url in price_urls:
    loadPrice(url)
