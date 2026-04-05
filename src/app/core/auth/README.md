  ## ------------  Собраны сервисы идентификации

>> ==== AuthService
  >  Интерфейс export class AuthService
  > ### базовые сигналы
    isLogin <boolean> -- пользователь залогинен
    userInfo  <UserInfoType | null> -- информация о текущем пользователе 
  > ### базовые интерфейсные методы
    login(prm: LoginType)  -- логин существующего пользователшя
    signup(prm: SignupType) -- регистрация нового пользователя
    logout()  -- выход удаление информации о пользователе и tokens из localStorage

>> ==== authInterceptor
>
>   интерсептор работы с токенами (accessToken и refreshToken)

>> ==== authGuard authForwardGuard
