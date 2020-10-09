$(function(){
    // 密码校验
    var form = layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须是6到12位,且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
             }
        },
        rePwd: function (value) { 
            if (value !== $('[name=newPwd]').val()) { 
                return '两次密码不一致'
            }
        }
    })

    //发起请求实现重置密码的功能
    var layer = layui.layer
    $('.layui-form').on('submit', function (e) { 
        //阻止表单默认行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('修改密码成功');
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})