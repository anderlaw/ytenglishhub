#-*- encoding:utf-8 -*-#
import os;
# import sys   #reload()之前必须要引入模块
# reload(sys)
# sys.setdefaultencoding('utf-8')
def list_dir():
    dir_list = os.listdir("./src")
    for cur_file in dir_list:
        if cur_file.find('index.') == 0 and '.tsx' in cur_file:
            with open("./src/"+cur_file,'rb') as f:
                file_bytes = f.read().decode()
                print(file_bytes)
            break
list_dir()