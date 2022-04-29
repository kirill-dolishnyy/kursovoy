from flask import Flask,jsonify,request,after_this_request
import requests
import json
from fake_useragent import UserAgent

user = UserAgent().safari


def fetch_multiplicators(tiker):
    multiplicators_dict = {}
    names = ['P/E','P/S','P/BV','EV/EBITDA','Долг/EBITDA']
    try:
        multiplicator_html = requests.get('https://smart-lab.ru/q/{0}/f/y/'.format(tiker),
                                          headers={'User-Agent': user})
        text = multiplicator_html.text
        company_name = text.find("og:title")
        sector = text.find("Aнализ сектора")
        sector = text[(sector)+14:].split()
        company_name = text[(company_name)+19:].split()
        for i in range(len(names)):
            div = names[i].split("/")
            if text.find(div[0] + "/" + div[1]) > 0:
                multiplicator_value = text[text.find(div[0] + "/" + div[1]):]
            else:
                multiplicators_dict.update({names[i]: "There is no such multiplicator"})
                continue
            multiplicator_value = multiplicator_value[str(multiplicator_value).find("ltm_spc"):]
            multiplicator_value = multiplicator_value[str(multiplicator_value).find("<td>") + 4:]
            multiplicator_value = str(multiplicator_value[:str(multiplicator_value).find("</td>")]).split()
            Value = ""
            for j in range(len(multiplicator_value)):
                Value = Value + multiplicator_value[j]
                multiplicators_dict.update({names[i]: Value})
    
    except requests.exceptions.HTTPError as error:
        print("Request error", error.response.status_code)
        multiplicators_dict = {"No": 0}
    finally:
        multiplicators_dict['name'] = company_name[0]
        multiplicators_dict['tiker'] = tiker
        multiplicators_dict['sector'] = sector[0][:-1]
        return multiplicators_dict


app = Flask(__name__)

client = app.test_client()

@app.route('/multiplicators', methods = ['GET'])
def get_multiplicator():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    tiker = request.args.get('tiker')
    return jsonify((fetch_multiplicators(tiker)))


if __name__ == '__main__':
    app.run(host= '0.0.0.0')


