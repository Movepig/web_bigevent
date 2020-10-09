$(function () { 
    // 校验表单数据（昵称）
    var form = layui.form
    form.verify({
        nickname: function (value) { 
            if (value.length > 6) { 
                return '昵称长度必须在1-6之间'
            }
        }
    })
    initUserInfo();
    //初始化用户基本信息
    var layer = layui.layer
    function initUserInfo(){ 
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                form.val('formUserInfo',res.data)
            }
        })
    }


    //点击重置
    $('#btnReset').on('click', function (e) { 
        e.preventDefault()
        initUserInfo()
    })

    //提交表单事件
    $('.layui-form').on('submit', function (e) { 
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('修改信息成功')

                window.parent.getUserInfo()
            }
        })

    })
})