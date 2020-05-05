let setFormInput = function(data) {
    // 親ウィンドウの存在チェック
    if (!window.opener || window.opener.closed)
    {
        // 親ウィンドウが存在しない場合
        window.alert('メインウィンドウが見当たりません。');
        window.close();
    }
    else
    {
        let vm = window.opener.vm;
        if(data!==''){
            console.log(data);
            vm.$store.commit('spotify/setCredential',data.credentials);
            vm.$store.commit('spotify/setCode',data.code);
            vm.$store.commit('spotify/setMe',data.me);

            window.close();
        }else{
            window.close();
        }
    }
}
