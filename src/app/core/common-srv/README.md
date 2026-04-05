
# ---- Собраны базовые системные сервисы

##  LocalStorageService
>
> работа с localStorage  - добавлена проверка на существование LocalStorage

>> для избежания ошибок при компиляции
>> поскольку актуален для чтения из localStorage
>> (проверка может вызываться до инициализации)
>> реализован метод get
>> на перспективу - создание универсального сервиса хранения
>> токенов и информации пользователя
>> переносимого на разные площадки

 
> интерфейсный метод 
>### getStr(key:string):string | null
> возвращает содержимое localStorage (null при отсутствии LocalStorage)

##  storage-const.ts
>
> ### константы для сервиса идетнификации
> #### ACCESS_TOKEN_KEY
> #### REFRESH_TOKEN_KEY
> #### USER_ID_KEY
> #### USER_INFO_KEY

##  StorageAuthinfoService
>
> интерфейс работы с localStorage  сервиса идетнификации

> ### основные методы
 
> ### setTokens(accessToken: string, refreshToken: string)
> сохраняет токены в localStorage
> ### removeTokens()
> удаляет токены из localStorage
> ### saveUserInfo(usrInfo:UserInfoType)
> сохраняет информацию о пользователе в localStorage
> ### removeUserInfo()
> удаляет информацию о пользователе из localStorage
 
