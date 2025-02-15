
## Basic PowerShell commands and uses

Let’s begin by reviewing some fundamental PowerShell commands and use cases. These commands are the building blocks to create scripts that will help automate and review security-related tasks.

### `Get-Help`

To get help or more details for the particular command, you can use the **`Get-Help`** cmdlet with the command that you need help with. For example, if we run the following:

``` PowerShell
Get- Help Get-Process
```

We will get additional help on a specific command.

You can view a list of all available help topics by typing `Get-Help`.


### Cmdlets

We just mentioned **cmdlets**, but what are they? cmdlets are small, lightweight PowerShell modules designed to run tasks in place of traditional commands. Cmdlets will return an output as an object (or an array of objects) which also allows you to transfer this data to other cmdlets using pipes.

Cmdlets always contain a verb and a noun separated by a dash. (For Example: `Get-DnsServer` or `Remove-ADGroup`.

Examples of verbs you might see are:

**Get**: get something **Set**: define something **Start**: run something **Stop**: stop something **New**: create something


### Pipe

A pipe character `|` is used to pass data from one cmdlet to another. For example, pipes can be used to sort the output of one cmdlet and redirect that output to a file. Multiple pipes can be used in tandem to build more complex actions!

For example, to create a list of running processes on your machine, and save it to a file, we would use the command below:

``` PowerShell
Get-Process | Out-File c:\PS\powershell.txt
```

Learn more in the [Out-File docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/out-file?view=powershell-7.2).


### Using PowerShell to traverse directories

Commands for changing directories and viewing directory listings are the same as the Linux command line and Windows command prompt. Commands such as `cd`, `dir`, `mkdir`,`ls`, `type`, etc will still work.

[Learn more in the Managing Current Location docs](https://docs.microsoft.com/en-us/powershell/scripting/samples/managing-current-location?view=powershell-7.2).


### Aliases

Aliases in PowerShell provide an alternative name for running a cmdlet. There are several shorthand aliases built-in. For example, the `ls` command will generate the same results as `Get-ChildItem`.

``` 
PS C\User\U1D256> ls  
  
     Directory: C\User\U1D256>  
  
Mode                 LastWriteTime        Length Name  
----                 -------------        ------ ----  
d-----           11/5/2021 10:37AM               .vscode  
d-r---           11/16/2021 8:00AM               .Documents  
d-r---          12/17/2021 10:02AM               .Downloads  
  
PS C\User\U1D256> Get-ChildItem  
  
     Directory: C\User\U1D256>  
  
Mode                 LastWriteTime        Length Name  
----                 -------------        ------ ----  
d-----           11/5/2021 10:37AM               .vscode  
d-r---           11/16/2021 8:00AM               .Documents  
d-r---          12/17/2021 10:02AM               .Downloads
```

All aliases can be viewed by running the `alias` command, and specific aliases can be viewed by specifying them; for example, `alias cd`. In the screenshot below we see that the alias for **cd** is **Set-Location**.

```
PS C\User\U1D256> alias cd  
  
Command Type      Name                 Version      Source      
------------      ----                 -------      ------  
Alias             cd -> Set-Location
```


## Files in PowerShell

In this section, we will learn how to:

-   Read a file using the `Get-Content`.
-   Create a new file using the `Set-Content` command.

### Reading from a file

Similar to the `cat` command in Linux, we can use the `Get-Content` cmdlet in PowerShell to read the contents of a file. When `Get-Content` is run, the contents of the file are read and the result can be stored in a variable for later use or displayed on the screen.

For example, we can use the command `Get-Content /PS/Names.txt` to read the file `Names` which is saved on a local `C Drive` in a folder named `PS`.

```
PS C:\> Get-Content /PS/Names.txtLiam JohnsonOlivia PopeNoah ClarkEmma MichaelsonOliver WashingtonAva MillerElijah WilliamsCharlotte SmithMohammed WhiteJaris Rodriguez
```

> **Note:** By adding the `-TotalCount` argument, we can specify how many lines we would like PowerShell to read from the top.

```
 Get-Content <PATH> -TotalCount 5
```

Adding `-TotalCount 5` shows the top five items in the `names.txt` file.

```
PS C:\> Get-Content -TotalCount 5 /PS/Names.txtLiam JohnsonOlivia PopeNoah ClarkEmma MichaelsonOliver Washington
```

The `-Tail` argument will do the same but read from the bottom of the file.


### Writing content to a file

In addition to reading files, it is possible to write data to files, either by using the `Set-Content` command to create and overwrite files or the `Add-Content` command to append content to an existing file.

```
PS C:\> Set-Content - Value "Rachel Rose" -Path /PS/Names.txtPS C:\> Get-Content /PS/Names.txtRachel RosePS C:\>
```


## Commands to manipulate files

### `Convert-To`

Structured data types can be converted into different formats using PowerShell cmdlets; for example, from `.txt` to [`.csv`](https://www.codecademy.com/resources/docs/general/csv). Some common ConvertTo commands in PowerShell are:

-   `ConvertTo-Csv`
-   `ConvertTo-Html`
-   `ConvertTo-Json`
-   `ConvertTo-Xml`

Here are some [additional Reading on Convert commands](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertto-csv?view=powershell-7.2)

### `Convert-From`

Alternatively, the `Convert-From` command creates objects from different formats using variable-length strings that are generated by the `ConvertTo` cmdlets. Some common `Convert-From` commands in PowerShell are:

-   `ConvertFrom-Csv`
-   `ConvertFrom-Json`
-   `ConvertFrom-Markdown`
-   `ConvertFrom-StringData

For example, the `ConvertTo-Json` cmdlet allows you to convert an object into a JSON-formatted string. The properties are converted to field names, the field values are converted to property values, and the methods are removed.

```
PS C:\Users> Get-Date Thursday, December 30, 2021, 8:16:10 AM PS C:\Users> Get-Date | ConverTo-Json{    "value": "\/Date(1640870187485)\/",    "DisplayHint": 2,    "DateTime": "Thursday, December 30, 2021, 8:16:27 AM"}PS C:\Users> Get-Date | ConverTo-Json | ConvertFrom-Json value                             DisplayHint DateTime-----                             ----------- --------12/30/2021 1:16:41 PM                       2 Thursday, December 30, 2021, 8:16:41 AM
```


### Creating files and folders

We create items in PowerShell using the `New-Item` command.

**Example:** This command creates the new folder `C:\temp\Test Folder`

```
New-Item -Path 'C:\temp\Test Folder' -ItemType Directory
```

**Example:** This command creates the new empty file **C:\temp\New Folder\file.txt**

```
New-Item -Path 'C:\temp\Test Folder\file.txt' -ItemType File
```

Create a folder in the current folder:

``` PowerShell
New-Item -Name "PowerShell_lab" -ItemType "directory"
```

View the content in our current folder:

``` powershell
Get-ChildItem
```

**Example:** move all the files that contain **Lab** into the folder **PowerShell_Lab**

``` powershell
Move-Item Lab*.* -Destination ./PowerShell_Lab/
```

**Example:** set our current directory _location_ to the **PowerShell_Lab** folder

``` powershell
Set-Location ./PowerShell_Lab
```


## Commands to import and remove modules in PowerShell

In this section, you will learn how to use PowerShell Modules. Modules provide the capability to group like functions together. There are a number of built-in modules and additional modules can be installed or will appear on top of other modules.

In PowerShell, a module is considered a package that contains various functions, workflows, and variables that can operate as a small program.

For additional information, check out the [Microsoft Documentation on modules](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_modules?view=powershell-7.2&viewFallbackFrom=powershell-6).


### PowerShell Gallery

The PowerShell Gallery is a repository for sharing useful PowerShell scripts and modules, some items are created by Microsoft and some are created by the PowerShell community.

[Browse the PowerShell Gallery for modules you’ll want to install here](https://www.powershellgallery.com/).


### Viewing modules

Using the `Get-Module` cmdlet will list currently loaded modules on a computer. Using the `-ListAvailable` option with this command will also allow you to view all modules that are available for use but not yet imported on the computer.

The `-ListAvailable` option can also be used when a specific module has been provided to list all the available functions for that module.


### Importing modules

Modules need to be imported to your local PowerShell session before the cmdlets and functions from that module can be used. Modules can be loaded into the current PowerShell session by using the `Import-Module` cmdlet and specifying the module either by name `(-Name)` or by path `(-Path)`.

**Example**: If you needed to import the PKI PowerShell module, which is used in digital certificates to protect sensitive public key infrastructure data, you would use this comment:

```
Import-Module -Name PKI
```


### Installing modules

If a module is not listed as available, then the module can be installed from a repository, such as the [PowerShell Gallery](https://www.powershellgallery.com/), or from another repository using the `-InstallModule` cmdlet.


### Removing modules

When you need to remove a module, the commands that the module added are deleted from the session. This is useful when creating your own modules as you may need to remove and re-import a module when you make changes to it.

**Example**: We would remove the PKI module using the command:

```
Remove-Module -Name PKI
```


## Commands for daily security tasks

In this section, you will learn some of the most common PowerShell security commands that are used by every Cybersecurity professional today. You should be familiar with these common commands used for troubleshooting well-known [cyberattacks](https://www.codecademy.com/resources/docs/cybersecurity/cyber-attack) in the industry today.


### `Get-ExecutionPolicy` and `Set-ExecutionPolicy`

You can create and execute PowerShell scripts, however, Microsoft has disabled scripting by default in an effort to prevent malicious code from executing in a PowerShell environment. You can use the `Get-ExecutionPolicy` to check which execution policy is enforced prior to running a script and then use the `Set-ExecutionPolicy` command to change the level of security if needed.

There are four levels of security associated with the `Set-ExecutionPolicy` command:

-   **Unrestricted**: This removes all restrictions from the execution policy.
-   **Restricted**: This is the default execution policy and only allows commands to be entered interactively. PowerShell scripts are not allowed to run.
-   **All Signed**: If the execution policy is set to `All Signed`, scripts will be allowed to run if they are signed by a trusted publisher.
-   **Remote Signed**: If the execution policy is set to `Remote Signed`, PowerShell scripts that have been created locally will be allowed to run. Scripts created remotely will be allowed to run if they are signed by a trusted publisher.


### `Get-Service`

This command provides a list of every service that is currently installed on your system.

If you suspect a particular service is worth checking out for security reasons, we can append the `–Name` argument, and this will allow you to see the state of the service on the machine.

```
PS C:\Users\U1D256> Get-Service Status  Name            Display Name------  ----            ------------Running BFE             Base Filtering SystemStopped BITS            Background Intelligent Transfer Ser...Running camsvc          Capability Access Manager Service...
```


### `Get-Process`

Unlike the `Get-Service` command in PowerShell, which displays a list of the different system services, the `Get-Process` command can display a list of every process the system currently runs. This command can also be used to query processes running on a remote machine or [server](https://www.codecademy.com/resources/docs/general/server).

```
PS C:\Users\U1D256> Get-Process Handles  NPM(K)   PM(K)    WS(K)    CPU(s)     Id SI ProcessName-------  ------   -----    -----    ------     -- -- -----------   3071     138  359840   354688            25248  0 A180AG   1001      52  52820     65824  1,557.13   8732  1 A180RS...
```


### `Stop-Process`

This is the complementary command to `Get-Process`. If you suspect that a malicious or unwanted process is running on your local machine or remote server, running `Stop-Process -Name` or `Stop-Process -Id` will terminate the running process.

For example, if you wanted to find the owner of a running process on a machine, try this script:

```
PS C:\Users\U1D256> Get-Process pwsh -IncludeUserName Handles      WS(K)   CPU(s)     Id UserName            ProcessName-------      -----   ------     -- --------            -----------    782     132080     2.08   2188 DOMAIN01\user01     pwsh
```


### `Get-EventLog`

Being able to read logs from the local machine is important. Event logs are an important part of fault diagnosis or incident response.

PowerShell can be used to parse your computer’s event logs using the `Get-EventLog` command. By default, it will query the local machine; however, it can also be used to query logs from remote connections.

For additional reading, check out the [Microsoft document on Get-EventLog](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-eventlog?view=powershell-5.1).


### `Get-ADUser`

The **Get-ADUser** cmdlet gets a specified user object or performs a search to get multiple user objects. This cmdlet retrieves a default set of user object properties. To retrieve additional properties use the `-Properties` parameter.

Security teams such as Identity Access Management Teams and Identity Governance Teams heavily leverage this command.

**Example**: This command gets all of the properties of the user with the SAM account name Nicole Scott.

```
PS C:\Users\U1D256>Get-ADUser -Identity NicoleScott -Properties * Surname           : ScottName              : Nicole ScottUserPrincipalName :GivenName         : NicoleEnabled           : FalseSamAccountName    : NicoleScottObjectClass       : userSID               : S-1-5-21-2889043008-4136710315-2444824263-3544ObjectGUID        : e1418d64-096c-4cb0-b903-ebb66562d99dDistinguishedName : CN=Nicole Scott,OU=NorthAmerica,OU=Sales,OU=UserAccounts,DC=FABRIKAM,DC=COM
```


### DNS lookups

[DNS](https://www.codecademy.com/resources/docs/general/dns) attacks remain one of the top attacks that Cybersecurity professionals will have to troubleshoot today. The DNS service is a well known attack vector for hackers today.

We can look up the DNS entry for a host using the command:

```
Resolve-DnsName -Name "Hostname"
```

By appending the `-server` switch, followed by a DNS server’s IP address, we can perform a DNS resolve request against a specific server to verify resolution is working properly.

The `Get-DnsClient` cmdlet lets you check the DNS client information for a device. It indicates what DNS servers are being used by the device to perform address resolutions as configured on multiple adapters.

The `Set-DnsClientServerAddress` cmdlet allows for specified DNS servers to be added to the network configuration.

Here are some [additional DNS PowerShell Commands](https://docs.microsoft.com/en-us/powershell/module/dnsserver/?view=windowsserver2022-ps)


### Ping devices locally or remotely

The `Test-NetConnection` cmdlet allows us to test network connectivity on the LAN and WAN.

For example, the command `Test-NetConnection -ComputerName "Hostname or IP"` performs a ping which determines if network connectivity between the local device and the target computer or domain exists.

This is a useful command for a security professional executing a DDoS attack.


### `Get-NetIPConfiguration`

The `Get-NetIPConfiguration` cmdlet gets network configurations, including usable interfaces, IP addresses, and DNS servers. This is helpful for any cybersecurity professional who needs to troubleshoot and identify any rogue IP addresses on the network.


### Testing network connection

The `Test-NetConnection` cmdlet shows diagnostic information for a connection. It supports ping tests, TCP tests, route tracing, and route selection diagnostics. Depending on the parameters, the output can include the DNS lookup results, a list of IP interfaces, IPsec rules, route/source address selection results, and/or confirmation of connection establishment.

Port security attacks are very prevalent today. If we want to verify if a port is open on our machine or server we could run this command:

```
Test-NetConnection -ComputerName 127.0.0.1 -Port 4000
```


## Remote PowerShell commands

Windows PowerShell remoting lets you run any Windows PowerShell command on one or more remote computers. You can establish persistent connections, start interactive sessions, and run scripts on remote computers. The remote computer must be configured for remote management.

Read more about remove PowerShell commands [here](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_remote_requirements?view=powershell-7.2).


### Start a session

To start an interactive session with a single remote computer, use the Enter-PSSession cmdlet. For example, to start an interactive session with the Server01 remote computer, use the following command:

```
Enter-PSSession Server01
```

To end the interactive session, use the following command:

```
Exit-PSSession
```


### Run a script

To run a script on remote computers, use the `-FilePath` parameter from the `Invoke-Command` cmdlet. The script must be accessible by your local computer. The results are returned to your local computer.

**Example**: The following command runs the `GetActiveAccounts.ps1` script on the remote computers, Server11, and Server12.

```
Invoke-Command -ComputerName Server11, Server12 -FilePath c:\Scripts\GetActiveAccounts.ps1
```


## Conclusion

In this article, we reviewed some of the most important PowerShell commands and applicable use cases. Creating PowerShell scripts and running commands are a powerful way to automate daily security analyst tasks. You should continue to research and practice working with PowerShell to improve your skillset.



# Scripting Challenges

## Basic Command Line Interfaces

Create a folder in the current folder:

``` PowerShell
New-Item -Name "PowerShell_lab" -ItemType "directory"
```

View the content in our current folder:

``` powershell
Get-ChildItem
```

**Example:** move all the files that contain **Lab** into the folder **PowerShell_Lab**

``` powershell
Move-Item Lab*.* -Destination ./PowerShell_Lab/
```

**Example:** set our current directory _location_ to the **PowerShell_Lab** folder

``` powershell
Set-Location ./PowerShell_Lab
```


## Read and Write to Files in PowerShell

In this section, we will be practicing Basic PowerShell Command Line Interface techniques for reading and writing files.

_Our manager had tasked us to review and update a file, **MarketGroup.txt**, that contains a group of users in CyberAcademy’s marketing department. Let us go ahead and complete that task._







# Knowledge Review for Cybersecurity Analysts: Tools, Threat Intelligence, & Learning


Review important communication, key definitions, networking, and operating system topics you need as a Cybersecurity professional.

## Goals of this Unit

The goal of this unit is to review Red and Blue team tools, threat intelligence topics, as well as how important constantly learning is to the Cybersecurity mindset.

After this unit, you will be able to:

-   List different tools used by Red and Blue teams
-   Explain different threat intelligence topics
-   Add constantly learning to your Cybersecurity mindset

![An image showing two different scenarios. In one, the person is saying "A cyber vulnerability!? I better investigate this further before it gets worse.". In the other scenario, the person is saying "A cyber vulnerability!? Shucks! How do I even solve this? This seems too hard."](https://static-assets.codecademy.com/Paths/cybersecurity-analyst-career-path/cybersecurity-analyst-interview-prep/general-knowledge/growth-mindset/Two%20scenario%20Jess.svg)

Learning is social. Whatever you’re working on, be sure to connect with the Codecademy community in the [forums](https://discuss.codecademy.com/). Remember to check in with the community regularly to help to reinforce what you’ve learned.


## THREAT ACTORS

## Introduction

Generally speaking, hackers are categorized into *ethical (white-hat)*, *malicious (black-hat)*, and *semi-ethical (gray-hat)* depending on the actions they take.

## Human Error

One of the most common threat actors isn’t some shadowy hacker group, but the potential to make mistakes that lies in every one of us! Even though these mistakes aren’t intentionally malicious, they still represent an (abstract) threat actor that should be considered when designing systems. Human error doesn’t have any specific targets or objectives - it can strike anytime and anywhere that humans are involved, “attacking” through unpredictable means and with unpredictable results.

Protecting against **human error** means designing processes and systems in ways where it is impossible (or at least _very_ difficult) for mistakes to have a serious impact. We see this in Murphy’s Law: if it’s possible to do something incorrectly, someone _will_ do it incorrectly. Human error has caused data breaches, civil engineering disasters, airplane crashes, industrial accidents, and much, much more.

Human error can be both external and internal and includes any action that can be done by a human. Human error has whatever access has been granted to the human making the error, but very little sophistication. For example, multi-step mistakes are less likely than very simple errors. Human error has no specific targets, as well as no “negative” motivation, as the humans making the errors are often trying NOT to make errors!

![[Pasted image 20230425113726.png]]

## Script Kiddies

**Script Kiddies** is a term that refers to inexperienced hackers who lack experience, as well as have a low understanding of hacking and the tools used to do it. They make use of already existing hacking tools and scripts, without understanding the underlying vulnerabilities that are being exploited. The word “kiddie”, usually used to refer to a small child, is instead used to represent their lack of sophistication.

Script kiddies are usually opportunistic in their targeting, and often hack just for the sake of hacking, rather than achieving some premeditated objective. However, this lack of planning or high-level motivation doesn’t mean script kiddies are harmless!

Modern hacking tools are easy to acquire, configure, and use, and _the vast majority of vulnerabilities that get exploited in real-world scenarios are known vulnerabilities for which exploits have been developed and distributed_.

Script kiddies are almost always external threats, with low sophistication and resources. They often have minimal or no funding, and only freely available resources. Their goals can vary, but they usually operate opportunistically and don’t have a great deal of motivation. Once a script kiddie has been stopped by security measures, they’re likely to move on to an easier target.

![[Pasted image 20230425113842.png]]

## Insider Threats

**Insider threats** are threat actors operating _within_ an organization. Insider threats are usually employees but contractors or ex-employees can be considered insider threats too.

Insider threats can have a variety of goals, such as financial gain, personal grievances, or gaining some sort of advantage over others. Insider threats can operate opportunistically or deliberately, sometimes working with other threat actors to give them access they would not have otherwise had.

_Insider threats usually have elevated access and increased knowledge when compared to external threat actors_. This can make them more difficult to detect, and it can give them more options for how to attack the organization. Insider threats can have a _wide_ range of sophistication - A disgruntled cashier, for example, will probably not be as sophisticated a threat as a disgruntled security analyst.

Insider threats are one reason why it’s so important to follow the principle of least privilege! _Limiting the access insiders have means that a malicious insider will have fewer options available to them, and can do less damage._

One specific type of insider threat is that of Shadow IT. **Shadow IT** refers to assets that are part of an organization’s network, but aren’t set up or managed by IT AND that IT and Security are not aware of. This can be dangerous since unknown assets on an organization’s network can create attack vectors that the organization is not aware of until it’s too late.

![[Pasted image 20230425113936.png]]

## Hacker Groups

Before we move on to “scarier” threat actors, we need to discuss the generic concept of a “hacker group”. **Hacker groups** are, as the name suggests, groups of hackers. This is a very broad term, and it can refer to everything from a group of friends who like tinkering with game consoles to state-sponsored threat groups.

Many of the types of threat actors we will soon discuss also operate as groups, but there are plenty of groups that don’t fit cleanly into any one category. These “leftover” groups can have a staggering variety of sophistication, resources, goals, and motivations, without necessarily having a clearly defined set of tactics.

One hacker group might be for people interested in hacking Bluetooth devices, for example, while another group might be loosely-knit groups of individuals, all with their own style, who like to show off their work to each other.

Some groups might operate opportunistically, while others might focus on a specific target with a long-term objective in mind, though these objectives aren’t always “reasonable”. There has been at least one documented case of a hacker group compromising a game developer because… well, they just wanted to play an early version of an upcoming game.

![[Pasted image 20230425114004.png]]

## Hacktivists

**Hacktivists** are hackers with an ideology, who strongly believe in a cause and are willing to break the law to further that cause.

Hacktivists are defined by their strong motivation; this motivation means that they can be _very difficult to dissuade from a target_. If one method doesn’t work, they will just try different approaches until something works.

Hacktivists can have a wide variety of objectives that they aim to achieve via hacking. Defacement, denial of service, and leaking confidential information are all common actions taken by hacktivists.

Hacktivists are usually external threats, and they can have a range of sophistication and resources. Their goals are usually in service to whatever cause they are rallying behind. The most dangerous aspect of hacktivist groups is their motivation. Many of these groups have goals that seem noble on paper. For example, revealing corruption or freeing someone being held against their will by an ethically dubious hospital, and it can be easy to see why these hackers would feel strongly enough to take matters into their own hands.

![[Pasted image 20230425114018.png]]


## Competitors

Corporate espionage has existed since at least the 1700s, and the digital era has made it easier than ever for unscrupulous organizations to steal trade secrets or sabotage rivals in order to gain an unfair advantage. **Competitors** have been trying to steal secrets from others for centuries.

Corporate espionage is usually illegal, so organizations that engage or attempt to engage in it will likely focus on secrecy and deniability. This means that the tactics they use will probably be more sophisticated than usual, in an attempt to evade detection and attribution. Additionally, corporations often have large pools of resources (financial, personnel, etc) that can be leveraged by attackers on their behalf.

Most suspected cases of corporate espionage revolve around the theft (or attempted theft) of trade secrets - rival corporations probably don’t have a good reason to steal a password database, for example. The threat actor’s motivation is likely higher than average, as they will be focusing on competitors, but they may be unwilling to overextend and leave themselves vulnerable to detection.

Corporate espionage is primarily external but may incorporate internal elements in the form of rogue employees, or agents working for the threat actor.

![[Pasted image 20230425114031.png]]

## Organized Cybercrime

**Organized cybercrime** generally has a single overarching goal: Money. Financial fraud, data theft, extortion, trafficking, and so much more. If you can think of an underhanded way to make money with computers, there’s probably a group of cybercriminals doing it.

These cybercriminals usually represent an external threat, with a wide range of sophistication. Some groups might be relatively inexperienced, while others might be experienced hackers. Likewise, the resources these groups have access to can vary, but they are likely to be higher than what a single person could muster.

Cybercrime can be both opportunistic and targeted - If there’s a way for them to make money, they’ll probably start taking advantage of it sooner or later. Here’s a brief list of some things one group, named REvil, did in 2020 and 2021:

-   Stole A terabyte of data from a law firm, then attempted to extort, among others, Madonna and Lady Gaga.
-   Attacked a trust that ran schools in the UK, and held stolen data for ransom, along with student’s coursework.
-   Stole plans for upcoming Apple products and tried to hold them for ransom.
-   Attacked a meatpacking company with ransomware, extorting 11 million dollars in bitcoin.
-   Targeted an energy company with ransomware.
-   Stole documents from a Florida-based military contractor.

![[Pasted image 20230425114043.png]]

## Cyber Terrorists

**Cyber terrorists** seek to use hacking to cause large-scale destruction and harm. In some ways, they can be thought of as extremist hacktivists, who seek to use intimidation and destruction to further their cause.

While cyber terrorists are unlikely to be working alone, they may lack easy access to resources. That being said, world governments have a history of covertly funding terrorist groups so there’s no reason to suspect that the same couldn’t be true for cyber terrorists.

Cyber terrorists are likely to target systems that would cause significant damage or loss of life if compromised: Digital or physical infrastructure such as backbone routers, power plants, water treatment plants, hospitals, etc.

![[Pasted image 20230425114054.png]]

## State Actors

**State actors** are some of the most dangerous types of threat actors. They are often highly sophisticated and work with the support of other governmental organizations. They have large quantities of resources provided to them by their government, allowing them to employ skilled hackers, not only to conduct attacks, but to search for vulnerabilities to develop into cyberweapons.

State actors are also highly motivated, working on behalf of a nation-state. If they decide to target an individual or organization, they have a specific objective in mind and will work very hard to complete that objective while remaining undetected, even in the face of adversity. Failure or detection might cause them to retreat, but likely won’t dissuade them from their objective.

State actors’ motivations are based on what benefits the state they work for. They may attempt to spy on foreign nations, conduct cyber warfare, defend their nation against other threat actors, spy on journalists, or whatever else the state commands of them.

State actors are a quintessential example of an **Advanced Persistent Threat (APT)**: they have advanced capabilities and access to resources and are difficult to dissuade from their objective.

![[Pasted image 20230425114105.png]]

## Review

In this lesson you’ve learned about different types of threat actors:

-   Individual Hackers
-   Human Error
-   Script Kiddies
-   Insider Threats
-   Hacker Groups
-   Hacktivists
-   Competitors
-   Organized Cybercrime
-   Cyber Terrorists

Each of these threat actors has unique Tactics, Techniques, and Procedures (TTPs) and attributes. Understanding these actors, and their motivations, will help you prevent attacks on and secure your systems.

![[Pasted image 20230425114118.png]]


# Cyber Attacks

In this article, we’ll review common and dangerous cyber attacks.

## What We’ll Be Learning

Imagine we are in an interview for our first Cybersecurity job. During the interview, the interviewer asks, “You must have done research about our company, what we do, what we produce, and what kind of threats we face every day. Based on your research, can you tell the most dangerous attacks our company could face?”

To answer a question like this, it’s helpful to know what common attacks are.

Before we review the most dangerous attacks, we will review some of the most common cyber attacks:

-   Application Attacks
-   Network Attacks
-   Malware Attacks
-   Overflow Attacks
-   Password Attacks
-   Social Engineering Attacks

Next, we will discuss the most dangerous cyber attacks. These cyber attacks include:

-   Improper session handling
-   Ransomware exfiltration and extortion
-   Supply chain attacks
-   Adversarial machine learning attacks

## Most common cyber attacks

First, we must answer the question: what are cyber attacks?

**Cyber attacks** can be defined as when threat actors use special techniques to exploit vulnerabilities in applications, processes, or procedures.

### Web Application Attacks

In Web Application Attacks, the adversaries exploit vulnerabilities of the services running on the web server infrastructure. The infrastructure could include web apps, database servers, etc. These elements could be both on the internet or inside the company’s networks (intranet).

The attackers can use the following techniques to exploit web services:

#### Cross-Site Scripting

Cross-Site Scripting (XSS) is an attack where an attacker injects malicious code on a website that delivers the script to the victim’s browser.

![An image showing that in Stored XSS an attacker creates a comment with code, the web server saves the comment, the user requests to see the comments, then the server sends the comment to the victim's browser, where the code is executed.](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/xss/Cybersecurity_XSS_Stored_v2-03.svg)

#### Injection Attacks

In a SQL Injection Attack, the attackers input SQL commands into a webpage to retrieve sensitive data from the database. If user input is properly validated and sanitized, SQL injection attacks shouldn’t work.

![An XKCD comic in which a mother named her son "Robert'); DROP TABLE Students;--" which caused the school database to drop the whole "Students" table.](https://imgs.xkcd.com/comics/exploits_of_a_mom.png)

> [xkcd](https://xkcd.com/327/) comic “Exploits of a Mom”

In an XML Injection attack, the attackers manipulate a NoSQL database using XML instead of SQL commands.

### Network Attacks

In Network Attacks, the adversaries exploit vulnerabilities of applications or devices (firewalls, routers, and switches) in the intranet to ultimately gain access to internal systems.

Some examples of network attack techniques are:

-   **Man-in-the-Middle (MitM)**/**on-path**/**eavesdropping attacks**: the attackers intercept communication between the client and server applications and impersonate one of them to read or tamper with the information.
    
-   **DNS Attacks**: as DNS traffic is rarely blocked, the attackers utilize the DNS protocol to exfiltrate data from an internal system.
    
-   **DoS Attacks**: the attacker floods networks or systems with traffic to exhaust all its resources or bandwidth, resulting in the devices’ inability to process legitimate requests.
    

![An image showing a computer looking tired and overwhelmed as lots of bugs swarm it. The bugs represent requests to the computer.](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/zero-day-ddos/Cybersecurity_DDoS_v2-09.svg)

### Malware Attacks

Malware is malicious software designed for compromising systems or devices in the network.

There are many types of Malware, and some particularly dangerous types are:

-   **Ransomware** denies access to business data by encrypting them. We will discuss more ransomware attacks later in this article.
-   **Backdoor**s establish persistence so the attackers can covertly maneuver between systems.
-   **Spyware** covertly collects information and transmits the data to remote locations of choice by the attacker.
-   A **logic bomb**, as the name suggests, waits for a specific logical event to happen before executing its intended purpose.
-   A **rootkit** operates in the lower level of the operating systems to evade antivirus.

![An image showing someone working on their computer. There is a black opening in their laptop representing a "backdoor". A hacker is connected to the backdoor by wires coming from their fingertips.](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/malware/Cybersecurity_Rootkit_1-08.svg)

### Password Attacks

In Password Attacks, the attackers often attempt to access systems with compromised passwords.

Password Attacks could be:

-   In password **brute-forcing attacks**, the attackers use **password spraying** techniques to use one password against many usernames. This technique favors the attacker by avoiding account lockouts.
-   In **credential harvesting**, the attackers use a collection of stolen usernames and passwords to access the target systems.

### Buffer Overflow Attacks

In Buffer Overflow Attacks, an attacker feeds well-crafted input into a program’s fixed-length storage buffer causing malicious code, including the intended “return address,” to be written and executed from the adjacent memory locations.

Buffer overflows could be overflowing the stack (stores local variables) or heap (handles dynamic allocation of memory ) area of the memory.

![An image showing a buffer overflow. There are two arrays of random 2-digit hexadecimal values, and the first four indexes are labeled “buffer”. In the second array, the second half of the array is labeled with "overflow", and it's clear someone has filled the second half of the array with strange data: the word “dead beef” is repeated twice.](https://static-assets.codecademy.com/Paths/cybersecurity-analyst-career-path/fundamentals-of-cybersecurity/application-attacks/buffer_overflow.svg)

### Social Engineering Attacks

An attacker uses social skills to compromise information about the organization or its assets in social engineering attacks.

Types of social engineering attacks could include:

-   **Phishing** attack, where the attackers send an email that appears to be from a reputable source, often soliciting personal information
-   In a **vishing** attack, the attackers use voice communication, most often spoofing the caller identity of the Voice over Internet Protocol (VoIP) phone services.
-   A **smishing** attack uses SMS or text messages to send malicious links to the victims.

## Most dangerous new attacks

### Session hijacking/Improper handling

Session hijacking or improper handling occurs when the session token used to facilitate a stateful transaction is unintentionally shared with the attackers. The attackers with access to the session tokens from a privileged user can issue administrative actions that could be very dangerous. The scope of cyberspace has increased significantly due to the range of applications in use to support remote work. As these applications are not originally designed to be used in remote environments, the adversaries can easily grab tokens from unclosed sessions in the remote worker’s environment and impersonate them to conduct fraud or information theft.

### Double extortion ransomware attacks

Traditionally, a ransomware attack is a denial-of-service attack where the attackers encrypt critical data and demand a ransom to end the attack. But in the new ransomware attacks, the adversary first exfiltrates the important data and then threatens to leak the sensitive data publicly if the victim denies paying the ransom. This type of ransomware attack is called double extortion ransomware attack. [The cyber attack on Colonial Pipeline](https://www.reuters.com/business/energy/us-govt-top-fuel-supplier-work-secure-pipelines-closure-enters-4th-day-2021-05-10/) ransomware attack is an example of this kind of attack.

### Adversarial machine Learning attacks

As vendors are heavily using machine learning capabilities to detect and classify good vs. bad data, the attackers are using Adversarial Machine Learning (AML) attacks to evade these capabilities. Researchers train the ML models with malware samples that possibly come from adversaries. The attackers can easily poison these training datasets so the malicious programs can evade detection. Additionally, the adversary can reverse engineer the ML capability by sending malware to analyze how the model classifies this malware. Then the attacker can craft malicious instances that the ML product can not recognize and classify as safe to pass through. More about AML attacks can be found in [Machine Learning Security: Threats, Countermeasures, and Evaluations](https://ieeexplore.ieee.org/document/9064510).

### Software supply chain attacks

In software supply chain attacks, adversaries seek to compromise a vendor’s network and inject malicious code into the software. The customer also gets compromised when they download the software with malicious code. SolarWinds is an attack that compromised hundreds of companies and government agencies.

### IoT devices in cyber attacks

Due to various resource constraints, traditional security measures can not be implemented in IoT devices. As a result, IoT devices are often the prime target to be used in cyber attacks. For example, in the Mirai botnet attack, they were used as bots to conduct Distributed DoS attacks.

## Conclusion

In this article, we have learned about the most common and most dangerous cyber attacks.



# Red Team Tools

Let’s explore offensive tools used by red teams.

## What we’ll be learning

Let’s go, red team! Let’s go! _Clap clap clap clap clap_… No, when discussing red teams in [cybersecurity](https://www.codecademy.com/resources/docs/cybersecurity), the image should not be a team of players sporting red jerseys running up and down a field with a ball. Though, you may see some cheering!

In cybersecurity, **red teams** are essential in challenging the security posture of an organization. Defenses are tested against traditional and latest exploitation tactics to assess the defenses of an organization. Its good practice to be familiar with the red teams’ role in cybersecurity assessments, as well as learn about the tools and techniques they may employ.

In this article, you will learn the following:

-   The purpose of a red team.
-   The 7-step hacking process.
-   Common red team tools and techniques.

> **Note**: The tools and topics discussed in this article are solely for educational purposes in preparation for a cybersecurity role. Though the article does not go into detail about [cyberattack](https://www.codecademy.com/resources/docs/cybersecurity/cyber-attack) methods with the mentioned tools, it should be addressed that these tools may be used for malicious and illegal purposes. This article does not condone the use of any of these tools except for legal purposes with the consent of the owner of the systems and networks these tools are utilized on.

## What is a red team?

In the world of cybersecurity, it is common practice to _challenge_ the security posture of an organization’s networks. A team of authorized cybersecurity professionals skilled in [penetration testing](https://www.codecademy.com/article/pen-testing) and other offensive tactics is hired to test the security implemented by the organization by emulating adversarial attacks. This team engages in offense operations while another team, typically internal to the organization, defends the organization from the emulated attacks. The team on defense is referred to as a [blue team](https://www.codecademy.com/article/blue-team-tools), while the team on offense is labeled the red team.

Red teams engage the organization’s defenses by performing common intrusion and ethical [hacking](https://www.codecademy.com/resources/docs/cybersecurity/hacking) tactics. They will follow a process known as “the hacking process”:

1.  **Footprinting**: Passive information gathering of targets before active attack activities. Also known as the “Reconnaissance” phase.
2.  **Scanning**: Initial active/passive scanning techniques to gather technical information on target systems.
3.  **Enumeration**: The consolidation and gathering of more detailed information on target systems and networks. At this step, the attackers may build a network or logical maps of the target systems.
4.  **System hacking**: The planning and execution of attacks are conducted based on the information gathered in the previous steps.
5.  **Escalation of privilege**: Once penetration is successful, the attackers will work to gain escalated privilege in the systems/networks of the organization. The attackers may pivot to other systems and repeat preceding steps as needed to further compromise systems on the network.
6.  **Planting backdoors**: Leaving an entry point to a compromised system for easy access in further attack activities.
7.  **Covering tracks**: The act of removing/destroying signs of intrusion and activities performed on a system.

For each of these steps in the process, red teams may use different tools and techniques to compromise an organization’s networks and/or computer systems.

## Enterprise vs. personal security tactics

The tools and techniques of red teams may be used to assess the security of large complex organizations or to test the security of your personal laptop and smartphone. It’s much easier to compromise a personal computer asset versus compromising a large network. Therefore, it’s important to learn how adversaries compromise single assets before fully understanding how they may compromise an entire network.

The divide between the enterprise defense mindset compared to personal defense isn’t very different. Many of the same types of tools used to secure or attack large networks will be used on a single personal device. Unlike defense tools, the versions used to attack personal devices are mostly the same versions used to attack enterprise devices. In fact, offense software is becoming easier and easier to use, but traditionally offensive tactics require advanced skills necessary to successfully compromise systems without detection. Red team professionals have the skills necessary to attack single and enterprise devices without detection.

## Common red team tools & software

### Footprinting tools

**Footprinting** is mostly passive. This means that the information gathered by attackers is done without direct interaction with the target organization or any of its technology. Just like public real-estate records and other public information, some information about an organization’s IT and security posture may be gathered through publicly available sources. In the footprinting phase, a few tools used to gather target information are:

#### Google and other search engines

Have you ever googled yourself? Search engine crawlers are very good at indexing any web-accessible sites. This may include public-facing resources of an organization such as login portals or unsecured intranet pages. Other types of information that may reveal target details are things like: job postings, discussion groups, social media posts, or company news releases which are all easily found through a search engine.

#### DNS queries and zone transfers

[Domain Name System (DNS)](https://www.codecademy.com/resources/docs/general/dns) [servers](https://www.codecademy.com/resources/docs/general/server) perform zone transfers to keep records up-to-date. The information in a zone transfer contains a plethora of domain-specific information. This information may be host records (hostnames), service type information, other name server information, etc.

#### WHOIS queries

Web domains must be registered when purchased. The registration contains information such as registrar contact, name servers, and ownership details. Attackers can use this information to conduct social engineering.

#### Social engineering

A more active type of information gathering, social engineering is the act of exploiting humans for information or access to a target system.

### Example of scanning tools

Scanning may be done to identify available entry ports or services, or they may reveal vulnerabilities present on a system or application. Scanning may be done passively or actively. Passive scanning is preferred when scanning activities need to go undetected.

-   **[Nmap](https://nmap.org/)**: The most utilized scanning tool. Nmap offers passive and active network scanning capabilities that reveal network information such as: open/closed ports, IP and MAC addresses, OS details, signs of network filtering, and more.
-   **[Angry IP Scanner](https://angryip.org/)**: Another tool used to scan for IP and port information.
-   **[Sboxr](https://sboxr.com/)**: An open-source web vulnerability tool that effectively identifies any gaps in the security of websites and web apps.
-   **[Kismet](https://www.kismetwireless.net/)**: A wireless scanner. Scans and sniffs wireless traffic.
-   **[Tenable Nessus](https://www.tenable.com/products/nessus)**: Vulnerability scanner that may passively or actively scan systems for open vulnerabilities. Used to identify gaps in security.

### Example of enumeration tools

-   **[Maltego](https://www.maltego.com/)**: A digital forensics tool that offers many enumeration features. May be used for DNS and network enumeration.
-   **[Superscan](https://sectools.org/tool/superscan/)**: A GUI-based tool used to enumerate Windows machines. Targets NetBIOS protocol and other proprietary protocols.

### Example of system hacking tools

Once the target network’s available services, ports, network addresses, OS detail, and vulnerabilities are identified, an attacker will move to the hacking phase of the process. The system hacking phase may leverage the same tools and techniques later used for privilege escalation, such as the following:

-   **[Hashcat](https://hashcat.net/hashcat/)**: A robust password cracking tool. Offers other hash cracking features such as identifying the data captured in a captured hash value.
-   **[IKECrack](http://ikecrack.sourceforge.net/)**: Another cracking tool that is very efficient in cryptography tasks during hacking a system. Open-source and highly used.
-   **[Aircrack-ng](https://www.aircrack-ng.org/)**: A suite of tools used to assess (and attack) wireless network security.
-   **[Aireplay-ng](https://www.aircrack-ng.org/doku.php?id=aireplay-ng)**: Part of the Aircrack-ng suite used for manually injecting and replaying wireless frames.
-   **[Airmon-ng](https://www.aircrack-ng.org/doku.php?id=airmon-ng)**: Another Aircrack-ng tool used for disabling and enabling wireless interface monitoring capabilities.
-   **[hping3](https://www.kali.org/tools/hping3/)**: A packet crafting tool that allows an attacker to make packets targeting port services.
-   **[Metasploit](https://www.metasploit.com/)**: An all-in-one penetration testing framework that assesses and aids in the exploitation of vulnerabilities of a system.
-   **[Cain and Abel](https://sectools.org/tool/cain/)**: One of the most utilized passwords cracking exploitation tools for penetration testers and hackers.

### Planting backdoors

Backdoors are entry points left behind by attackers for re-access to compromised systems. Backdoors must remain hidden from detection, therefore different techniques and tools such as the following are used to assist in maintaining and hiding backdoors:

-   **[Netcat](http://netcat.sourceforge.net/)**: A networking utility that allows the setup of network listening ports on compromised systems. Netcat is one of the oldest used in red team techniques.
-   **Rootkits**: Rootkits are a general tool that give attackers persistent access to a system if properly hidden. There are many rootkits in circulation, therefore a single rootkit is not selected.
-   **Steganography Tools**: Tools like [Snow](https://www.snowsoftware.com/) and [Steghide](http://steghide.sourceforge.net/) give attackers the ability of hiding files within files.

## The most common red team tools & software

This section deserves its own section to emphasize the importance of understanding the following concept.

_The MOST common tools and software used by offensive actors in a network and the systems hosted within are the default out-of-the-box tools and software that comes installed on those networks and computer systems._

That’s right! The tools built into the operating systems of network devices and servers/clients are the most leveraged by entities intruding from one system to the next. For example, once the appropriate system permissions are gained in a given system, tools like PowerShell for Windows offer the intruder almost all necessary capabilities to extract the payload of the current system or pivot to the next system in the network. In fact, red teams capture many of the scripts and commands used with default system tools in a document titled “The Red Team Field Manual” (RTFM).

These realities should prove the necessity of securing the systems of an organization thoroughly. It should also reemphasize the importance of understanding the systems defended, familiarizing oneself with the many tools installed within the systems, and their capabilities. As a Cybersecurity Analyst, you should know the default tools of an OS, as well as those tools specifically designed for exploitation and hacking.

## Conclusion

Red teams hack. They are highly skilled in exploitation but apply their skills for ethical purposes. Though malicious intrusion may leverage unknown or rare hack tools and techniques (i.e., zero-days), many of the current intrusion incidents observed in cyberspace still leverage the same red team tools and techniques. Therefore, the red team is an important part of certifying the security of an organization’s computing infrastructure and networks.

Cybersecurity Analysts must be familiar with the red team/blue team practice and should be studied on the tactics of both teams. Understanding the tools and techniques that a red team may apply in assessments fortifies the analyst’s defensive function. This is especially important for the identification and analysis of possible cyberattacks and intrusions that may affect the organization after red team assessments.


# Blue Team Tools

Let’s explore defensive tools used by blue teams.

## What is a blue team?

In the world of [cybersecurity](https://www.codecademy.com/resources/docs/cybersecurity), organizations test their overall security posture and safeguard implementations in their network infrastructure by hiring cybersecurity professionals to conduct security assessments. The organization may employ [penetration testers](https://www.codecademy.com/article/pen-testing) to offensively challenge the safeguards implemented on the computer infrastructure. The organization will simultaneously deploy its cybersecurity professionals, including its Cybersecurity Analysts, to actively defend their infrastructure and put their people, policies, and processes to the test. The offensive professionals are labeled as the “red team”, while the defensive professionals are labeled as the **“blue team”**.

Blue teams defend. They conduct operational network security assessments and evaluations, implement and manage security tools and techniques, and defend and respond to [cyberattacks](https://www.codecademy.com/resources/docs/cybersecurity/cyber-attack) in an organized strategic manner.Cybersecurity Analysts are a component of the blue team.

## Enterprise vs. personal defense

Defense is universal in cybersecurity. The tools and techniques blue teams may be used to defend large complex organizations, or on your personal laptop and smartphone. It’s much easier to defend a personal computer asset versus protecting a large network, but it’s important to learn how to properly secure a single asset before effectively securing an entire network.

The divide between the enterprise defense mindset compared to personal defense isn’t very different. Many of the same types of tools used to secure large networks will be used on a single personal device. The versions used on personal devices may be designed for personal use. This means the software is more “hands-off” since the average computer user does not have the advanced skills necessary to customize security tools without flaws. In fact, defending the average personal computer typically requires a default security configuration since the average personal device is used for common purposes.

Now, the term “personal device” in this article is synonymous with “client device” when discussing personal device security. Client devices require client software for defense. Client software in enterprise networks is similar to commercial client software, but enterprise software typically operates as an agent of a much larger service hosted on the enterprise network. For example, modern enterprise security tools, such as McAfee’s Endpoint Security product, are advertised as all-inclusive security products. The system architecture will contain a centralized service hosted on the network that connects to almost all agents installed on every device on the network. The centralized [server](https://www.codecademy.com/resources/docs/general/server) is where the one or more security policies are defined, stored, and disseminated to the client agents. Agents enforce the policies pushed to them by the centralized server. This analogy is provided to better distinguish between the personal and enterprise client software, where the client software simply downloads a default/generic security policy and the enterprise client software enforces a highly customized organization-defined security policy.

## Common blue team tools & software

### Endpoint security, detection, and response

The overall concept of endpoint security is the protection and defense of any laptop, desktop, smartphone, IP phone, tablet, etc. on a network. These devices are all considered endpoints, and each requires strong security safeguards and policies installed on them to enforce network security. An organization may have hundreds to thousands of endpoints. Special systems have been developed to implement security across an enterprise-scale network that specifically targets securing endpoints. Endpoint security, detection, and response systems contain many different security functions, including: antivirus, data-loss prevention (DLP), file and application integrity, etc.

### Common endpoint security products

McAfee Endpoint Security is a paid enterprise product designed to help large organizations secure their network computer endpoints. The product offers agents for almost every major operating system available/utilized in modern enterprise networks. Proprietary tools by McAfee include the following:

-   McAfee EPO (Policy Orchestrator): The centralized server of the entire system. Acts as the “brain” of the McAfee system.
-   McAfee Agent: The client application is installed on every endpoint. Pulls policy changes and signatures from EPO and enforces them on endpoints.
-   Additional tools: Once the EPO and Agent are deployed to build the system framework, the organization has the option of installing many other McAfee client products such as antivirus, host-based intrusion prevention systems (HIDS), and firewalls.

Microsoft Defender for Endpoint is a paid enterprise cloud endpoint security solution developed by Microsoft. The product is cloud-powered and helps secure enterprise assets against ransomware threats, malware, file-less malware, and other attacks without the need for a client agent. The solution offers protection for Microsoft OS, as well as [Linux](https://www.codecademy.com/resources/docs/general/linux), Android, and iOS.

### SIEM System

A Security Information and Event Management (SIEM) system collects log and event data generated by applications, host systems (servers), and security devices to a single centralized platform. SIEMs actively look for security threats through network and host security monitoring. The SIEM collects and analyzes all logs and events generated by network and server devices, analyzes and compares them to a set of rules (usually defined by the organization), and alerts personnel.

#### Helix Security Platform

A paid enterprise security product, part of a much larger cybersecurity suite developed by FireEye, that focuses on the consolidation and analysis of system logs and events for threat and vulnerability detection.

#### OSSIM

AT&T’s AlienVault Open-Source Security Information and Event Management System (OSSIM) performs the centralized log and event analysis of other SIEM, but it also focuses on techniques such as behavior monitoring, event correlation, asset discovery, and added vulnerability assessment capabilities.

### Threat detection

Also known as threat hunting, this blue team technique actively looks for any active threat in an organization’s infrastructure. It is considered very complex given the technical skill required in the activity of threat hunting, but threat hunters get ahead of red teams by applying many of their tactics mixed with blue team practices.

### Example threat detection products

-   **The Hunting ELK (HELK)**: An open-source product that provides advanced threat hunting analytic capabilities. Includes integration with data science tools and offers “hunters” common use cases of threat detection.

### Network defense

Defending a network requires the collaborative approach of many of the techniques and tools discussed already, but some tools are designed specifically to detect and defend our networks. Tools include intrusion detection systems (IDS), firewalls, and intrusion prevention systems (IPS).

-   **IDS**: Analyzes the traffic entering and exiting a network for behavior matching a malicious signature or anomalous deviation in normal traffic behavior. An IDS will alert and notify all appropriate security personnel of possible intrusion.
-   **IPS**: An IDS that acts on behalf of cybersecurity personnel if an intrusion is detected. An IDS may actively block a connection, severe/isolate a device, etc. if a possible intrusion is caught.
-   **Firewall**: Filters incoming and outgoing network traffic based on a set of organization-defined rules.

### Example network defense tools

-   **SNOR**: An open-source network IDS (NIDS) that analyzes network traffic in real-time and provides packet logging features. Commonly used and widely adopted NIDS product
-   **pfSense**: An open-source firewall. Trusted in the security industry and offers a plethora of additional features such as VPN, state table, and server load balancing.

### Sandboxes and honeypots

_Sandboxes_ are used to contain a process, application, or environment. They are used in blue team tactics to create a separation of systems or applications from interacting with other targets of value. They are used in collaboration with the honeypot technique. A _honeypot_ is a decoy system or network that emulates a legitimate system in an organization’s infrastructure. Honeypots are designed to lure intruders to divert and contain their intrusion actions, and it gives the analysts the opportunity to observe the intrusion behavior and possibly perform some reverse forensics on the intrusion.

### Example sandbox and honeypot products

-   **Kippo**: A lightweight, open-source honeypot tool written in [Python](https://www.codecademy.com/resources/docs/python). Kippo presents an intruder with fake filesystems resembling Debian and other Linux distributions.
-   **Firejail**: An open-source sandbox tool that helps secure Linux systems. The sandbox action is performed on a SUID, or Set owner User ID upon execution. Firejail locks the access of an intruder from any critical areas of the Linux system by sandboxing the intruder’s session by applying for special SUID permissions.

### Incident response

In the event that an intrusion is apparent, then the incident response processes begin. Incident response is the practice of responding to a cyber incident within an organization. Incidents may be anything from an anomalous attempt of login to a server to a revealed data breach. The process of responding to an incident is a component of blue teams since, depending on the industry of the organization defended, laws and regulations may require appropriate documentation of the incident.

### Example incident response products

-   **TheHive**: A paid incident response platform that is designed to meet the needs of security practitioners. Promotes collaboration, elaboration, and follow-through in the incident handling and response process.
-   **GRR Rapid Response**: An open-source tool that offers excellent incident response and lives forensic features. Scales well and offers support for Linux, OS X, and Windows OS.

## Conclusion

Cybersecurity analysts must be familiar with the red team/blue team practice and should be studied on the tactics of both teams. Understanding the tools and techniques that a blue team may apply to defend a system is key. This is especially important for the protection against possible cyberattacks, intrusions, and other incidents that may affect an organization.



# Logs and Monitoring

Log analysis and monitoring are some of the most used and essential skills for a cybersecurity analyst.

## What We’ll Be Learning

Logging and monitoring are essential and beneficial for all organizations. The primary benefit of having these controls in place is to aid incident responders, forensic engineers, and security analysts to capture adequate information to alert and reconstruct the activities of a malicious threat attacker.

In this article, you will learn about logging and monitoring, tools to automate the process, cases where logging and monitoring helped aid in incident response, and log management.

## What are Logging and Monitoring?

Logging is the act of collecting and storing information about events in a system. Every device on a network generates a list of events. These lists of events are called logs.

Log monitoring is the action of categorizing those events and searching the data for abnormalities that might cause problems in the system. Most large organizations usually have significant traffic daily. The significant traffic generates logs from the organization’s network. The organization’s network contains massive amounts of data that are impossible for any Information Technology (IT) members to manually catalog and interpret. Additionally, the data collected in these logs are often from different sources that use multiple formats to report unrelated incidents.

For that reason, this is why security logging and monitoring are typically carried out by monitoring software which should be part of the organization’s cybersecurity plan. An effective monitoring system collects and organizes the data to produce digestible information. The information collected and organized should be format-adjustable for IT teams usage.

## Security Information Event Management Tool

To aid in logging and monitoring, some cybersecurity departments utilize a tool called SIEM (Security Information Event Management). According to [Gartner](https://www.gartner.com/en/information-technology/glossary/security-information-and-event-management-siem), “a SIEM is a technology that supports threat detection, compliance, and security incident management through the collection and analysis of security events, as well as a wide variety of other event and contextual data sources.”

Some well known SIEMs are:

-   Splunk Enterprise SIEM
-   Datadog’s Security Monitoring
-   SolarWinds’ Security Event Manager
-   McAfee ESM
-   Micro Focus ArcSight

The SIEMs above are to name a few. Several SIEMs meet specific companies’ needs, and some of them are listed in Comparitech’s article - [11 Best SIEM Tools for 2022: Vendors & Solutions Ranked](https://www.comparitech.com/net-admin/siem-tools/).

### How do SIEMs Work?

SIEMs are nifty tools in helping your companies identify and possibly capture malicious threats or reconstruct the activities of a malicious threat attacker. But, how exactly do they work? SIEM technology works by collecting logs and specific data created by your company’s products or services, organizing the data collected, and presenting the data into a centralized system, like a dashboard. A SIEM will take data inputs from various tools such as anti-virus systems, host monitoring systems, network monitoring solutions, raw logs, and other data sources. The system will then regularly review these entries based on complex logic rules to identify potentially important events or sets of events. The company usually configures the information they need. If a SIEM identifies a threat through its monitoring platform, it will send an alert and determine the danger level based on the threat. The company usually configures the danger level.

## Case Study: Salvation Army Achieves Game-Changing Cybersecurity Posture with LogRhythm

The [Case Study: Salvation Army Achieves Game-Changing Cybersecurity Posture with LogRhythm](https://logrhythm.com/case-studies/apj-salvation-army/) tells how the Salvation Army, “an international Christian movement, united by faith and giving hope where it’s needed most,” realized the importance of strengthening the security of their platform and infrastructure. As they continued to grow, so did their sensitive data. That said, they needed to be more vigilant in maintaining their data security.

To help with the maintenance, security visibility, and, overall, improving their infrastructure, they pursued LogRhythm’s SIEM platform. As a result, they noticed, through logging and monitoring, “some significant benefits. It was now possible to gain insights into issues and incidents that would have previously been impossible without trawling through endless logs or paying third parties to conduct audits. For example, the IT team can see if a potentially malicious email has made it through the infrastructure’s filters, whether a staff member has clicked on a link and whether that caused their workstation to become infected with malware.”

The Salvation Army Case Study is one example of how logging and monitoring and SIEMs technologies can establish and enhance your company’s security infrastructure. There are many more examples and case studies of logging and monitoring benefits and SIEMs technologies. If you’re interested in learning more through case studies, look at the list below:

-   [LogRhythm’s Case Study](https://logrhythm.com/case-studies/)
-   [Splunk’s Customer Stories](https://www.splunk.com/en_us/customers/customer-overview-search.html?sort=Newest)
-   [Datadog Case Studies](https://www.datadoghq.com/case-studies/)

## Log Management

Now that you are aware of logging and monitoring and SIEMs, let’s talk about some things to consider when logging. The history of a malicious user’s activities may be lost to a company if security logs are not properly managed. The [NIST’s Guide to Computer Security Log Management](https://csrc.nist.gov/publications/detail/sp/800-92/final) provides general guidance around log management and its standards. According to the guide, companies and organizations need to understand the importance of log management. Practical and strategic log management can benefit companies or organizations by “helping to ensure that computer security records are stored in sufficient detail for an appropriate period of time.” The [NIST’s Guide to Computer Security Log Management](https://csrc.nist.gov/publications/detail/sp/800-92/final) has listed criteria and procedures to aid in establishing companies’ logging needs:

-   [Federal Information Security Management Act of 2002 (FISMA)](https://www.congress.gov/bill/107th-congress/house-bill/3844)
-   [Gramm-Leach-Bliley Act (GLBA)](https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act)
-   [Health Insurance Portability and Accountability Act of 1996 (HIPAA)](https://csrc.nist.gov/publications/detail/sp/800-66/rev-1/final)
-   [Sarbanes-Oxley Act (SOX) of 2002](https://www.law.cornell.edu/wex/sarbanes-oxley_act#:~:text=The%20Sarbanes%2DOxley%20Act%20(SOX,scandals%20in%20the%20early%2D2000s.)
-   [Payment Card Industry Data Security Standard (PCI DSS)](https://www.pcihispano.com/contenido/uploads/2016/09/PCI_data_security_standard_v1.0.pdf)

However, log management does come with challenges, and the challenges vary depending on the company’s needs. Some of the obstacles that NIST mentioned are:

-   **Log Generation and Storage** - The storing of a large number of logs can result in multiple log sources and inconsistent log information. As a result, managing logs within a company can get complicated.
-   **Log Congestion** - It’s important to consider what we log. While it may seem valuable to log as much as possible, this may have a negative impact on system performance and maintenance costs. Additionally, while extensive logging may seem like a good thing, too many logs can bog down investigators, and hide important events. It’s important we consider the quality of the logs, as well as the amount.
-   **Log Protection** - Logs can contain sensitive data of users or your company. The data collected can raise security and privacy concerns, especially if the management of those logs is not properly secured.
-   **Log Analysis** - Analyzing logs can be a mundane task and are often left to network and system administrators.


# Exploring Threat Intelligence Sources

In this article, we’ll explore what constitutes a threat intelligence source, the types of threat intelligence, and provide useful tools and resources you can utilize in your own security research.

## What We’ll Be Learning

Threat intelligence is a critical part of cyber defense. It enables organizations to track, monitor, and analyze threats to their operating environment. We will cover the following topics and objectives to help you better familiarize yourself with threat intelligence sources:

-   An overview and explanation of what constitutes a threat intelligence source
-   Types of threat intelligence (strategic vs. tactical)
-   Tools, sites, databases, and sources that you can use as a cybersecurity professional

## Threat Intelligence Sources

Simply put, a threat intelligence source is something that can provide actionable, real-time information on a threat(s) that can be analyzed to produce intelligence. Through threat intelligence, security researchers can gain a deeper understanding of vulnerabilities, and thus accurately prioritize measures to mitigate known threats. One of the most important aspects of any source of intelligence is credibility. In other words, how can you validate that the information provided by the source is reliable and accurate? There is not one single factor, but rather a multitude of factors that affect source credibility. For example, accuracy, age and currency of information, motivation, expertise, bias, and corroborating evidence can all be used to assess the credibility of a source.

In cybersecurity, threat intelligence can be derived from external and internal sources. External sources can include open source reporting or information shared between groups. Internal sources usually include information derived from an organization’s Security Information and Event Management (SIEM) tool. In the following sections, we will discuss and provide information on specific threat intelligence sources.

## The Different Types of Threat Intelligence

When used correctly, cyber threat intelligence can provide deeper insight into cyber threats, thus allowing for a more targeted response. It’s important to note, however, that there are different types of threat intelligence with their own unique features. Here, we will explore four main sub-types of threat intelligence used by security professionals.

### Strategic Intelligence

High-level presents a more holistic view of the threat landscape. This type of intelligence is most relevant for senior-level decision-makers rather than cybersecurity analysts. This type of intelligence usually takes the form of a report, assessment, bulletin, or brief which provides an overview of the threat.

### Tactical Intelligence

More granular, generally contains detailed information about the threat actor(s), tactics, techniques, and procedures (TTPs) for conducting an attack. This could include intelligence on spoofed websites designed to harvest credentials or personal information, or specific strains of malware.

### Operational Intelligence

This is actionable information about an anticipated attack. Operational Intelligence is not as common as other types of threat intelligence, but it can provide advance warnings against an imminent threat.

### Technical Intelligence

The most granular type of intelligence is used by cybersecurity and security operation center analysts. Examples include real-time threat indicators generally found through event logs and alerts in a SIEM tool.


## Tools, Sites, and Other Sources

Here, we’ll break down various threat intelligence sources by category. As a cybersecurity professional, it is helpful to know some of the more widely used sources in the industry.

### Free Cyber Intelligence Sources

-   **[Recorded Future](https://www.recordedfuture.com/)**: one of the leaders in the cybersecurity space, they have a threat intelligence platform that includes advanced querying, alerting, and data visualization capabilities.
-   **[AlienVault Open Threat Exchange](https://otx.alienvault.com/)**: an open threat exchange and crowdsourced security platform. You can get access to nearly 20 million threat indicators daily and collaborate with over 100,000 participants.
-   **[IBM X-Force Exchange](https://exchange.xforce.ibmcloud.com/)**: a cloud-based platform that combines human intelligence with a global security feed. The dashboard is customizable, allowing users to prioritize relevant intelligence.
-   **[Palo Alto Networks Cortex XSOAR TIM](https://www.paloaltonetworks.com/resources/datasheets/cortex-xsoar-overview)**: Aggregates the most relevant threats from the company’s Unit 42 threat intelligence group. The product can be embedded in existing tools for understanding incidents and events.
-   **[SANS: Internet Storm Center](https://isc.sans.edu/)**: Part of the SANS Institute, it takes in over 20 million logs a day to generate alerts. Analysis, tools, and sharing of information amongst security professionals are also provided.

### Government Sources

-   **[FBI InfraGard](https://www.infragard.org/)**: a partnership between the FBI and private sector companies to protect critical US infrastructure. Members receive threat advisories, intelligence bulletins, and reports. _Note: must be a member to get access.
-   **[Department of Homeland Security (DHS) CISA Automated Indicator Sharing](https://www.cisa.gov/ais)**: provides shared intelligence and allows member organizations to monitor cyber threats.
-   **[DHS National Cyber Awareness System](https://www.cisa.gov/uscert/ncas)**: features five products that offer a variety of threat analyses. Alerts, analysis reports, current activity, and bulletins are likely to contain the most useful open-source intelligence.
-   **[New Jersey Cyber and Communications Integration Cell](https://www.cyber.nj.gov/)**: contains a dedicated threat center that features various publications as well an updated list of current threats.

## Conclusion

This article has provided a closer look at threat intelligence, including defining what constitutes a source, the categories of threat intelligence, as well tools and resources you can utilize in your own research. It’s a good idea to better familiarize yourself with some of these concepts and sources by reading reports, assessments, bulletins, etc. In turn, you will be better prepared to discuss this topic during an interview!


# Growth Mindset & Cybersecurity

In this article, you will learn how and why the growth mindset is advantageous to cybersecurity professionals.

## What we’ll be learning

Mindset is crucial, especially in the field of cybersecurity. As technology advances, there will be advancements in cyber threats, software vulnerabilities, and malicious actors. To keep up, cybersecurity professionals and enthusiasts must be skilled at discovering where vulnerabilities hide, which threats require prioritization, and which risks to eliminate or accept. In short, professionals and enthusiasts will need to be ready, and this readiness starts with the mindset we choose.

In this article, you will learn about two mindsets psychologist [Carol Dweck](https://profiles.stanford.edu/carol-dweck) coined, the fixed and growth mindset, and how both mindsets play a crucial role in your journey to becoming a cybersecurity professional.

## What exactly is a mindset?

Mindset is our perspective of the world and ourselves. It is how we decide to approach a problem, a thought, a feeling, or a given situation.

In the case of a cybersecurity professional, it is how we think of a security or privacy threat. Do we think of it as a challenge to grow our skills and knowledge or as a threat that will determine if we are good at cybersecurity or not?

![Two scenarios of Jess.](https://static-assets.codecademy.com/Paths/cybersecurity-analyst-career-path/cybersecurity-analyst-interview-prep/general-knowledge/growth-mindset/Two%20scenario%20Jess.svg)

## Why does mindset matter?

As mentioned earlier, the mindset we choose can influence our beliefs, confidence, thought-process, and creativity. It can also do the opposite and limit us from reaching our potential because of discouragement and fear.

Cybersecurity requires continuous learning and growth. Professionals and enthusiasts must adopt a mindset that encourages and embraces ongoing growth so they can stay one step ahead of new threats. Ransomware is barely 30 years old - what new attacks might be coming next?

## Fixed vs. growth mindset

### What is a fixed mindset?

Let’s meet Jack. Jack is a cybersecurity professional with a fixed mindset. Jack believes that we either get cybersecurity concepts or we don’t. Jack’s day-to-day job is usually doing network analytics, which he gets and does pretty well. However, when Jack encounters a network challenge he has never seen before, he begins to panic and doubts his knowledge and skills as a network analyst after a few hours of working on it.

![Jack is panicking over an error](https://static-assets.codecademy.com/Paths/cybersecurity-analyst-career-path/cybersecurity-analyst-interview-prep/general-knowledge/growth-mindset/Jack%20Frustrated.svg)

Eventually, Jack gives up on figuring out the solution and does something risky and dangerous. He categorized the issue as “Not Important” putting the company, and his job, at risk.

With a fixed mindset, we believe that we are either born with or without specific skills or talents. In other words, we are good at a skill, or we are not. We either understand the information, or we do not. This mindset can limit individuals from exploring their potential. In Jack’s case, his mindset is risky in cybersecurity by preventing him from adapting to new problems. Malicious actors are constantly creating and discovering new problems, so Jack needs to learn how to adapt to them!

Now, let’s meet Anna, Jack’s co-worker.

### What is a growth mindset?

Anna, also a network analyst, has a growth mindset. She believes that she can continuously develop new skills and talents as long as she puts her mind to them. When Anna noticed the network problem, she grew excited as she saw this challenge as an opportunity to develop her knowledge and skills as a cybersecurity professional. She embraced the challenge even though she never encountered this specific problem before.

![Anna is excited about finding the solution](https://static-assets.codecademy.com/Paths/cybersecurity-analyst-career-path/cybersecurity-analyst-interview-prep/general-knowledge/growth-mindset/Anna%20Excited.svg)

Anna did her research and communicated with others on her team about the network error occurring. After a few conversations and readings, she discovered the source of the network error, resolved the issue, all while improving her understanding of computer networking and strengthening the company’s security.

In Carol Dweck’s “Mindset: The New Psychology Of Success,” she states “the passion for stretching yourself and sticking to it, even (or especially) when it’s not going well, is the hallmark of the growth mindset. This is the mindset that allows people to thrive during some of the most challenging times in their lives.” By striving, we excel, and we accomplish great things by excelling.

## Growth mindset & cybersecurity

Jack and Anna are two examples of how our mindset can determine or restrict success in a situation. Thankfully, neither mindset is permanent. In the case of Jack and Anna, Jack can develop a growth mindset in his job later on.

It is essential to know that a growth mindset is advantageous in the tech field, not only in cybersecurity. Technology is advancing, for example, think of the following fields:

-   Internet of Things (IoT)
-   5G
-   Augmented/Virtual/Mixed Reality
-   Artificial Intelligence
-   Cloud Infrastructure

As technology advances, there will be a greater need for the security and privacy of those tools and technologies. To prepare for when that time comes, cybersecurity professionals and enthusiasts should strive to develop a growth mindset to better protect themselves, others, and their organizations from being victims of cyber attacks.

### Tips for developing a cybersecurity growth mindset

To help with your growth mindset journey, here is a non-exhaustive list of ways to develop a Cybersecurity Growth Mindset:

-   **Start believing that anyone can learn, including you**. In Jack’s and Anna’s case, Jack did not have the determination to put in the time or effort to solve the network security error at his job, but Anna did. As a result, Anna resolved the problem while learning more about network security. She believed she could learn anything and put it into action. As a cybersecurity professional, there will be many concepts, tools, and techs we will need to learn to combat malicious actors successfully. It is crucial to adopt the confidence that we can learn these concepts, tools, and techs.
    
-   **Practice, practice, practice**. We are neither born with a growth mindset nor is it permanent once we have it. For it to become a daily routine, it needs to be practiced daily. The growth mindset is like any other skill or talent. That said, to become good at a skill or talent, we need to train. Take Anna, for instance. She developed a growth mindset because she places herself in challenges that require her to be a continuous learner. Those challenges are training for her to continue developing her mindset. Practicing is crucial to developing a cybersecurity growth mindset. In cybersecurity, there is a risk of potential cyber threats every day. To be ready to combat them, we need to develop our skills, including our growth mindset.
    
-   **View failures as opportunities**. There are days when we fail, especially in cybersecurity. Malicious actors can steal our information, our company can be victims of a ransomware attack, or someone gained access to our network because of a weak security password we created. It is essential not to let these shortcomings define us but help mold us to be better cybersecurity professionals and enthusiasts. Viewing failures as opportunities is a stepping stone in developing a cybersecurity growth mindset.
    

Remember, obtaining a growth mindset is a continuous journey that needs constant practice, persistent effort, and an understanding that you are a continuous learner.

## Conclusion

Okay! So, let’s do a quick recap:

-   Mindset is our perspective of the world and ourselves.
-   With a fixed mindset, we believe we are either born with or without certain skills and/or talents.
-   With a growth mindset, we believe we can learn any skills and/or talents when we put our mind to it.
-   Cybersecurity professionals need to be prepared and having a growth mindset will help with that preparation.
-   Obtaining a growth mindset is a continuous journey that needs constant practice, persistent effort, and an understanding that we are continuous learners.
-   Technology is constantly advancing and with the advancement, there will be a rise in cyber threats, software vulnerabilities, and malicious actors.



# Welcome to Practice Incident Response Scenarios for Cybersecurity Analysts

Get ready to practice interview scenarios!

## Goals of this Unit

The goal of this unit is to practice using incident response processes to respond and recover from incidents in various interview scenarios.

After this unit, you will have:

-   Practiced multiple interview scenarios
-   Become more familiar with the types of questions you may be asked in an interview

![An image showing three levels of triage: Priority 1 requires immediate action, priority 2 requires delayed action, and priority 3 only requires observation. These priorities are based on how many business operations are interrupted and in what ways.](https://static-assets.codecademy.com/Paths/cybersecurity-analyst-career-path/cybersecurity-analyst-interview-prep/incident-response-scenarios/Ransomware%20triage.svg)


# What Is an Incident Response?

In this article, you’ll learn about the phases of an Incident Response (IR) lifecycle and how you can create an Incident Response report.

## The scenario and what we’ll be learning

Imagine you are joining as a Cybersecurity Analyst in the Federal Reserve Bank of New York (New York Fed). The New York Fed, on behalf of the Federal Reserve System, offers correspondent banking and custody services to central banks, monetary authorities, and certain international organizations to facilitate their official financial operations.

Recently, someone stole $81 million from a foreign central bank that uses the Society for Worldwide Interbank Financial Telecommunication (SWIFT) system. The New York Fed CISO wants your team to be part of a review of the existing IR playbook and submit an IR report of the SWIFT system [hack](https://www.codecademy.com/resources/docs/cybersecurity/hacking).

![An image showing a hacker on a laptop.](https://static-assets.codecademy.com/Paths/cybersecurity-analyst-career-path/cybersecurity-analyst-interview-prep/incident-response-scenarios/hacker.svg)

We will deep dive into the IR playbook that provides a standardized response process for confirmed malicious [cybersecurity](https://www.codecademy.com/resources/docs/cybersecurity) incidents. This playbook describes the process through the IR phases defined in the National Institute of Standards and Technology (NIST) Special Publication (SP) 800-61 Rev 2[1], including:

-   Preparation
-   Detection and Analysis
-   Containment
-   Eradication and Recovery
-   Post-Incident Activities

## Preparation

Incident Response (IR) methodologies emphasize both **prevention** and **preparation**. Prevention is fundamental to the success of IR efforts. In contrast, preparation for major incidents will minimize any impact on the organization.

Prevention activities could include the following:

-   Conducting periodic risk assessments to prioritize risks and putting control measures according to the organization’s risk appetite.
-   Establishing internal and external monitoring.
-   Providing regular user awareness and training.

Preparation activities could include:

-   Updating the alert roster regularly.
-   Maintaining a fly-away/jump kit.
-   Working with current network, system, and application baselines.
-   Keeping network diagrams up to date; ports, protocols, and application list.
-   Ensuring security of IR tools and communications.

In our scenario, the foreign central bank had _minimal prevention efforts_. There was no firewall to protect its computer system, and they used second-hand $10 switches to connect to the SWIFT global payment system.

## Detection and analysis

The most challenging task in the IR process is accurately detecting and analyzing incidents. We can detect incidents through automated capabilities such as network/host-based IDPS or manual means, such as suspicious activity reported by the users.

In our scenario, an employee at New York Fed detected the hackers because of a typo. The hackers indicated one of the transfers should go to Skalka Foundation, but they misspelled “foundation” as “fundation.”

![An image showing the word "fundation" on a computer screen. A magnifying glass is showing the typo: it should say "foundation" with an "o" and a "u", not "fundation".](https://static-assets.codecademy.com/Paths/cybersecurity-analyst-career-path/cybersecurity-analyst-interview-prep/incident-response-scenarios/Fundation.svg)

Detection is the most difficult task in incident handling. The best solution is to form a team of experts who can analyze the indicators effectively and take appropriate actions. ~ [Computer Security Incident Handling Guide](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf)

Detection activities could include:

-   Profiling networks and systems.
-   Understanding normal behaviors.
-   Performing event correlation.

Numerous news articles report the lack of profiling or understanding of normal behaviors by the NY Fed officials. Normal behaviors were:

-   The foreign central bank in the scenario had issued payment instructions to the Fed _fewer than 2 per day_ for the last eight months.
-   _None of these payments were to an individual_.

The concerning behaviors were:

-   The hackers sent _35 payment instructions in one weekend_.
-   _Most of these payments were to individuals_.

The hackers successfully sent four payment instructions worth $81 million to offshore false individual accounts.

## Containment

Containment is an important step in IR that involves decision-making to prevent further damage or to gain knowledge about the attacker’s activity. _We do not recommend delayed containment._ This strategy is more suitable for agencies with mature SOCs.

Key containment activities could include:

-   Redirecting the attacker to a sandbox.
-   Capturing forensic images for legal evidence.
-   Closing specific ports and services.
-   Discussing legal implications.

![An image showing knights in armor protecting a computer in a castle.](https://static-assets.codecademy.com/Paths/cybersecurity-analyst-career-path/cybersecurity-analyst-interview-prep/incident-response-scenarios/containment.svg)

Organizations should develop appropriate strategies with criteria documented clearly to facilitate decision-making.

Criteria could include:

-   Service availability (e.g., service provided to external parties).
-   Time and resources needed to implement the strategy.
-   Effectiveness of the strategy.

In our scenario, the hackers timed the attack so that when New York Fed tried to contact the officials in the foreign central bank, it was a weekend in that country, and no one was working. Then, when the foreign central bank discovered the theft, it was the weekend in New York, and the Fed was closed.

Both organizations _did not have a containment strategy with appropriate service availability criteria_. But since then, the Fed has started a 24-hour hotline for emergency calls from the central banks around the world.

## Eradication and recovery

Eradication and recovery is an iterative process that allows the return of normal operations by remediating all infected systems. Here we should mention that remediation is “The process of fixing a security issue.” Remediation can happen without an incident, but _IR requires remediation_.

Some eradication activities could include:

-   Re-imaging affected systems.
-   Replacing compromised files with clean versions.
-   Installing patches.
-   Changing passwords.
-   Monitoring for adversary re-entry.
-   Discuss legal implications.

Some recovery activities could include:

-   Tightening perimeter security by updating firewall and boundary router access controls lists.
-   Validating that the eradication and recovery was successful.

After successfully eradicating the adversary, we may have to continue with detection and analysis activities to observe any re-entry. Continue recovery if no new adversary activity is found.

Eradication activities are not fully known for our scenario. But to recover $81 million, the foreign central bank contacted the second foreign bank where the money was transferred. Unfortunately, the second foreign bank was closed due to New Year celebrations. Also, under the banking laws of the second foreign country, funds can not be frozen until a criminal case is lodged. In the meantime, the stolen $81 million disappeared into the second country’s casino industry, which is exempted from anti-money laundering laws.

## Post-incident activities

The objective of this phase is to document the incident, share it with others, and apply the lesson learned to improve the security posture of the organization ultimately.

Post-incident activities could include:

-   Emulating adversary TTPs in close coordination with the blue team to ensure the effectiveness of the implemented countermeasures.
-   Conducting lessons-learned meetings.
-   Finalizing the IR report.

### Final Incident Response report

The final IR report should capture lessons learned, initial root cause, problems executing courses of action, and any missing policies and procedures. We recommend that the report start with an executive summary and include a separate section with technical details and images.

A victim organization of cyber incidents can report to federal law enforcement agencies who have highly trained investigators specialized in responding to cyber incidents.

Reporting formats and methods vary by organization. Reporting activities could include:

-   Providing artifacts.
-   Closing tickets.
-   Conducting followups.
-   Publishing CVEs responsibly.
-   Producing the final report.

Key resources and points of contact for reporting cyber incidents include the following:

-   [Key Federal Points of Contact for Cyber Incident Reporting](https://www.dhs.gov/sites/default/files/publications/Cyber%20Incident%20Reporting%20United%20Message.pdf)
-   [CISA Incident Reporting System](https://us-cert.cisa.gov/forms/report)
-   [US-CERT AMAC Malware Analysis Submissions](https://www.malware.us-cert.gov/)

## Conclusion

In this article, we covered the IR playbook that provides standard response actions through the phases of IR phases defined in [the National Institute of Standards and Technology (NIST) Special Publication (SP) 800-61 Rev 2.](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf)

We recommend organizations build their IR plans and capabilities based on their risk appetite and threats common to them. Predetermined strategies, techniques, and procedures for handling incidents will make decision-making easy, thus reducing the impact on the organization’s missions and ongoing operations.

### Resources

-   [Computer Security Incident Handling Guide](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf)
-   [How the New York Fed fumbled over the Bangladesh Bank cyber-heist](https://www.reuters.com/investigates/special-report/cyber-heist-federal/)

