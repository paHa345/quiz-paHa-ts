<h1 align="center">Space Quiz</h1>

Посмотреть проект по ссылке https://quiz-pa-ha-ts.vercel.app/

<p align="center">
  <img src="https://github.com/paHa345/quiz-paHa-ts/assets/55974360/2ace1848-3f38-469f-857a-3212b084a572" />
</p>

## Использованные технологии
Проект написан на TypeScript, React; клиент-серверное взаимодействие, API написаны на NextJS; база данных - Mongo DB; управление состоянием - Redux(redux/toolkit), Redux Thunk.

## Функциональность проекта
 - paHa store - проект магазина спортивного питания, написанный на React, TypeScript, NextJS. 
 - с помощью NextJS API Routes реализованы API endpoints для получения вопросов теста, списка лидеров и обновления списка лидеров. Для этого используется REST API и Fetch API. 
 - за правильный ответ на вопрос пользователь получает установленное количество баллов + дополнительные баллы, если успел ответить на вопрос быстрее 20 секунд (отсчёт времени отображается на экране).
 - список лидеров обновляется если пользователь в текущей попытки набрал необходимое количество баллов. 
 - используется NoSQL база данных Mongo DB. 
 - за управлением состояния этого приложения отвечает Redux(redux/toolkit), за асинхронные action - Redux Thunk. 
