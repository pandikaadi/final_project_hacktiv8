# final_project_hacktiv8
this is repository for Anggoro Sanrego, Dennis Mannulang, M. Farras Widya H, and M. Pandika Adi R.'s hacktiv8 final project

initial


SERVER/APP ENDPOINT
PORT 4001

BARBER

GET /barbers
GET /barbers/:id
POST /barbers
POST /barbers/login
DELETE /barbers/:id
PUT /barbers/:id

ORDER

GET /orders ( get semua order user yg sedang login)
GET /orders/:id 
POST /orders
DELETE /orders/:id

SERVER/USER(MONGO DB) ENDPOINT 
PORT 4002

USERS
 
GET /users
GET /users/:id
POST /users (register)
POST /users/login (login)
PUT /users/:id
PUT /users/location/:id (update location/lat long)
DELETE / users/:id 

ORCHESTRATOR EXPRESS ENDPOINT
PORT 4000

USER ( tinggal update user)

POST /users ( register ) => 4002 POST /users (register)
POST /login ( login )    => 4002 POST /users/login (login)
GET /users               => 4002 GET /users
GET /users/:id           => 4002 GET /users/:id

ORDERS ( tinggal update )

GET /orders              => 4001 GET /orders ( get semua order user yg sedang login)
POST /orders             => 4001 POST /orders
DELETE /orders/:id       => 4001 DELETE /orders/:id

BARBER ( tinggal update) 

GET /barbers             => 4001 GET /barbers
GET /barbers/:id         => 4001 GET /barbers/:id
POST /barbers            => 4001 POST /barbers
POST /barbers/login      => 4001 POST /barbers/login
DELETE /barbers/:id      => 40001 DELETE /barbers/:id
                        => 4001 PUT /barbers/:id

