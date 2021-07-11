import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
// const path = require('path')
const { path } = require('@vuepress/utils')
// 
const fs = require('fs')
const chokidar = require('chokidar')
const watcher = chokidar.watch('docs',{
  ignored: /[\/\\]\./, 
  persistent: true
})
// 
const filePath = path.resolve('./docs');
const fileArr = []
//文件遍历方法
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表123
    fs.readdir(filePath,function(err,files){
        if(err) {
            console.warn(err)
        } else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
              if (filename !== '.vuepress' && filename !== 'README.md') {
                // 获取当前文件的绝对路径
                const filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                  if(eror){
                      console.warn('获取文件stats失败');
                  }else{
                    const isFile = stats.isFile();//是文件
                    const isDir = stats.isDirectory();//是文件夹
                    if(isFile){
                      fileArr.push(filedir)
                      // console.log(filedir,"------:filedir",fileArr);
                    }
                    if(isDir){
                      fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                    }
                  }
                })
              }
              
            });
        }
    });
}
//调用文件遍历方法
fileDisplay(filePath);
// 
watcher
    .on('addDir',function(paths) {
      const urlPath = paths.replace(/\\/g,'/')
      console.log(urlPath,":urlPath");
      // console.log(fileArr,";fileArr");
      
      for (const item of fileArr) {
        // console.log(item,":item",item.indexOf(`${urlPath}`));
        if(item.indexOf(`${urlPath}`) === -1) {
          console.log(item,":item");
          // fs.writeFile(path.resolve(`${urlPath}/`)+'/README.md',`# ${urlPath}`,function(err) {
          //   if(err) {
          //     console.error(err);
          //   }
          //   console.log("写入成功！");
          // })
        }
      }
      
    })


export default defineUserConfig<DefaultThemeOptions>({
  bundler: '@vuepress/vite',
  lang: 'zh-CN',
  title: 'zr-frontend-docs',
  description: 'zr-frontend-docs',

  // 配置图片路径
  alias: {
    '@fristImages': path.resolve(__dirname, '../guide/frist/images')
  },

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    // 导航内容
    navbar: [
      {
        text: 'GUIDE',
        link: '/guide/'
      },
      {
        text: 'GUIDEGroup',
        children: [
          {
            text: 'SubGroup',
            children: [
              '/guide/frist/',
              '/guide/second/'
            ]
          },
        ],
      } 
    ],
    // 左侧菜单
    sidebar: {
      '/guide/': [
        {
          text: 'guide',
          children: [
            {
              text: 'FRIST',
              link: '/guide/frist/'
            },
            // '/guide/frist/FRIST.html',
            '/guide/second/'
          ]
        }
      ]
    },
  },

  // 配置插件
  plugins: [
    // ['@vuepress/plugin-pwa'],
    // [
    //   '@vuepress/plugin-pwa-popup',
    //   {
    //     locales: {
    //       '/': {
    //         message: '发现新内容可用',
    //         buttonText: '刷新',
    //       },
    //     },
    //   },
    // ],
    // [
    //   require('@vuepress/plugin-register-components'),
    //   {
    //     component: {
    //       name: 'Test',
    //       Test: path.resolve(__dirname, './components/Test.vue'),
    //     }
    //   }
    // ],
  ],
})