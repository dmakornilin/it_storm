#  Сервисы загрузки начальных параметров вызываются при инициализации

> ## ActionService
> ### loading()
> Иформация об акциях в actions = signal<ActionItems>([]);
> 
> ## AdvantageService
> Информация о преимуществах в advantages = signal<AdvantageList>([]);
> 
> ## CategoriesService
> список категорий
> **loadingCtg():Observable<CategoriesListType | DefResponceType>** 
> 
> ## PopularArticlesService
> популярные статьи в popularArticles = signal<PopularArticleType>([]);
> 
> ## PriceService 
> прайс-лист в priceList= signal<PriceListCardList>([]); 
> ### getPriceListType(url:string):string | null
> служебная функция возвращает Тип по url услуги
>
> ## ReviewService
> отзывы в reviews = signal<ReviewItemsType>([]); 

