# 企业微信应用-chatGPT AI 智能问答  **不需要VPN**


<div align="center">
    <img src="https://user-images.githubusercontent.com/12178686/233244040-7ab04261-79d7-4588-b8b1-18fc64d9f040.png" width="400px">
</div>
<div align="center">
    <img src="https://user-images.githubusercontent.com/12178686/233246963-9f7e5eb0-d78f-4286-8536-2f4e9f9bee11.png" width="800px">
</div>

<div align="center"  style="font-size: 12px; line-height: 12px;">
   ChatGPT 接入企业微信,赋能商业成功
</div>


## 关于本项目
本项目可以实现一键部署ChatGPT到企业微信中，使ChatGPT与企业微信完美融合，手机或电脑上，打开企业微信，就可以使用强大的ChatGPT智能问答。截止目前，本项目可以提供两个能力:<br>

1. 功能集成，将ChatGPT问答功能集成到企业微信中，借助企业微信权限功能，可以将ChatGPT共享到企业应用当中，此功能要求简单，有企业微信管理员权限即可，方法，参照下面的**部署方法**
2. 更强大的功能扩展，本项目为开源项目，有开发能力的小伙伴可以Fork到自己的仓库，根据自己企业业务需要，比如结合企业微信开放的API，二次开发一些其他功能。

3. 其他功能，后续更新。


## 部署方法

1. 创建企业微信应用<br>

第一步，创建应用，操作方法：企微管理员， 电脑端上的企业微信-->头像-->管理企业-->应用管理-->（最下面）创建应用-->应用logo + 填入基本信息

![image](https://user-images.githubusercontent.com/12178686/233253399-489b0905-9a4c-4b2e-8f5d-ed7e8dac0f6b.png)


第二步，配置应用，操作方法：接收消息一栏-->设置API接收-->未完等待第三步。
![image](https://user-images.githubusercontent.com/12178686/233256124-cc6334e3-90ff-43e7-8fe5-3dc0026226fb.png)

第三步，记录和准备下列字段信息， **corpid, agentid, secret, token ,aeskey, open-api-key**

**corpid** :  电脑端上的企业微信-->头像-->管理企业-->我的企业（下方） 图略<br/><br/>
**agentid, secret**: 第一步里完成后可见。
![image](https://user-images.githubusercontent.com/12178686/233275423-67281448-02ee-4e61-8586-0fe095351fb2.png)

**token ,aeskey**： 在设置API接收里（上面第二步）

第四步，一键部署到Render（代理服务器，免费，可以升级付费） 
<a href="https://render.com/deploy?repo=https://github.com/sytpb/chatgpt-wework-robot">
  <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render">
</a>

![image](https://user-images.githubusercontent.com/12178686/233276472-77ad1f07-e275-4bc2-a0fa-1c7d0b7172bc.png)

如图所示，将上面的字段信息填入，然后点击Apply。 






