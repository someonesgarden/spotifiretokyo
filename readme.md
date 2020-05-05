
ローカルで試す時は
http://127.0.0.1:8080/musixmatch/track/trackLyrics?mbid=20bb3765-3738-46c1-a56c-711699f5f3d2

GCPサーバー側は、
https://www.spotifire.tokyo/musixmatch/track/trackLyrics?trackid=14566222


### VMインスタンスを作成する
centosかubuntu以外はうまくSSHコネクションができないので作成の際は注意

### お名前などでドメイン名取得
VPCから静的IPアドレスを予約


## Cloud DNSでゾーンを作成
spotifire.tokyoを使用
AレコードにVMインスタンスの外部IPを設定

### SSHでVMインスタンスを開く
#### VMインスタンスを作成した後は、GCE × CentOS 7 × nginx × Let's Encrypt(certbot) × Node.js × Git
https://qiita.com/smilemonster/items/9e1120d4d119d7159515
cd /etc/selinux/
sudo cp config config_back_up
sudo vi config


### NGINXインストール
sudo yum install nginx
sudo service nginx start
起動確認
http://外部IP (httpsで接続してもつながらない！）

### NGINXを起動時に自動起動
sudo systemctl enable nginx
sudo systemctl start nginx

### レポジトリにプロジェクトデータを追加
#### ローカルにクローンを作成の場合
git clone ssh://d@someonesgarden.org@source.developers.google.com:2022/p/spotifirework/r/api_server


### node.jsをポート80番でNginx上で起動させる
https://qiita.com/yoshi3/items/9349f8bfd3688a3cab43

このとき、httpsをhttpに転送する命令を既に書いちゃっているので、それに対応するために、
/etc/nginx/nginx.confで、

```$xslt
server {
        server_name  spotifire.tokyo www.spotifire.tokyo;
        root         /usr/share/nginx/html;
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        location / {
                proxy_pass http://node-app/;
        }
        error_page 404 /404.html;
            location = /40x.html {
        }
        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    
```


のように、location / のところに、追加で作成したnode-app.confのupstream 名を指定すること！


起動時に動き出すように、forever 設定を作ることも可能。
https://qiita.com/yoshi3/items/9349f8bfd3688a3cab43


### 実験の間は nohupで起動、本番では常にnodeが立ち上がるように!
サーバー落としても動くようにsudo権限でnohupする。
sudo nohup node /home/d/gcd_api_server/index.js &
 
### この前に、~/.bashrcに nvmを認識するコードを書く

```$xslt
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
~                                                                                                                  
~         
``` 

### *** 最終的には、常にnode.js が起動するようにしないとダメなので、
foreverなどのコマンドがちゃんと動くように設計すること！

 
