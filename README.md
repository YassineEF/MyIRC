# Project Chat

Chat with ur friends with this project using node.js, typescript and socket.io.

## Run Locally

Clone the project

```bash
  git clone https://rendu-git.etna-alternance.net/module-9277/activity-50573/group-1003882.git project_chat
```

Go to the project directory

```bash
  cd project_chat
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```

Start the client

```bash
  npm run client
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DB_USERNAME`
`DB_PASSWORD`

## Commands line ref

#### Register and login

```http
  -l -u `username` -p `password`
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `-l`      | `string` | **Required** use this command for login    |
| `-r`      | `string` | **Required** use this command for register |
| `-u`      | `string` | **Required** enter ur username             |
| `-p`      | `string` | **Required** enter ur username             |

#### Send private message

```http
  -mp `receiver` -m `message`
```

| Parameter  | Type     | Description                                       |
| :--------- | :------- | :------------------------------------------------ |
| `-mp`      | `string` | **Required**. send private message                |
| `receiver` | `string` | **Required**. enter the name of receiver          |
| `-m`       | `string` | **Required**. write ur message after this command |

#### Send message to room

```http
  -mr `message`
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `-mr`     | `string` | **Required**. send message to room |
| `message` | `string` | **Required**. write ur message.    |

#### View list

```http
  -list
```

| Parameter     | Type     | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `-list`       | `string` | **Required**. return all user connected |
| `--list_room` | `string` | **Required**. return all room created   |
| `-help`       | `string` | **Required**. return all commands       |

#### Command room

```http
  -cr `room`
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `-cr`     | `string` | **Required**. create room and join her |
| `-jr`     | `string` | **Required**. join the room            |
| `room`    | `string` | **Required**. name of the room         |

#### Command export message

```http
  -em_find -b `date_before` -n `date_after`
```

```http
  -em_u -u `name`
```

```http
  -em_m
```

| Parameter     | Type     | Description                                                |
| :------------ | :------- | :--------------------------------------------------------- |
| `-em_find`    | `string` | **Required**. comand for export message between to date    |
| `-em_u`       | `string` | **Required**. comand for export message user               |
| `-b`          | `string` | **Required**. enter date after this command                |
| `-n`          | `string` | **Required**. enter date after this command                |
| `date_before` | `string` | **Required**. old date enter like this : **AAAA-MM-DD**    |
| `date_after`  | `string` | **Required**. recent date enter like this : **AAAA-MM-DD** |

#### Command admin

```http
  -em_find -b `date_before` -n `date_after`
```

```http
  -em_u -u `name`
```

```http
  -cp -u `name` -p `new_password`
```

| Parameter      | Type     | Description                                  |
| :------------- | :------- | :------------------------------------------- |
| `-em_u`        | `string` | **Required**. comand for export message user |
| `-u`           | `string` | **Required**. name of user                   |
| `-cp`          | `string` | **Required**. change password                |
| `-p`           | `string` | **Required**. name of user                   |
| `new_password` | `string` | **Required**. new password                   |

## Authors

- [lefebv_a](https://github.com/LefebvreAnthony)

- [elfall_y](https://github.com/YassineEF)
  ![Logo](https://i.pinimg.com/564x/09/eb/d9/09ebd97b43c35df55c57e34f83bcefd6.jpg)
