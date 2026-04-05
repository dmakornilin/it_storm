# Содержит сервисы связанные с работой блока **Блог**


> ## BlogArticleItemService
>
> ### load_article_comments()
> загрузка комментариев к статтье
>
> ### load_article_comments()
> загрузка комментариев к статтье
>
> ### load_article_info(url: string)
> загрузка информации о статье
>
> ### load_related_articles(url: string)
> загрузка списка связанных статей
> 

> ##  BlogArticlesService 
> ### loading()
> загрузка статей блога
>
 
> ## BlogPaginatorService
> сервис работы компонента **BlogPaginator**
> ### getUrlParams():string
> формирует строку параметров
> 
> ### remove_category_choice(ctg: CategorySelectedType)
> удаляет выбор категории
> 
> ### refreshSelectedCtg()
> обновляет по списку выбранных категорий 
> 
 
> ## CategFilters
> сервис для работы с фильтрами категорий
> 
> ### get_categ_char(ctg:CategorySelectedType):string
> возвращает пометку (**"+"** или **"-"**) по категории 
> **"+"** если категория в списке выбранных
> **"-"** если категории нет в списке выбранных
> 
> ### change_category_choice(ctg:CategorySelectedType)
> меняет статус категории выбрана / не выбрана
> 
> ### hideMenu()
> гасит меню списка категорий - примечание использует **ClickOutsideDirective**   
> для отработка клика вне меню
> 
> ### to_change_flag(flg:boolean)
> устанавливает флаг выбора категории
> 
