from flask import Flask, render_template, jsonify
import random
import pandas as pd

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/l1')
def get_l1_data():
    order = random.randint(1500, 3000)
    profit = random.randint(100000, 300000)
    customer = random.randint(1000, order)
    ATV = random.randint(80, 120)
    return jsonify({"order": order, "profit": profit, "customer": customer, "ATV": ATV})


@app.route('/l2')
def get_l2_data():
    old_customer = [120030, 2020, 51, 2.2, 10.6]
    new_customer = [29023, 576, 48, 1.3, 8.9]
    return jsonify({"new_customer": new_customer, "old_customer": old_customer})


@app.route('/l3')
def get_l3_data():
    index = ['20.12', '21.1', '21.2', '21.3', '21.4', '21.5', '21.6', '21.7', '21.8', '21.9', '21.10', '21.11']
    old_customer = [random.randint(1500, 3000) for i in range(12)]
    new_customer = [random.randint(200, 800) for i in range(12)]
    return jsonify({"index": index, "new_customer": new_customer, "old_customer": old_customer})


@app.route('/c1')
def get_c1_data():
    target = 3000000
    sales = random.randint(1500000, 3000000)
    achieving_rate = str(int(round(sales / target * 100, 0))) + '%'
    year_target = 40000000
    year_sales = random.randint(30000000, 36000000)
    year_achieving_rate = str(int(round(year_sales / year_target * 100, 0))) + '%'
    return jsonify({"sales": sales, "target": target, "achieving_rate": achieving_rate,
                    "year_sales": year_sales, "year_target": year_target, "year_achieving_rate": year_achieving_rate})


@app.route('/map')
def get_map_data():
    city_list = ['海门', '鄂尔多斯', '招远', '舟山', '齐齐哈尔', '盐城', '赤峰', '青岛', '乳山', '金昌', '泉州', '莱西', '日照',
                 '胶南', '南通', '拉萨', '云浮', '梅州', '文登', '上海', '攀枝花', '威海', '承德', '厦门', '汕尾', '潮州', '丹东',
                 '太仓', '曲靖', '烟台', '福州', '瓦房店', '即墨', '抚顺', '玉溪', '张家口', '阳泉', '莱州', '湖州', '汕头', '昆山',
                 '宁波', '湛江', '揭阳', '荣成', '连云港', '葫芦岛', '常熟', '东莞', '河源', '淮安', '泰州', '南宁', '营口', '惠州',
                 '江阴', '蓬莱', '韶关', '嘉峪关', '广州', '延安', '太原', '清远', '中山', '昆明', '寿光', '盘锦', '长治', '深圳',
                 '珠海', '宿迁', '咸阳', '铜川', '平度', '佛山', '海口', '江门', '章丘', '肇庆', '大连', '临汾', '吴江', '石嘴山',
                 '沈阳', '苏州', '茂名', '嘉兴', '长春', '胶州', '银川', '张家港', '三门峡', '锦州', '南昌', '柳州', '三亚', '自贡',
                 '吉林', '阳江', '泸州', '西宁', '宜宾', '呼和浩特', '成都', '大同', '镇江', '桂林', '张家界', '宜兴', '北海',
                 '西安', '金坛', '东营', '牡丹江', '遵义', '绍兴', '扬州', '常州', '潍坊', '重庆', '台州', '南京', '滨州', '贵阳',
                 '无锡', '本溪', '克拉玛依', '渭南', '马鞍山', '宝鸡', '焦作', '句容', '北京', '徐州', '衡水', '包头', '绵阳',
                 '乌鲁木齐', '枣庄', '杭州', '淄博', '鞍山', '溧阳', '库尔勒', '安阳', '开封', '济南', '德阳', '温州', '九江',
                 '邯郸', '临安', '兰州', '沧州', '临沂', '南充', '天津', '富阳', '泰安', '诸暨', '郑州', '哈尔滨', '聊城', '芜湖',
                 '唐山', '平顶山', '邢台', '德州', '济宁', '荆州', '宜昌', '义乌', '丽水', '洛阳', '秦皇岛', '株洲', '石家庄',
                 '莱芜', '常德', '保定', '湘潭', '金华', '岳阳', '长沙', '衢州', '廊坊', '菏泽', '合肥', '武汉', '大庆']

    data = [{'name': i, 'value': random.randint(10, 100)} for i in city_list]
    return jsonify({"data": data})


@app.route('/r1')
def get_r1_data():
    index = ['20.12', '21.1', '21.2', '21.3', '21.4', '21.5', '21.6', '21.7', '21.8', '21.9', '21.10', '21.11']
    sales = [random.randint(2000000, 3000000) for i in range(12)]
    profit = [random.randint(400000, 800000) for i in range(12)]
    profit_rate = [round(i/j, 2) for i, j in zip(profit, sales)]
    return jsonify({"index": index, "sales": sales, "profit": profit, "profit_rate": profit_rate})


def get_product():
    product = [chr(i) for i in range(97, 123)]
    sales = [random.randint(10, 300) for i in range(len(product)-2)]
    profit = [random.randint(-2000, 10000) for i in range(len(product) - 2)]
    product_type = ['AA', 'BB', 'CC']*int((len(product)-2)/3)
    product_df = pd.DataFrame([product[:-2], product_type, sales, profit],
                              index=['product', 'product_type', 'sales', 'profit']).T
    return product_df


@app.route('/r21')
def get_r21_data():
    product_df = get_product().sort_values('sales', ascending=False).head(10)
    return jsonify({"product": product_df['product'].tolist(), "sales": product_df['sales'].tolist()[::-1]})


@app.route('/r22')
def get_r22_data():
    product_df = get_product()
    sales_avg = product_df.sales.mean()
    profit_avg = product_df.profit.mean()
    product_type_value_list = []
    product_type_list = []
    for i in product_df.product_type.unique():
        product_type_value_list.append(product_df.query("product_type == @i")[['sales', 'profit']].values.tolist())
        product_type_list.append(i)
    return jsonify({"data": product_type_value_list, "type": product_type_list,
                       "sales_avg": sales_avg, "profit_avg": profit_avg})


@app.route('/r3')
def get_r3_data():
    sales = [random.randint(400000, 800000) for i in range(3)]
    num = [random.randint(1000, 3000) for i in range(3)]
    profit = [random.randint(80000, 160000) for i in range(3)]
    df = pd.DataFrame([sales, num, profit], index=['sales', 'num', 'profit'], columns=['消费者', '公司', '小微企业']).T
    df['sales'] = round(df['sales'] / df['sales'].sum(), 3)
    df['num'] = round(df['num'] / df['num'].sum(), 3)
    df['profit'] = round(df['profit'] / df['profit'].sum(), 3)
    return jsonify({"data": df.values.tolist(),})


if __name__ == '__main__':
    app.run()


