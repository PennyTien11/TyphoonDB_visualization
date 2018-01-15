import requests
import urllib.request
import http.cookiejar
from bs4 import BeautifulSoup
import time
import pymysql.cursors

year=time.strftime("%Y")
url = "http://rdc28.cwb.gov.tw/TDB/ctrl_typhoon_list/get_typhoon_list_table/"
postdata =urllib.parse.urlencode({  
"year":year,
"model":"warning"
}).encode('utf-8')

header = {
"Accept":"text/plain, */*; q=0.01",
"Accept-Encoding":"gzip, deflate",
"Accept-Language":"zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
"Connection":"keep-alive",
"Content-Length":"23",
"Content-Type":"application/x-www-form-urlencoded",
"Host":"rdc28.cwb.gov.tw",
"Referer":"http://rdc28.cwb.gov.tw/TDB/ntdb/pageControl/ty_warning?list="+year,
"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
"X-Requested-With":"XMLHttpRequest"
}
req = urllib.request.Request(url,postdata,header)

#Cookie
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
r = opener.open(req)
html=r.read().decode('utf-8')
html = html.replace('</br>', '')
print(html)
#beautiful soup
soup = BeautifulSoup(html)
data = soup.find_all("td")

#connect to db
db = pymysql.connect("140.138.77.170", "pennytien", "penny8411","Typhoon",use_unicode=True, charset="utf8")
cursor = db.cursor()
# print("select * from Typhoon_list where year == '"+year+"';")
cursor.execute("delete from typhoon_list where year = '"+year+"';")

rowspan='1'
nextdata=12
i=13
while True:
      if i >= len(data):
            break

      if (rowspan == '1'):
            year = data[i].text
            no = data[i+1].text.strip()
            chinese=data[i+2].text
            english=data[i+3].text
            path=data[i+4].text
            print(data[i+5].text)
            begin=data[i+5].text.strip()[0:16]
            end=data[i+5].text.strip()[16:32]
            intensity=data[i+6].text
            pressure=data[i+7].text
            windspeed=data[i+8].text
            seven_stormR=data[i+9].text
            ten_stormR=data[i+10].text
            warning_num=data[i+11].text
            rowspan=data[i].get('rowspan')
            nextdata=12
      else:
            begin=data[i].text.strip()[0:16]
            end=data[i].text.strip()[16:32]
            intensity=data[i+1].text
            pressure=data[i+2].text
            windspeed=data[i+3].text
            seven_stormR=data[i+4].text
            ten_stormR=data[i+5].text
            warning_num=data[i+6].text
            rowspan=str(int(rowspan)-1)
            print(rowspan)
            nextdata=7

      i=i+nextdata
      if seven_stormR=="---":
            seven_stormR="null"
      if ten_stormR=="---":
            ten_stormR="null"
      if pressure=="---":
            pressure="null"
      if warning_num=="---":
            continue
      value = "insert into typhoon_list values('"+year+"','"+no+"', '"+chinese+"', '"+english+"', '"+path+"', '"+begin+"', '"+end+"', '"+intensity+"', "+pressure+", "+windspeed+", "+seven_stormR+", "+ten_stormR+", "+warning_num+");"
      print(value)
      cursor.execute(value)
      print("---------------------");
db.commit()
