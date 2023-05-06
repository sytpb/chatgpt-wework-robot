# 零代码 一键部署chatGPT到企业微信应用 无须VPN<br/>



<div align="center">
    <img src="https://user-images.githubusercontent.com/12178686/233244040-7ab04261-79d7-4588-b8b1-18fc64d9f040.png" width="400px">
</div>
<div align="center">
    <img src="https://user-images.githubusercontent.com/12178686/233246963-9f7e5eb0-d78f-4286-8536-2f4e9f9bee11.png" width="800px">
</div>

<div align="center"  style="font-size: 12px; line-height: 12px;">
   ChatGPT 接入企业微信,赋能商业成功
</div>

## 重要说明
现一键部署已支持钉钉和企业微信, 以下情况请选择钉钉的一键部署：<br>

1. 如果一键部署企业微信遇到域名问题，又不想购买域名，请选择钉钉的一键部署。<br/>
1. 如果一键部署企业微信遇到可信IP问题，又不想购买独立服务器，请选择钉钉的一键部署。<br/>
2. 要求群聊里支持Chatgpt, 请选择钉钉的一键部署。
3. 如果没有特别要求，建议优先选择钉钉的一键部署，因为钉钉相对容易。 <br/>
4. 企业微信部署可能遇到问题及解决办法，最参考下面的**问题汇总**。

<div align="center">
    <img src="https://user-images.githubusercontent.com/12178686/236364198-d1d7d298-16d0-4e81-aaf7-89d108f0eea3.png" width="200px">
</div>
<div align="center">
 [钉钉一键部署ChatGPT](https://github.com/sytpb/chatgpt-dingtalk-robot)
</div>


## 关于本项目
本项目可以实现一键部署ChatGPT到企业微信中，使ChatGPT与企业微信完美融合，手机或电脑上，打开企业微信，就可以使用强大的ChatGPT智能问答。截止目前，本项目可以提供两个能力:<br>

1. 功能集成，将ChatGPT问答功能集成到企业微信中，借助企业微信权限功能，可以将ChatGPT共享到企业应用当中，此功能要求简单，有企业微信管理员权限即可，方法，参照下面的**一键部署方法**
2. 更强大的功能扩展，本项目为开源项目，有开发能力的小伙伴可以Fork到自己的仓库，根据自己企业业务需要，比如结合企业微信开放的API，二次开发一些其他功能。

3. 其他功能，后续更新。


## 一键部署方法

[指导视频](https://youtu.be/UOm39-_Loaw)
1. 创建企业微信应用<br>

第一步，创建应用，操作方法：企微管理员， 电脑端上的企业微信-->头像-->管理企业-->应用管理-->（最下面）创建应用-->应用logo + 填入基本信息

![image](https://user-images.githubusercontent.com/12178686/233253399-489b0905-9a4c-4b2e-8f5d-ed7e8dac0f6b.png)


第二步，配置应用，操作方法：接收消息一栏-->设置API接收-->未完等待第四步。
![image](https://user-images.githubusercontent.com/12178686/233256124-cc6334e3-90ff-43e7-8fe5-3dc0026226fb.png)

第三步，记录和准备下列字段信息， **corpid, agentid, secret, token ,aeskey, open-api-key**

**corpid** :  电脑端上的企业微信-->头像-->管理企业-->我的企业（下方） 图略<br/><br/>
**agentid, secret**: 第一步里完成后可见。
![image](https://user-images.githubusercontent.com/12178686/233275423-67281448-02ee-4e61-8586-0fe095351fb2.png)

**token ,aeskey**： 在设置API接收里（上面第二步）

**open-api-key**
这个需要在ChatGPT账号里生成，（如果没有chatgpt 账号也可以让别人生成一个，但是这个会产生费用） 
![image](https://user-images.githubusercontent.com/12178686/233278134-9d3fb914-9f3a-4049-b20e-3b0f237239f6.png)

[申请网址API KEY](https://platform.openai.com/account/api-keys)


第四步，一键部署到Render（代理服务器，免费，可以升级付费） 
<a href="https://render.com/deploy?repo=https://github.com/sytpb/chatgpt-wework-robot">
  <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render">
</a>

![image](https://user-images.githubusercontent.com/12178686/233276472-77ad1f07-e275-4bc2-a0fa-1c7d0b7172bc.png)

如图所示，将上面的字段信息填入，然后点击Apply。 


需要等3-5分钟部署，完成后复制生成的服务的URL，如下图，**然后拷贝URL后面拼接上/message**, 比如URL是 https://abc.com 拼接成 https://abc.com/message， 粘贴到上面**第二步**页面里，然后点保存，看到提示类似”保存成功“，代表服务已经配置成功了！
![image](https://user-images.githubusercontent.com/12178686/233277321-5392207b-58c5-4c6e-959e-de71518e4094.png)

最后一步： 企业可信IP配置， 应用页的最下方，配置可信IP。 
![image](https://user-images.githubusercontent.com/12178686/233280128-10dbcbdd-db47-47d2-91a0-8b20f2fd8893.png)

IP地址如下图，Render->Connect->Outbound 
![image](https://user-images.githubusercontent.com/12178686/233280575-8d92c978-cf06-4763-9443-694f495d3e16.png)

将这三个ip地址配置到可信IP里，至此所有配置工作完成。
<br/>

:100: 下面就可以直接体验了，手机或电脑上企业微信进入自己创建的应用，可以和ChatGPT的聊起来了。 

经过一段时间的测试，如果想提高回复速度，办法一是升级Render 为付费，另外一个最重要的因素是chatgpt回复的有延迟，因为用的是GPT 3.5 turbo, 如果是PLUS 用户的API Key 会快很多，这是本人的测试情况，供参考。


### 问题汇总
1. 服务器异常，稍后再试 <br/>
请检查服务是否部署完成和正常启动，需要看到your server is live字样才代表服务正常。

2. openapi回调地址请求不通过 <br/>
请请检查你的接收地址配置是否正确， https://..../message ,必须https开头，/message/结束。

3. 收到提示“域名主体校验未通过...” <br/>
解决办法： 原因腾讯对认证企业的安全检测，办法是需要企业有自己的域名，然后配置自己的域名CNAME指向上面的域名，这样就符合企业微信合规检测。


4. 给AI发消息，只收到“正在生成回答”，服务端也看到了AI回复 <br/>
问题原因是没有配置可信IP。按文档中要求正确配置即可。

5. 可信IP无法配置 <br/>
解决办法：提示不允许第三方IP, 要求公司自己的服务器的，原因腾讯对认证企业的安全检测，遇此问题的, 办法一是购买自己的服务器，将服务配置到服务器上，办法二是选择钉钉一键部署，钉钉没有此限制。

## 服务器部署
<details>
    <summary>点击查看详细</summary>
<br>
以下方法适用于，已经拥有自己的独立的服务器的同学。
1. 前提条件，有国内独立服务器，并且有自己独立的域名（企业微信信已认证的，要求域名在公司名下）
域名解析参考
<img src="https://user-images.githubusercontent.com/12178686/236603276-d4bed8fb-5ba0-488c-8da4-5014d2a6bf8d.png">

2. 安装nodejs ，以linux centos 举例，[以下过程作为参考，整个过程待后续详细确认]
centos 为例
```
sudo yum install nodejs  
```
3. github 获取代码
```
git clone https://github.com/sytpb/chatgpt-wework-robot

```
4. 安装服务
```
cd chatgpt-wework-robot
npm install 
```

5. 配置服务
```
 cd /etc/systemd/system
 touch aistory.service
```
vim aistory.service 内容如下
```
[Unit]
Description = ai story service
After = network.target

[Service]
ExecStart = your path/aistory.sh

[Install]
WantedBy = multi-user.target
```

aistory.sh
```
#!/bin/bash
npm run dev
```

```
chmod +x aistory.sh
```

```
systemctl start aistory.service
```
</details>

## 新功能调查

您的工作场景，最想要Chatgpt为您做什么？除了现有的问答模式。假如需要以下功能，

1、语音对话，什么场景用？

2、图片生成，什么场景用？

3、其他，请列举

欢迎来群里讨论！

<div align="center">
     <img src="https://user-images.githubusercontent.com/12178686/236223678-7df62f05-0623-45dd-8cdc-1a355656a75b.jpg" width="200px" alt="group">
</div>



