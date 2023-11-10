class LoginForm {
    email = ""
    password = ""
}

const rules = {
    email:[
        { required: true, message: "请输入邮箱", trigger: "blur",},
        { type: "email", message: "格式错误", trigger: ["blur", "change"], },
    ],
    password:[
        { required: true, message: "请输入密码", trigger: "blur",},
    ]
}

export { LoginForm, rules }