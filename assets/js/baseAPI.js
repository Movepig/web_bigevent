
$.ajaxPrefilter(function (params) {
    params.url = 'http://ajax.frontend.itheima.net' + params.url
    //判断含有/my/开头的接口配置，可以使用这个函数的配置信息
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
})
