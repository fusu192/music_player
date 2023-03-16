

#coding=utf-8
from flask import Flask,render_template,make_response
from flask_restful import Api, Resource
import os


workdir=os.path.abspath(os.path.dirname(__file__))
music_storage=os.path.join(workdir,"static","musics")


app = Flask(__name__,static_url_path='',root_path=workdir)
api = Api(app)


class music(Resource):
    def get(self):
        res=[]
        #遍历获取所有文件
        for i in os.listdir(music_storage):
            if(not i.startswith(".")):
                if(not i.endswith(".lrc")):
                    mfile=os.path.join(music_storage,i)
                    if(os.path.isfile(mfile)):

                        pre_name=os.path.splitext(i)[0]

                        dic={}
                        dic["name"]=pre_name
                        dic["audio_src"]="musics/{}".format(i)
                        with open(os.path.join(music_storage,"{}.lrc".format(pre_name)), 'r',encoding="utf-8") as f1:
                            list1 = f1.readlines()
                            dic["content"]="".join(list1)
                        res.append(dic)
        mp3=res[0]["audio_src"]
        return render_template('index.html',lyrics=res,mp3=mp3)

api.add_resource(music,'/music')


@api.representation("text/html")
def out_html(data,code,headers):
    return make_response(data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)


