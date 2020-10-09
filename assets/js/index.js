$(function () {
    getUserInfo();
    //点击退出
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.确定退出，则删除本地存储token
            localStorage.removeItem('token')
            // 2.返回登录界面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ""
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // layer.msg('获取成功')
            renderAvatar(res.data)
        },
        complete: function (res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //1.确定退出，则删除本地存储token
                localStorage.removeItem('token');
                // 2.返回登录界面
                location.href = '/login.html'
            }
        }
    })
}

//渲染用户名头像和名称
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
    //设置欢迎文本
    $('#wlcome').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染用户头像（判断，如果有头像则显示，另一个影藏，没有则显示首字母（首个字））
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.user-avatar').hide()
    } else { 
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase();
        $('.user-avatar').html(text).show()
    }

}
