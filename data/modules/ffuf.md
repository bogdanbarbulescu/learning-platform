### **ffuf** stands for **Fuzz Faster U Fool**. It's a tool used for web enumeration, fuzzing, and directory brute forcing.

Install SecLists

SecLists is a collection of multiple types of lists used during security assessments. List types include usernames, passwords, URLs, sensitive data patterns, fuzzing payloads, web shells, and many more.

At a minimum we're required to supply two options: `-u` to specify an URL and `-w` to specify a wordlist. The default keyword `FUZZ` is used to tell ffuf where the wordlist entries will be injected. We can append it to the end of the URL like so:


``` bash
ffuf -u http://10.10.51.137/FUZZ -w /usr/share/seclists/Discovery/Web-Content/big.txt`
```

You could also use any custom keyword instead of `FUZZ`, you just need to define it like this `wordlist.txt:KEYWORD`.  

``` bash
ffuf -u http://10.10.51.137/NORAJ -w /usr/share/seclists/Discovery/Web-Content/big.txt:NORAJ`
```

start enumerating with a generic list of files such as raft-medium-files-lowercase.txt.
``` bash
ffuf -u http://10.10.51.137/FUZZ -w /usr/share/seclists/Discovery/Web-Content/raft-medium-files-lowercase.txt
```
