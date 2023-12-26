---
date: 2019-04-09
category:
  - 开发理论
tag:
  - 网络协议
---
# 工具: netstat查看服务及监听端口详解 

> 在Linux使用过程中，需要了解当前系统开放了哪些端口，并且要查看开放这些端口的具体进程和用户，可以通过netstat命令进行简单查询. 

## netstat的参数

netstat命令各个参数说明如下：

```bash
-a   或–all                             显示所有连线中的Socket。
-A                                       <网络类型>或–<网络类型> 列出该网络类型连线中的相关地址。
-c   或–continuous               持续列出网络状态。
-C 或–cache                       显示路由器配置的快取信息。
-e  或–extend                     显示网络其他相关信息。
-F  或 –fib                          显示FIB。
-g  或–groups                     显示多重广播功能群组组员名单。
-h  或–help                        在线帮助。
-i   或–interfaces                 显示网络界面信息表单。
-l  或–listening                    显示监控中的服务器的Socket。
-M   或–masquerade           显示伪装的网络连线。
-n  或–numeric                   直接使用IP地址，而不通过域名服务器。
-N   或–netlink或–symbolic  显示网络硬件外围设备的符号连接名称。
-o  或–timers                      显示计时器。
-p   或–programs                显示正在使用Socket的程序识别码和程序名称。
-r  或–route                        显示 Routing Table。
-s  或–statistice 显示网络工作信息统计表。
-t  或–tcp 显示TCP 传输协议的连线状况。
-u或–udp 显示UDP传输协议的连线状况。
-v或–verbose 显示指令执行过程。
-V 或–version 显示版本信息。
-w或–raw 显示RAW传输协议的连线状况。
-x或–unix 此参数的效果和指定”-A unix”参数相同。
–ip或–inet 此参数的效果和指定”-A inet”参数相同。
```

## netstat输出内容

以查看当前所有tcp/udp端口为例：

```bash
[root@root ~]# netstat -tulnp
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address               Foreign Address             State       PID/Program name   
tcp        0      0 0.0.0.0:22                  0.0.0.0:*                   LISTEN      1904/sshd           
tcp        0      0 127.0.0.1:631               0.0.0.0:*                   LISTEN      1750/cupsd          
tcp        0      0 0.0.0.0:44567               0.0.0.0:*                   LISTEN      1713/rpc.statd      
tcp        0      0 0.0.0.0:10050               0.0.0.0:*                   LISTEN      1965/zabbix_agentd  
tcp        0      0 172.172.230.xxx:3306        0.0.0.0:*                   LISTEN      31849/mysqld        
tcp        0      0 0.0.0.0:111                 0.0.0.0:*                   LISTEN      1576/rpcbind        
tcp        0      0 172.172.230.xxx:46327       172.172.100.3:80            TIME_WAIT   -                   
tcp        0      0 172.172.230.xxx:46329       172.172.100.3:80            TIME_WAIT   -                   
tcp        0     52 172.172.230.xxx:22          172.172.173.222:50043       ESTABLISHED 6095/sshd           
tcp        0      0 172.172.230.xxx:46326       172.172.100.3:80            TIME_WAIT   -                   
tcp        0      0 172.172.230.xxx:5401        172.172.100.3:443           TIME_WAIT   -                   
tcp        0      0 :::22                       :::*                        LISTEN      1904/sshd           
tcp        0      0 ::1:631                     :::*                        LISTEN      1750/cupsd          
tcp        0      0 :::11776                    :::*                        LISTEN      1713/rpc.statd      
tcp        0      0 :::10050                    :::*                        LISTEN      1965/zabbix_agentd  
tcp        0      0 :::111                      :::*                        LISTEN      1576/rpcbind       
```

对上述返回内容进一步解释如下：

### Proto，Recv-Q，Send-Q

**Proto**:协议名（tcp协议还是udp协议)

**recv-Q**: 网络接收队列

表示收到的数据已经在本地接收缓冲，但是还有多少没有被进程取走，recv() 如果接收队列Recv-Q一直处于阻塞状态，可能是遭受了拒绝服务 denial-of-service 攻击。

**send-Q**: 网路发送队列 对方没有收到的数据或者说没有Ack的,还是本地缓冲区. 如果发送队列Send-Q不能很快的清零，可能是有应用向外发送数据包过快，或者是对方接收数据包不够快。

这两个值通常应该为0，如果不为0可能是有问题的。packets在两个队列里都不应该有堆积状态。可接受短暂的非0情况。

从步骤一的结果中可以看到22端口对应的链路的 send-Q中堆积了大量的数据包 ,可以判定是发送数据给目的地址的时候出现了阻塞的问题，导致了包堆积在本地缓存中，不能成功发出去。

### Local Address

- Local Address 部分的0.0.0.0:22 表示监听服务器上所有ip地址的所有(0.0.0.0表示本地所有ip)，比如你的服务器是有172.172.230.210和 172.172.230.11两个ip地址，那么0.0.0.0:22此时表示监听172.172.230.210,172.172.230.xxx,127.0.0.1三个地址的22端口
- `:::22` 这个也表示监听本地所有ip的22端口，跟上面的区别是这里表示的是IPv6地址，上面的0.0.0.0表示的是本地所有IPv4地址 NOTE “:::” 这三个: 的前两个"::"，是"0:0:0:0:0:0:0:0"的缩写，相当于IPv6的"0.0.0.0"，就是本机的所有IPv6地址，第三个:是IP和端口的分隔符
- `127.0.0.1:631` 这个表示监听本机的loopback地址的631端口(如果某个服务只监听了回环地址，那么只能在本机进行访问，无法通过tcp/ip 协议进行远程访问)
- `::1:631` 这个表示监听IPv6的回环地址的631端口,::1这个表示IPv6的loopback地址
- `172.172.230.xxx:3306` 这里我们看到我们的mysqld进程监听的是172.172.230.xxx的3306端口,这是因为我们在启动的时候指定了bind_address=172.172.230.xxx参数，如果不指定bind_address的话，mysqld默认监听:::3306(本机所有ip地址的3306端口 -IPv6)

### Foreign Address

与本机端口通信的外部socket。显示规则与Local Address相同

### State

共有11种链路状态 + Unknown，共计12种state值，前面11种是按照TCP连接建立的三次握手和TCP连接断开的四次挥手过程来描述的。

| 状态        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| LISTEN      | 首先服务端需要打开一个socket进行监听，状态为LISTEN./* The socket is listening for incoming connections. 侦听来自远方TCP端口的连接请求 */ |
| SYN_SENT    | 客户端通过应用程序调用connect进行active open.于是客户端tcp发送一个SYN以请求建立一个连接.之后状态置为SYN_SENT./*The socket is actively attempting to establish a connection. 在发送连接请求后等待匹配的连接请求 */ |
| SYN_RECV    | 服务端应发出ACK确认客户端的 SYN,同时自己向客户端发送一个SYN. 之后状态置为SYN_RECV/* A connection request has been received from the network. 在收到和发送一个连接请求后等待对连接请求的确认 */ |
| ESTABLISHED | 代表一个打开的连接，双方可以进行或已经在数据交互了。/* The socket has an established connection. 代表一个打开的连接，数据可以传送给用户 */ |
| FIN_WAIT1   | 主动关闭(active close)端应用程序调用close，于是其TCP发出FIN请求主动关闭连接，之后进入FIN_WAIT1状态./* The socket is closed, and the connection is shutting down. 等待远程TCP的连接中断请求，或先前的连接中断请求的确认 */ |
| CLOSE_WAIT  | 被动关闭(passive close)端TCP接到FIN后，就发出ACK以回应FIN请求(它的接收也作为文件结束符传递给上层应用程序),并进入CLOSE_WAIT./* The remote end has shut down, waiting for the socket to close. 等待从本地用户发来的连接中断请求 */ |
| FIN_WAIT2   | 主动关闭端接到ACK后，就进入了 FIN-WAIT-2 ./* Connection is closed, and the socket is waiting for a shutdown from the remote end. 从远程TCP等待连接中断请求 */ |
| LAST_ACK    | 被动关闭端一段时间后，接收到文件结束符的应用程 序将调用CLOSE关闭连接。这导致它的TCP也发送一个 FIN,等待对方的ACK.就进入了LAST-ACK ./* The remote end has shut down, and the socket is closed. Waiting for acknowledgement. 等待原来发向远程TCP的连接中断请求的确认 */ |
| TIME_WAIT   | 在主动关闭端接收到FIN后，TCP 就发送ACK包，并进入TIME-WAIT状态。/* The socket is waiting after close to handle packets still in the network.等待足够的时间以确保远程TCP接收到连接中断请求的确认 */ |
| CLOSING     | 比较少见./* Both sockets are shut down but we still don’t have all our data sent. 等待远程TCP对连接中断的确认 */ |
| CLOSED      | 被动关闭端在接受到ACK包后，就进入了closed的状态。连接结束./* The socket is not being used. 没有任何连接状态 */ |
| UNKNOWN     | 未知的Socket状态。/* The state of the socket is unknown. */  |

备注

- `SYN`: (同步序列编号,Synchronize Sequence Numbers)该标志仅在三次握手建立TCP连接时有效。表示一个新的TCP连接请求。
- `ACK`: (确认编号,Acknowledgement Number)是对TCP请求的确认标志,同时提示对端系统已经成功接收所有数据。
- `FIN`: (结束标志,FINish)用来结束一个TCP回话.但对应端口仍处于开放状态,准备接收后续数据。

### PID/Program

PID即进程id，Program即使用该socket的应用程序

## 常用的一些命令

`netstat -t/-u/-l/-r/-n`【显示网络相关信息,-t:TCP协议,-u:UDP协议,-l:监听,-r:路由,-n:显示IP地址和端口号】

注：以下返回内容中，我用xxx注释掉了一部分敏感ip地址。

### 显示协议统计信息和TCP/IP网络连接

注：删减了部分结果

```bash
[root@root ~]# netstat -ano
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       Timer
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      off (0.00/0/0)
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      off (0.00/0/0)
tcp        0      0 172.21.0.14:443         120.242.11.29:15878     ESTABLISHED off (0.00/0/0)
tcp        0      0 172.21.0.14:55758       169.254.0.4:80          TIME_WAIT   timewait (33.29/0/0)
tcp        0   6728 172.21.0.14:443         183.249.4.28:52323      ESTABLISHED on (0.05/0/0)
tcp6       0      0 :::3306                 :::*                    LISTEN      off (0.00/0/0)
udp        0      0 0.0.0.0:68              0.0.0.0:*                           off (0.00/0/0)
udp        0      0 172.21.0.14:123         0.0.0.0:*                           off (0.00/0/0)
udp        0      0 127.0.0.1:123           0.0.0.0:*                           off (0.00/0/0)
udp6       0      0 fe80::5054:ff:fe2b::123 :::*                                off (0.00/0/0)
udp6       0      0 ::1:123                 :::*                                off (0.00/0/0)
Active UNIX domain sockets (servers and established)
Proto RefCnt Flags       Type       State         I-Node   Path
unix  2      [ ACC ]     STREAM     LISTENING     67561565 /usr/local/yd.socket.server
unix  2      [ ACC ]     STREAM     LISTENING     13619    /var/run/acpid.socket
unix  2      [ ACC ]     STREAM     LISTENING     12855    /var/run/lsm/ipc/simc
unix  2      [ ACC ]     STREAM     LISTENING     12857    /var/run/lsm/ipc/sim
unix  2      [ ]         DGRAM                    10062    /run/systemd/shutdownd
unix  2      [ ]         DGRAM                    15773    
unix  3      [ ]         STREAM     CONNECTED     67561623 
```

### 查看本机监听的端口

```bash
[root@root ~]# netstat -tlun
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN                          
udp        0      0 172.21.0.14:123         0.0.0.0:*                          
udp        0      0 127.0.0.1:123           0.0.0.0:*                          
udp6       0      0 fe80::5054:ff:fe2b::123 :::*                               
udp6       0      0 ::1:123                 :::*   
```

### 查看本机路由表

```bash
[root@root ~]# netstat -rn
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         172.21.0.1      0.0.0.0         UG        0 0          0 eth0
169.254.0.0     0.0.0.0         255.255.0.0     U         0 0          0 eth0
172.21.0.0      0.0.0.0         255.255.240.0   U         0 0          0 eth0
```

### 列出所有端口

```bash
[root@root ~]# netstat -a 
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 VM-0-14-cent:cslistener 0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:http            0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:us-srv          0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:ssh             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:https           0.0.0.0:*               LISTEN     
tcp        0      0 pdai-centos:https    125.85.238.55:7123      TIME_WAIT  
tcp        0      0 pdai-centos:https    39.144.22.5:50742       ESTABLISHED
...
```

### 列出所有的TCP端口

```bash
[root@root ~]# netstat -at
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 VM-0-14-cent:cslistener 0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:http            0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:us-srv          0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:ssh             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:https           0.0.0.0:*               LISTEN     
tcp        0      0 pdai-centos:https    39.144.22.xx:50742       FIN_WAIT2  
tcp        0      0 pdai-centos:https    59.71.243.xx:6994      ESTABLISHED
tcp        0      0 pdai-centos:https    125.85.238.xx:7096      FIN_WAIT2  
tcp6       0      0 [::]:mysql              [::]:*                  LISTEN     
tcp6       0      0 [::]:distinct           [::]:*                  LISTEN     
tcp6       0      0 [::]:ddi-tcp-1          [::]:*                  LISTEN     
tcp6       1      0 172.21.0.14:ddi-tcp-1   140.82.115.xx:24923    CLOSE_WAIT 
tcp6       1      0 172.21.0.14:ddi-tcp-1   140.82.115.xx:64953    CLOSE_WAIT 
tcp6       1      0 172.21.0.14:ddi-tcp-1   140.82.115.xx:55955    CLOSE_WAIT 
```

### 列出所有的UDP端口

```bash
[root@root ~]# netstat -au 
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
udp        0      0 0.0.0.0:bootpc          0.0.0.0:*                          
udp        0      0 pdai-centos:ntp      0.0.0.0:*                          
udp        0      0 pdai-centos:ntp      0.0.0.0:*                          
udp6       0      0 pdai-centos:ntp      [::]:*                             
udp6       0      0 pdai-centos:ntp      [::]:*  
```

### 列出所有监听TCP端口的socket

```bash
[root@root ~]# netstat -lt 
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 VM-0-14-cent:cslistener 0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:http            0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:us-srv          0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:ssh             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:https           0.0.0.0:*               LISTEN     
tcp6       0      0 [::]:mysql              [::]:*                  LISTEN     
tcp6       0      0 [::]:distinct           [::]:*                  LISTEN     
tcp6       0      0 [::]:ddi-tcp-1          [::]:*                  LISTEN 
```

### 列出所有监听UDP端口的socket

```bash
[root@root ~]# netstat -lu 
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
udp        0      0 0.0.0.0:bootpc          0.0.0.0:*                          
udp        0      0 pdai-centos:ntp      0.0.0.0:*                          
udp        0      0 pdai-centos:ntp      0.0.0.0:*                          
udp6       0      0 pdai-centos:ntp      [::]:*                             
udp6       0      0 pdai-centos:ntp      [::]:*  
```

### 找出程序运行的端口

以ssh为例

```bash
[root@root ~]# netstat -ap | grep ssh 
tcp        0      0 0.0.0.0:ssh             0.0.0.0:*               LISTEN      1120/sshd           
tcp        0     64 pdai-centos:ssh      117.82.229.xx:41408    ESTABLISHED 28968/sshd: xx@pt 
tcp        0      0 pdai-centos:ssh      xxx.122.15.xx:32966     TIME_WAIT   -                   
tcp        0      0 pdai-centos:ssh      203.xxx.85.146:43730    ESTABLISHED 687/sshd: xx [pri 
tcp        0      0 pdai-centos:ssh      134.xx.xx.36:54474     TIME_WAIT   -                   
tcp        0      0 pdai-centos:ssh      64.xx.111.127:45444    TIME_WAIT   -                   
unix  3      [ ]         STREAM     CONNECTED     16580    1120/sshd            
unix  2      [ ]         DGRAM                    113619201 28968/sshd: root@pt  
```

### 几个有用查找

1.查找请求数前20个IP（常用于查找攻来源）：

```bash
netstat -anlp|grep 80|grep tcp|awk '{print $5}'|awk -F: '{print $1}'|sort|uniq -c|sort -nr|head -n20
 
netstat -ant |awk '/:80/{split($5,ip,”:”);++A[ip[1]]}END{for(i in A) print A[i],i}' |sort -rn|head -n20
```

3.查找较多time_wait连接

```bash
netstat -n|grep TIME_WAIT|awk '{print $5}'|sort|uniq -c|sort -rn|head -n20
```

4.找查较多的SYN连接

```bash
netstat -an | grep SYN | awk '{print $5}' | awk -F: '{print $1}' | sort | uniq -c | sort -nr | more
```

5.根据端口列进程

```bash
netstat -ntlp | grep 80 | awk '{print $7}' | cut -d/ -f1
```