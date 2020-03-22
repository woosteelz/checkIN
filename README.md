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

<hr/>

# API
> ## POST /signup
> ### Request Data
> ```
>    body:
>    {
>        "agentID": "회원가입 할 계정에 대한 이메일",
>        "agentPW": "회원가입 할 계정에 대한 비밀번호",
>        "name": "사용할 이름",
>        "errorCount": "오류 횟수, Default=0"
>        "numberOfDevice": "추가 등록한 모바일 기기, Default=0"
>    }
> ```
>
> ### Response Data
>   * #### Successful
>   ```
>   header:
>   {
>       "status": 200
>   }
>   ```
>   * #### Unsuccessful
>   ```
>   header:
>   {
>       "status": 400
>   }
>   body:
>   {
>       "error": "error 종류 ex) Missing password"
>   }
>   ```
  


> ## POST /signin
> ### Request Data
>   ```
>   body:
>   {
>       "agentID": "회원가입 할 계정에 대한 이메일",
>       "agentPW": "회원가입 할 계정에 대한 비밀번호",
>   }
>   ```
>
> ### Response Data
>   * #### Successful
>   ```
>   header:
>   {
>       "status": 201
>   }
>   body:
>   {
>       "agentID": 로그인한 ID
>       "name": 이름
>       "JWT": 토큰값
>       "siteInfo": ['사이트 등록정보1', '사이트 등록정보2' ... ]
>   }
>   ```
>   * #### Unsuccessful
>   ```
>   header:
>   {
>       "status": 400
>   }
>   body:
>   {
>       "error": "error 종류 ex) Missing password"
>   }
>   ```



> ## GET /signout
> ### Request Data
>   ```
>   header:
>   {
>       "Authorization": "JWT값"
>   }
>   ```
>
> ### Response Data
>   * #### Successful
>   ```
>   header:
>   {
>       "status": 200
>   }
>   ```
>   * #### Unsuccessful
>   ```
>   header:
>   {
>       "status": 400
>   }
>   body:
>   {
>       "error": "error 종류 ex) Missing password"
>   }
>   ```
