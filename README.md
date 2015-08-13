# nodeChat  

 - A web chatting application based on node and websocket  
 - 基于node和socket.io的网页版即时聊天程序  

---

# install  

 - npm install express  
 - npm install socket.io  

---

## error  

 - ![image](https://github.com/willworks/nodeChat/raw/master/README/error.png)  
 - 在此解决方案中一次生成一个项目。若要启用并行生成，请添加“/m”开关  
 - MSBUILD : error MSB3428: 未能加载 Visual C++ 组件“VCBuild.exe”  
 - 要解决此问题<br />  
	1) 安装 .NET Fram ework 2.0 SDK  
	2) 安装 Microsoft Visual Studio 2005   
	3) 如果将该组件安装到了其他位置，请将其位置添加到系统路径中  

---

## reason    

 - my point was that you don't need Visual Studio 2005 -- the message about the .NET Framework 2 SDK is misleading  
   You just need MSBuild and the C++ compiler, which come along with the Windows SDK I gave you the link to (or by installing a later version of Visual Studio that work on Win8) http://msdn.microsoft.com/en-us/windows/desktop/hh852363.aspx  
   I'm on Win8 / VS2012 and building native code through npm is not a problem  
 - 我也找了半天，我机器上装的是vs2012，就是转换可能会有问题，从2008到2012更新的强制指定吧，比如用vs2012：npm config set msvs_version 2012 --global  
 - This looks like an issue with building socket.io, specifically the ws package that it depends on, based on the log.However, this is more of a core Node / gyp issue anyhow.. and I think the error message may be a red herring. You should just be able to install the Windows SDK from here and you'll be good to go  
 - 参考github：https://github.com/karma-runner/karma/issues/536  
 - 所以最终可能的问题是socket.io需要重新用node-gyp编译，而node-gyp依赖于python和msvc和msframeworks  
 - 安装node-gyp环境要求 (https://github.com/TooTallNate/node-gyp/blob/master/README.md) 
 - ![image](https://github.com/willworks/nodeChat/raw/master/README/require.png)  

---

