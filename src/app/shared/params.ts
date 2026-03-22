export const BaseParams = {
  email: 'info@itstorm.com',
  phone: '+7 (499) 343-13-34',
  address: 'Пресненская наб., 12, Москва, Россия, 123317.',
}

export enum UserCommentActions {
  like ='like',
  dislike ='dislike',
  violate ='violate',
}

export enum RequestTypes {
  order = 'order',
  consultation = 'consultation',
}

export const RequestTypeTitles = {
  order: 'Заявка на услугу',
  consultation: 'Закажите бесплатную консультацию',
}
