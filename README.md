# 零代码 一键部署chatGPT到企业微信应用 <br/>



<div align="center">
    <img src="https://user-images.githubusercontent.com/12178686/233244040-7ab04261-79d7-4588-b8b1-18fc64d9f040.png" width="400px">
</div>
<div align="center">
    <img src="https://user-images.githubusercontent.com/12178686/233246963-9f7e5eb0-d78f-4286-8536-2f4e9f9bee11.png" width="800px">
</div>

<div align="center"  style="font-size: 12px; line-height: 12px;">
   ChatGPT 接入企业微信,赋能商业成功
</div>

## 🥁 号外号外!

大家好呀！我是[feishu-OpenAI](https://github.com/ConnectAI-E/Feishu-OpenAI)的作者River。非常兴奋地欢迎大家加入我们的[Connect-AI开源马拉松](https://fork-way.feishu.cn/base/LzPObR5YQaHSAssauDAcZdS3nuo?table=tblvKqjRYNfmoLMo&view=vewsekmPW4)活动！

AIGC的热潮正在各行各业掀起巨大的变革，我们看到各大社群以”知识xx“为代表的”割韭菜“行为，不禁感到无奈。身为互联网行业的从业者,与其指点江山激扬文字，不如参与其中，感受发展。为此我们成立了下面10个课题组，并从技术可行性的基础上进行了调研，现并欢迎大家自由选择组队并加入相关的项目推进群。

<p align='center' >
    <img width="1200" alt="image" src="https://user-images.githubusercontent.com/50035229/232206534-0260de35-b0e0-4777-ae8b-0e87f14c8e9f.png">
</p>

无论您是设计师、前端工程师、后端工程师、算法工程师还是测试小伙伴，只要您对GPT技术充满热情，就可以参与到我们的开源项目中来。设计师们可以参与多个repo，优化项目的交互体验和设计风格；前端工程师可以参与每个项目的UI搭建；后端和算法工程师们则可以积极学习AI能力的使用。我们还诚邀测试小伙伴参与每次发版前的功能内测。

每个项目都需要招募一个项目负责人，我们会将其指定为repo的owner。如果您愿意深度参与，可以找我报名成为负责人。当然，如果项目表上有队长名称，则代表已经招募完成。其他同学可以在业余时间参与一个或多个项目。

我们的目标是为AI开源社区提供一个可持续性的生态系统，并且鼓励更多的人参与其中，共同推进AI技术的发展。后续遇到企业的定制AI开发需求，我们会优先邀请相关课题的同学参与，这样既可以帮助他们获取不错的收入，也符合开源的精神和原则。我们希望通过这样的方式，让我们的开源项目更有可持续性，让更多人愿意加入我们，共同推进AI技术的发展！

预期奖励内容包括：
  - A奖励：小队完成度奖励，鼓励小队长参与项目，能够在指定时间内完成课题规定的基本内容，队长应获得一定的奖励。
  - B奖励：项目优秀度奖励，根据项目复杂度、组内配合度、产品创意度，以及期中和期末用户体验打分，评选出部分优秀项目的队长和核心队员，并给予相应奖励。
  - C奖励：成员活跃度奖励，考虑到设计和测试身份的特殊性，无法单独带领项目。因此，我们将评选出优秀设计师和优秀测试反馈员，以表彰他们在项目中的积极参与和贡献。
 
 做出下面奖励安排
  - A奖励项目完成度：京东E卡300 * 10
  - B奖励项目优秀度：
    - 杰出奖: iPhone14 * 1 + 京东E卡300 * 3
    - 优秀奖: PS5 * 1 + 京东E卡300 * 3
  - C奖励成员活跃度：京东E卡300 * 4
 
我们队员有
- [EX-chatGPT](https://github.com/circlestarzero/EX-chatGPT)和[ChatPaper的维护者](https://github.com/kaixindelele/ChatPaper)-->[cc](https://github.com/circlestarzero)
- [钉钉GPT的维护者](https://github.com/eryajf/chatgpt-dingtalk)-->[eryajf](https://github.com/eryajf)
- [飞书GPT的维护者](https://github.com/Leizhenpeng/feishu-chatgpt)-->[river](https://space.bilibili.com/66891783)
- [上百款在线设计插件的开发者](https://mastergo.com/community/profile/72319417503384?tab=plugin)-->山山
- 正在心动的你！


如果您对Connect-AI开源马拉松感兴趣，请随时加入项目推进群，一起为AI技术的未来贡献力量！

<img width="200" alt="image" src="https://user-images.githubusercontent.com/50035229/233607863-b58f7097-2454-4feb-8cae-822ee41267f9.png">

## 关于本项目
本项目可以实现一键部署ChatGPT到企业微信中，使ChatGPT与企业微信完美融合，手机或电脑上，打开企业微信，就可以使用强大的ChatGPT智能问答。截止目前，本项目可以提供两个能力:<br>

1. 功能集成，将ChatGPT问答功能集成到企业微信中，借助企业微信权限功能，可以将ChatGPT共享到企业应用当中，此功能要求简单，有企业微信管理员权限即可，方法，参照下面的**部署方法**
2. 更强大的功能扩展，本项目为开源项目，有开发能力的小伙伴可以Fork到自己的仓库，根据自己企业业务需要，比如结合企业微信开放的API，二次开发一些其他功能。

3. 其他功能，后续更新。


## 部署方法

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


### ChatGPT的诞生给整个产业带来巨大的变化，希望大家多交流，多提issue 和点star 关注后续，也希望更多开发小伙伴参与进来，一起撸代码，一起搞新功能。



