import requests
import urllib.request
import http.cookiejar
from bs4 import BeautifulSoup
import os
import pymysql.cursors

year=str(year)
url = "http://rdc28.cwb.gov.tw/TDB/ctrl_typhoon_list/get_typhoon_list_table/"
postdata =urllib.parse.urlencode({  
"params_serialized":"rain_average=1h&accu_value=0.1&radio_typhoon_year=year_typhoon&typhoon_year=2017&typhoon_name=2017HATO++++++++++++&station_selection_type=text&measure_type=CWB&location_group=%E5%8C%97%E5%8D%80&stno%5B%5D=467540"
}).encode('utf-8')

header = {
"Accept":"text/plain, */*; q=0.01",
"Accept-Encoding":"gzip, deflate",
"Accept-Language":"zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
"Connection":"keep-alive",
"Content-Length":"303",
"Content-Type":"application/x-www-form-urlencoded",
"Host":"rdc28.cwb.gov.tw",
"Origin":"http://rdc28.cwb.gov.tw",
"Referer":"http://rdc28.cwb.gov.tw/TDB/ntdb/pageControl/rain",
"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
"X-Requested-With":"XMLHttpRequest"
}
req = urllib.request.Request(url,postdata,header)

#Cookie
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
r = opener.open(req)
html=r.read().decode('utf-8')
# print(html)

#connect to db
# db = pymysql.connect("140.138.77.170", "pennytien", "penny8411","penny",use_unicode=True, charset="utf8")
# cursor = db.cursor()

#beautiful soup
soup = BeautifulSoup(html)
print(soup);
# data = soup.find_all("td")

# db.commit()
