import  ajax from './ajax';
// 注册
export const reqRegister = (user) => ajax('/register', user, 'POST')

// 登录
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')

// 更新用户接口
export const reqUpdateUserInfo = (user) => ajax('/updateUserInfo', user, 'POST');

// 获取用户信息
export const reqUserInfo = () => ajax('/user');

// 获取用户列表(根绝类型)
export const reqUserList = (type) => ajax('/userList', {type});

