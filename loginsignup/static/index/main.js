define(function(require){
  var $ = require("jquery");//引入Jquery
  var particles = require("particles");//引入particlesJS
  require("poshytip")($);
  var accountStorage = [];
  // 账号信息本地存储数组

  var storage = {
    signup: function(){
      var n = $('#name').val(),
          p = $('#password').val(),
          s = $("input:radio[name='sex']:checked").val(),
          m = $('#major').val(),
          c = $('#cellphone').val();
      var newAccout = {
        name: n,
        password: p,
        sex: s,
        major: m,
        cellphone: c
      }
      if(!n||!p||!s||!m||!c){
        return;
      }
      for(var i = 0;i<accountStorage.length;i++){
        if(accountStorage[i].cellphone == c){
          alert('该手机号已注册！');
          return;
        }
      }
      accountStorage.push(newAccout);
      alert('注册成功！');
    },
    save: function(){
      localStorage.setItem('UserInfo',JSON.stringify(accountStorage));
    },
    init: function(){
      localStorage.getItem('UserInfo') && (accountStorage = JSON.parse(localStorage.getItem('UserInfo')));
    }
  };

  var view = {
    accountCheck: function() {//输入框验证函数及相关操作
      var input = $('input');
      input.on('blur',function() {
        //失焦时校验合法性
        var values = $(this).val();
        var id = $(this).attr('name');
        switch(id){
          case 'name': 
            values.length>0&&values.length<=16 ? $(this).css('box-shadow', 'inset 0 0 5px rgb(255, 255, 255)') : $(this).css('box-shadow', 'inset 0 0 5px rgb(255, 0, 0)');
            break;
          case 'password':
            /[a-zA-Z]\w+/.test(values)&&values.length>=6&&values.length<=16?$(this).css('box-shadow', 'inset 0 0 5px rgb(255, 255, 255)') : $(this).css('box-shadow', 'inset 0 0 5px rgb(255, 0, 0)');
            break;
          case 'cellphone':
            /^1[\d]{10}$/.test(values)?$(this).css('box-shadow', 'inset 0 0 5px rgb(255, 255, 255)'):$(this).css('box-shadow', 'inset 0 0 5px rgb(255, 0, 0)');
          default:
            values.length ? $(this).css('box-shadow', 'inset 0 0 5px rgb(255, 255, 255)'):$(this).css('box-shadow', 'inset 0 0 5px rgb(255, 0, 0)');
        }
      });
      $('#name,#password').poshytip({//气泡提醒插件
        className: 'tip-yellowsimple',
        showOn: 'focus',
        alignTo: 'target',
        alignX: 'left',
        alignY: 'center',
        offsetX: 5,
        slide: false,
        fade: true
      });
    },
    tabSwitch: function() {
      // tab栏切换函数
      var index = 0, //获取当前选择的登录注册按钮选项位置
        underline = $('.underline'),
        tabBtn = $('.tabbar').find('a'),
        formWrapper = $('.view');
      // 切换登陆界面按钮
      tabBtn.click(function(event) {
        tabBtn.removeClass('selected');
        $(this).addClass('selected');
        index = $(this).index();
        index == 0 ? underline.removeClass('left right').addClass('left') : underline.removeClass('left right').addClass('right');

        formWrapper.removeClass('is-visible').eq(index).addClass('is-visible');
      });
    },
    signupListen: function(){
      $('#signup-btn').on('click', function(event) {
        event.preventDefault();
        var input = $('.signup-bar input');
        input.each(function() {
          var name = $(this).attr('name'),
              value = $(this).val();
          if(name == 'name'){
            if(value.length>=20||value.length == 0){
              //alert('请填写姓名！');
              $(this).focus();
              return;
            }
          }else if(name == 'password'){
            if(value.length <6 || value.length>16||!/[a-zA-Z]\w+/.test(value)){
              //alert('请检查密码格式是否正确！');
              $(this).focus();
              return;
            }
          }else if(name == 'cellphone'){
            if(!/^1[\d]{10}$/.test(value)){
              $(this).focus();
              return;
            }
          }
        });
        storage.signup();
        storage.save();
      });
    },
    loginListen: function(){
      $('#login-btn').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        var pass = '',
            id = 1,
            lname = $('#lname').val(),
            lpassword = $('#lpassword').val();
        if(lname.length==0||lname.length>16){
          $('#lname').focus();
          return;
        } else if(lpassword.length==0){
          $('#lpassword').focus();
        }
        for(var i = 0;i<accountStorage.length;i++){
          if(accountStorage[i].cellphone == lname){
            pass = accountStorage[i].password;
            id = i;
          }
        }
        if(pass == ''){
          alert('账号不存在!');
          $('#lname').focus();
        }
        if(accountStorage[id].password == lpassword){
          location.href = "www.baidu.com";
        } else{
          alert('密码错误！');
          $('#lpassword').focus();
        }
      });
    }
  };
  
  $(document).ready(function() {
    storage.init();
    view.accountCheck();
    view.tabSwitch();
    view.signupListen();
    view.loginListen();
    particlesJS('particles-js', {
      particles: {
        color: '#ddd',
        shape: 'circle',
        opacity: 1,
        size: 8,
        size_random: true,
        nb: 50,
        line_linked: {
          enable_auto: true,
          distance: 250,
          color: '#d3d3d3',
          opacity: 1,
          width: 1,
          condensed_mode: {
            enable: false,
            rotateX: 600,
            rotateY: 600
          }
        },
        anim: {
          enable: true,
          speed: 1
        }
      },
      interactivity: {
        enable: false,
        mouse: {
          distance: 250
        },
        detect_on: 'canvas', // "canvas" or "window"
        mode: 'grab',
        line_linked: {
          opacity: .5
        },
        events: {
          onclick: {
            enable: false,
            mode: 'push', // "push" or "remove" (particles)            nb: 4
          }
        }
      },
      /* Retina Display Support */
      retina_detect: true
    })
  });
})