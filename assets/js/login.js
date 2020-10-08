$(function () { 
    // 点击“去注册账户”，实现显示影藏
    $('#link_reg').on('click', function () { 
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () { 
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 密码校验规则
    var form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/,'密码必须是6-16位，且不能有空格'
        ],
        // 两次确认密码的规则
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val();
            if (pwd !== value) { 
                return '两次密码输入不一致'
            }
         }
    })

    // 监听注册表单提交事件
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                // 成功之后自动点击登录，=跳转
                $('#link_login').click()
            }
        })
     })

    //监听登录表单提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')

                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
     })
})