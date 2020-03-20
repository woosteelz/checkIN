# checkin

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Electron
```
yarn electron:serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# API

### Sign Up
### POST /signup
### Request Data
```
{
    "agentID": "회원가입 할 계정에 대한 이메일",
    "agentPW": "회원가입 할 계정에 대한 비밀번호",
    "name": "사용할 이름",
    "errorCount": "오류 횟수, Default=0"
    "numberOfDevice": "추가 등록한 모바일 기기, Default=0"
}
```
### Response Data
```
status: 200
{
    "message": "Success"
}
```
### Sign In
### POST /signin
### Request Data
```
{
    "agentID": "회원가입 할 계정에 대한 이메일",
    "agentPW": "회원가입 할 계정에 대한 비밀번호",
}
```
### Response Data
```
status: 201
{
    "agentID": 로그인한 ID
    "name": 이름
    "JWT": 토큰값
    "siteInfo": [사이트 등록정보1, 사이트 등록정보2 ... ]
}
```
### Sign Out
### GET /signout
### Request Data
```
{
    "agentID": "회원가입 할 계정에 대한 이메일",
    "agentPW": "회원가입 할 계정에 대한 비밀번호",
}
```
### Response Data
```
status: 201
{
    "agentID": 로그인한 ID
    "name": 이름
    "JWT": 토큰값
    "siteInfo": [사이트 등록정보1, 사이트 등록정보2 ... ]
}
```
