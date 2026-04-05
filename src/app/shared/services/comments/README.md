# Сервисы работы блока "комментарии"

> ## CommentsService
> сервис работы с комментариями
> 
> ### set_comment(comment: CommentItemType,url:string)
> запись комментария
> 
 
> ## CommentActionsService  
> сервис работы с откликами
> 
> ### post_action(comment : ArticleCommentItem, act:UserCommentActions):Observable<DefResponceType>
> запись отклика
> 
> ### getNomByActions(commentId: string): Observable<number>
> служебный метод возвращает номер по типу отклика 
> like 1
> dislike 2
> 
