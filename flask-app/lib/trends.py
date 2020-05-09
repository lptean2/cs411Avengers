import pandas as pd
import re
import numpy as np
from pytrends.request import TrendReq

def getTrendData(search_terms):
    pytrend = TrendReq()

    all_prepared_data = {}
    BATCH_SIZE = 5
    for i in range(0, len(search_terms), BATCH_SIZE):
        batch = search_terms[i:i+BATCH_SIZE]

        pytrend.build_payload(kw_list=batch)
        interest_over_time = pytrend.interest_over_time()
        prepared_data = _prepareInterestData(interest_over_time, batch)
        for term in prepared_data:
            all_prepared_data[term] = prepared_data[term]

    return all_prepared_data


def _prepareInterestData(interest_data, search_terms):
    prepared_data = {}
    interest_data = interest_data.resample('M').mean()

    for term in search_terms:
        term_data = interest_data[term].to_dict()
        prepared_data[term] = {k.strftime("%Y%m"): v for k, v in term_data.items()}

    return prepared_data
