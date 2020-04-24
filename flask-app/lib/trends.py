import pandas as pd
import re
import numpy as np
from pytrends.request import TrendReq

def getTrendData(search_terms):
    pytrend = TrendReq()

    pytrend.build_payload(kw_list=search_terms)
    interest_over_time = pytrend.interest_over_time()

    return _prepareInterestData(interest_over_time, search_terms)


def _prepareInterestData(interest_data, search_terms):
    prepared_data = {}
    interest_data = interest_data.resample('M').mean()

    for term in search_terms:
        term_data = interest_data[term].to_dict()
        prepared_data[term] = {k.strftime("%Y%m"): v for k, v in term_data.items()}

    return prepared_data
