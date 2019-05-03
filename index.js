// var http = require('http');

// var server = http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.end("Hello World\n");
// });

// server.listen(8000);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~

// seneca demo
var seneca = require('seneca')();

seneca.add({role: 'math', cmd: 'sum'}, function(msg, respond) {
  var sum = msg.left + msg.right;
  respond(null, {answer: sum});
});

seneca.add({role: 'math', cmd: 'product'}, function(msg, respond) {
  var product = msg.left * msg.right;
  respond(null, {answer: product});
});

seneca.act({role: 'math', cmd: 'sum', left: 1, right: 2}, console.log);
seneca.act({role: 'math', cmd: 'product', left: 3, right: 4}, console.log);

console.log("demo-test1:-------------------------------------------")
seneca.add({component: 'greeter'}, function(msg, respond) {
  var sum = msg.left + msg.right;
  respond(null, {message: 'Hello ' + msg.name});
});

seneca.act({component: 'greeter', name: 'David'}, function(error, response) {
  if(error) return console.log(error);
  console.log(response.message);
});

// seneca 的模式匹配
// 模式匹配是微服务中最灵活的软件模式之一。
console.log("demo-test2:-------------------------------------------")
seneca.add({cmd: 'wordcount'}, function(msg, respond) {
  var length = msg.phrase.split(' ').length; 
  respond(null, {words: length});
});

seneca.act({cmd: 'wordcount', phrase: 'Hello world this is Seneca'}, function(error, response) {
  console.log(response);
});

// Seneca 模式匹配 Paturn  最长的匹配链 模式中元素的顺序
seneca.add({role: 'math', cmd: 'sum'}, function(msg, respond) {
  var sum = msg.left + msg.right;
  respond(null, {answer: sum});
});

seneca.add({role: 'math', cmd: 'sum', integer: true}, function(msg, respond) {
  this.act({role: 'math', cmd: 'sum', left: Math.floor(msg.left), right: Math.floor(msg.right)}, respond);
});

seneca.act({role: 'math', cmd: 'sum', left: 1.4, right: 3.4}, console.log);
seneca.act({role: 'math', cmd: 'sum', left: 1.4, right: 3.4, integer: true}, console.log);

// Seneca 编写插件
function minimalPlugin(options) {
  console.log(options);
}

seneca.use(minimalPlugin, {foo: 'bar'});
// node index.js  --seneca.log.all


function math(options){
  this.add({role: 'math', cmd: 'sum'}, function(msg, respond){
    respond(null, {answer: msg.left + msg.right});
  });
  this.add({role: 'math', cmd: 'product'}, function(msg, respond){
    respond(null, {answer: msg.left + msg.right});
  });
}

require('seneca')().use(math).act('role:math,cmd:sum,left:1,right:2', console.log);

function init(msg, respond) {
  console.log('plugin initialized!');
  console.log('expensive operation taking place now... DONE!');
  respond();
}

function math(options) {
  this.add({role: 'math', cmd: 'sum'}, function(msg, respond){
    respond(null, {answer: msg.left + msg.right});
  });
  this.add({role: 'math', cmd: 'product'}, function(msg, respond){
    respond(null, {answer: msg.left + msg.right});
  });
  this.add({init: 'math'}, init);
}

require('seneca')().use(math).act('role:math,cmd:sum,left:1,right:5', console.log);


// 整合web服务器
// Express 是基于Node.js构建web应用的首选。 Seneca不是一个web框架，是一个通用的微服务框架，Seneca能够非常轻易的与其他框架进行整合。
// 将Seneca作为Express的中间件
// Express是基于API聚合原则构建的，在Express中，每个软件模块都被成为中间件，他们在代码中以链式结构串联，以此来处理每个请求。
console.log("demo-test3:-------------------------------------------")

var seneca = require('seneca')();
var Web = require("seneca-web");
seneca.add('role:api,cmd:bazinga', function(args, done){
  done(null, {bar: 'Bazinga!'});
});

var config = {
  routes:{
      prefix : "/my-api",
      pin: "role:api,cmd:*",
      map:{
          bazinga: {
              GET: true
          }
      }
  }
};
console.log("demo-test4:-------------------------------------------")

var express = require('express');
var app = express();
seneca.use(Web, { adapter: "express", context: app });
seneca.act('role:web', config);

app.listen(3000);


// PM2 是一款可以为服务器实例带来负载均衡功能的生产级别的进程管理器，通过PM2我们可以自由伸缩Node.js应用。此外，它能确保进程持续运行，解决Node.js单线程模型带来的副作用：一个没有被捕获的异常通过杀死线程，进而杀死整个应用。
// Node.js应用是单线程执行的，这不表示Node.js不能并发，她表示你的应用是以单线程模式运行的，而其余任务是并行的。
// 单线程模式意味着，如果抛出异常没有被处理的话，应用程序将会挂掉。
// Node.js中 可以通过任务执行器解决单线程问题，例如：forever。
// forever与PM2都是任务执行器，当应用意外退出时，他们可以重启你的应用，从而能确保其正常运行。
// nodemon 当它探测到监控的文件发生变化，应用将重载应用。 





// 安全性和可追溯性
    // 基础设施的逻辑安全   SSH
    // 应用程序安全  OWASP (Open web Apllication SecurityProject)
    // 可追溯性
    // 审计  

// Vagrant 搭建虚拟机，可以自动部署环境。
// SSH 采用的密码学算法称为RSA，该算法基于非对称加密方式构建。一个是公钥， 一个密钥。

// 应用程序开发中主要有四大类安全问题。
    // 注入  SQL注入
    // 跨站脚本攻击(XSS) 将代码注入到第三方网页中，然后然后从客户端浏览器中盗走数据(会话cookie)。  最常见的方式是通过客户端的转义输入。 分类：持久型和非持久型  防止方式：对输出编码
    // 跨站请求伪造(CSRF) 指攻击者通过HTTP请求将数据传送到服务器，从而盗取会话cookie。 防止方式: 使用跨站请求令牌
    // 开放重定向  防止方式: 使用白名单
// $ node index.js  --seneca.log.quiet


// Node.js微服务的测试及文档化

  // 功能性测试
    // 单元测试 (白盒测试) 测试覆盖率
    // 集成测试
    // 端到端测试 使用Selenium来模拟DOM单击，从而对UI进行测试。
  
// 在与测试相关的方面, Node.js拥有非常强大的代码库集合, 其中有两个尤其流行, Mocha和Chai.
// Chai是一个BDD(行为驱动开发)/TDD(测试驱动开发)断言库, 可用于协同其他任何库常见高质量的测试.
// Mocha它遵循行为驱动开发测试(BDDT)的原则.每个测试都描述了应用的一个用例,并通过使用其他库的断言来验证执行代码的结果. 自我的领域特定语言(DSL).
// Sinon.js mocking框架.
// 测试覆盖率 istanbul

// 微服务监控
  // 服务监控
    // 系统指标
      // 内存指标
      // CPU使用率
      // 磁盘使用率
    // 应用指标
      // 单位时间内的错误数
      // 单位时间捏的调用数
      // 响应时间
// 采用PM@和keymetrics进行监控


