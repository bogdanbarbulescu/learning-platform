# Red Hat Cheatsheet

This GitHub repository contains a collection of essential commands and tips for working with Red Hat Enterprise Linux (RHEL). Whether you're a system administrator, developer, or just getting started with Red Hat, this cheatsheet provides a handy reference to help you manage and troubleshoot your Red Hat systems effectively.



## Introduction

Red Hat Enterprise Linux (RHEL) is a popular open-source operating system designed for enterprise environments. Known for its stability, security, and extensive support, Red Hat is widely used in data centers, cloud environments, and mission-critical applications. This repository serves as a quick reference guide, compiling useful commands and configurations that are frequently used in RHEL environments.

## Red Hat Overview

Red Hat Enterprise Linux is a robust, scalable, and secure operating system built for modern enterprises. It offers a wide range of features including high availability, security enhancements, containerization support, and extensive documentation. RHEL is the foundation for many enterprise-grade applications and services, making it a critical component in various IT infrastructures.



## Manage Files from the Command Line

### The File-system Hierarchy


| Location | Purpose |
|----------|---------|
| `/boot`  | Files to start the boot process. |
| `/dev`   | Special device files that the system uses to access hardware. |
| `/etc`   | System-specific configuration files. |
| `/home`  | Home directory, where regular users store their data and configuration files. |
| `/root`  | Home directory for the administrative superuser, `root`. |
| `/run`   | Runtime data for processes that started since the last boot. This data includes process ID files and lock files. The contents of this directory are re-created on reboot. This directory consolidates the `/var/run` and `/var/lock` directories from earlier versions of Red Hat Enterprise Linux. |
| `/tmp`   | A world-writable space for temporary files. Files that are not accessed, changed, or modified for 10 days are deleted from this directory automatically. The `/var/tmp` directory is also a temporary directory, in which files that are not accessed, changed, or modified in more than 30 days are deleted automatically. |
| `/usr`   | Installed software, shared libraries, including files, and read-only program data. Significant subdirectories in the `/usr` directory include the following commands: |
|          | - `/usr/bin`: User commands |
|          | - `/usr/sbin`: System administration commands |
|          | - `/usr/local`: Locally customized software |
| `/var`   | System-specific variable data should persist between boots. Files that dynamically change, such as databases, cache directories, log files, printer-spooled documents, and website content, might be found under `/var`. |


## Manual Pages

- The `man` pages are stored in subdirectories of the /usr/share/man directory.

### Common Sections of the Linux Manual
| Section | Content type                                   | Description                                        |
|---------|------------------------------------------------|----------------------------------------------------|
| 1       | User commands                                  | Both executable and shell programs                 |
| 2       | System calls                                   | Kernel routines that are invoked from user space   |
| 3       | Library functions                              | Provided by program libraries                      |
| 4       | Special files                                  | Such as device files                               |
| 5       | File formats                                   | For many configuration files and structures        |
| 6       | Games and screensavers                         | Historical section for amusing programs            |
| 7       | Conventions, standards, and miscellaneous      | Protocols and file systems                         |
| 8       | System administration and privileged commands  | Maintenance tasks                                  |
| 9       | Linux kernel API                               | Internal kernel calls                              |

### Navigate man Pages
| Command    | Result                                                 |
|------------|--------------------------------------------------------|
| Spacebar   | Scroll forward (down) one screen.                      |
| PageDown   | Scroll forward one screen.                             |
| PageUp     | Scroll backward (up) one screen.                       |
| DownArrow  | Scroll forward one line.                               |
| UpArrow    | Scroll backward one line.                              |
| D          | Scroll forward one half-screen.                        |
| U          | Scroll backward one half-screen.                       |
| /string    | Search forward for *string* in the man page.           |
| N          | Repeat previous search forward in the man page.        |
| Shift+N    | Repeat previous search backward in the man page.       |
| G          | Go to the start of the man page.                       |
| Shift+G    | Go to the end of the man page.                         |
| Q          | Exit man and return to the command shell prompt.       |


## Vim

Red Hat recommends that you learn the following Vim keys and commands:

- The `u` key undoes the most recent edit.
- The `x` key deletes a single character.
- The `:w` command writes (saves) the file and remains in command mode for more editing.
- The `:wq` command writes (saves) the file and quits Vim.
- The `:q!` command quits Vim, and discards all file changes since the last write.

### Moving the Cursor
- `<h>` `<l>` `<k>` `<j>` 
  - These are basic VIM navigation keys:
    - `h`: Move left
    - `l`: Move right
    - `k`: Move up
    - `j`: Move down

## Common Commands

In this section, you'll find a curated list of commonly used Red Hat commands categorized by functionality. These commands cover system administration tasks, package management, networking, security, and more. Each command is accompanied by a brief explanation and usage example to help you quickly understand its purpose and how to use it.

### General Commands
- `id` - Display user identity.
- `ssh servera` - Connect to a server using SSH.
- `exit` - Exit the current session.
- `whoami` - Display the current user.
- `date` - Display current date and time.
- `date +%R` - Display current time in 24-hour format.
- `date +%x` - Display current date.
- `passwd` - Change your own password.
- `cat /etc/shadow` - View shadow password file (requires root).
- `file /etc/shadow` - Get file type information.
- `head` - Output the first part of files.
- `tail -n 20` - Output the last 20 lines of a file.
- `history` - Display the command history.
- `!number` - Execute a command from history by its number.

### Directory Navigation
- `cd /` - Change to root directory.
- `ls /home` - List contents of the `/home` directory.
- `ls /usr/bin` - List contents of the `/usr/bin` directory.
- `ls /var` - List contents of the `/var` directory.
- `ls /tmp` - List contents of the `/tmp` directory.
- `ls /dev` - List contents of the `/dev` directory.

### File and Directory Management
- `sudo cat /dev/ada` - View a file with root privileges.
- `cd mydirectory` - Change directory to `mydirectory`.
- `touch file1` - Create a file named `file1`.
- `touch file2 file3` - Create multiple files `file2` and `file3`.
- `rm file1` - Remove a file named `file1`.
- `ls -l` - List files in long format.
- `ls -a` - List all files including hidden files.
- `cp -r mydirectory/` - Copy directory recursively.
- `mv myfile myfile2` - Rename a file.
- `echo "some text" >> filename` - Append text to a file.
- `ln filename hardlink` - Create a hard link.
- `ln -s filename softlink` - Create a soft link.

### Variables and Echo
- `VARIABLE=test` - Set a variable to `test`.
- `echo $VARIABLE` - Display the value of a variable.
- `echo something on date $(date)` - Print text with the current date.
- `$(whoami)` - Display the current username.
- `echo "#test"` - Echo the string `#test`.



## User Management Commands

User accounts are of the following main types: the `superuser`, `system users`, and `regular users`.


### Managing Users and Groups

#### UID Ranges
Red Hat Enterprise Linux uses specific UID numbers and ranges of numbers for specific purposes.
- UID 0 : The superuser (root) account UID.
- UID 1-200 : System account UIDs that are statically assigned to system processes.
- UID 201-999 : UIDs that are assigned to system processes that do not own files on this system.
Software that requires an unprivileged UID is dynamically assigned a UID from this available
pool.
- UID 1000+ : The UID range to assign to regular, unprivileged users.

Commands:
- `su root`
  - **Switch User**: Use this command to switch to the `root` user. This is often required for administrative tasks that need superuser privileges.
  
- `cat /etc/passwd`
  - **View User Accounts**: Displays the contents of the `/etc/passwd` file, which contains information about all user accounts on the system.

- `useradd user1`
  - **Add User**: Create a new user account with the username `user1`.

- `useradd -u 1000 user2`
  - **Add User with Specific UID**: Create a new user `user2` with a specific user ID (UID) of `1000`.

- `userdel test3`
  - **Delete User**: Remove the user account `test3` from the system.

- `groupadd groupname`
  - **Create Group**: Create a new group with the name `groupname`. Groups are used to manage permissions for multiple users.

- `usermod -aG student test4`
  - **Modify User Group Membership**: Add the user `test4` to the `student` group. The `-aG` option appends the user to the group without affecting other group memberships.

- `usermod -s /bin/nologin test4`
  - **Change User Shell**: Change the login shell for user `test4` to `/bin/nologin`, effectively preventing the user from logging in.

- `usermod -L test4`
  - **Lock User Account**: Lock the account of user `test4`, which disables the user’s password and prevents login.

- `usermod -U test4`
  - **Unlock User Account**: Unlock the account of user `test4`, re-enabling the ability to log in.

### Sudoers and Privileges

The differences between the `su`, `su -`, and `sudo` commands:
|                 | su             | su -           | sudo                     |
|-----------------|----------------|----------------|--------------------------|
| **Become new user** | Yes            | Yes            | Per escalated command     |
| **Environment**     | Current user's | New user's     | Current user's           |
| **Password required** | New user's    | New user's    | Current user's           |
| **Privileges**       | Same as new user | Same as new user | Defined by configuration |
| **Activity logged**  | su command only | su command only | Per escalated command    |

Commands:
- `vim /etc/sudoers`
  - **Edit Sudoers File**: Edit the `/etc/sudoers` file with `vim` to manage permissions for `sudo` commands. This is where you define which users can execute commands as the root user.

- `root ALL=(ALL) ALL`
  - **Grant Full Permissions to Root**: In the sudoers file, this line gives the `root` user full permissions to execute any command on the system.

- `vim /etc/sudoers.d/admin`
  - **Custom Sudoers File**: Edit a sudoers configuration specific to the `admin` user. This allows setting up specific rules for this user.

- `admin ALL=(ALL) NOPASSWD: ALL`
  - **Passwordless Sudo**: Allow the `admin` user to run any command without requiring a password.

- `admin ALL=(student) /bin/ld`
  - **Limit Admin Commands**: Allow the `admin` user to run the `/bin/ld` command specifically as the `student` group.

- `sudo systemctl restart crond`
  - **Restart a Service**: Use this command to restart the `crond` service, which is responsible for running scheduled tasks (cron jobs). Requires `sudo` privileges.

## Password Management Commands

### Managing User Passwords

- `vim /etc/shadow`
  - **Edit Password File**: Edit the `/etc/shadow` file, which stores encrypted user passwords and additional security information.

- `chage`
  - **Change Password Aging**: Modify password expiration and related information for a user.

- `chage admin`
  - **Modify Admin Password Expiration**: Specifically change password expiration settings for the `admin` user.

- `chage -d 0 admin`
  - **Force Password Change**: Force the `admin` user to change their password upon next login by setting the password last changed date to 0.

- `vim /etc/login.defs`
  - **Edit Login Definitions**: Modify the `/etc/login.defs` file to define site-wide security policies and login settings.



## Linux File-system Permissions

| Permission | Effect on files                      | Effect on directories                                                |
|------------|--------------------------------------|---------------------------------------------------------------------|
| r (read)   | File contents can be read.           | Contents of the directory (the file names) can be listed.           |
| w (write)  | File contents can be changed.        | Any file in the directory can be created or deleted.                |
| x (execute)| Files can be executed as commands.   | The directory can become the current working directory. You can run the `cd` command to it, but it also requires read permission to list files there. |


- **`ls -l`**  
  Displays detailed information about files and directories, including permissions, number of links, owner name, owner group, file size, and timestamp of the last modification.

- **Permission Types:**
  - `d` - is a directory
  - `-` - is a regular file
  - `l` - is a symbolic link.
  - `c` - is a character device file.
  - `b` - is a block device file.
  - `p` - is a named pipe file.
  - `s` - is a local socket file.

- **Permission Levels:**
  - `1` - User (Owner)
  - `2` - Group
  - `3` - Other

  In the 3-digit octal representation of permissions, each digit stands for one access level, from left to right: user, group, and other. To determine each digit:

- Start with 0.
- To add read permissions for this access level, add 4.
- To add write permissions, add 2.
- To add execute permissions, add 1.

The following diagram illustrates how systems interpret the 644 octal permission value.

### Binary Conversion
- **1 1 1**
  - 4 + 2 + 1 = 7

### User (u)
- **1 1 0** 
  - Read + Write = 6

### Group (g)
- **1 0 0**
  - Read = 4

### Other (o)
- **1 0 0**
  - Read = 4


- **`chown user:group filename`**  
  Changes the ownership of a file or directory.

- **`chmod`**  
  Changes the permissions of a file or directory.  
  - **Syntax:**
    - Symbolic: `chmod u+x filename`
    - Octal: `chmod 755 filename`

- **Special Permissions:**
  - `4` - `u+s` (Set User ID on execution)
  - `2` - `g+s` (Set Group ID on execution)
  - `1` - `o+t` (Sticky bit)

Effects of Special Permissions on Files and Directories
| Permission | Effect on files | Effect on directories |
|------------|-----------------|-----------------------|
| u+s (suid) | File executes as the user that owns the file, not as the user that ran the file. | No effect. |
| g+s (sgid) | File executes as the group that owns the file. | Files that are created in the directory have a group owner to match the group owner of the directory. |
| o+t (sticky) | No effect. | Users with write access to the directory can remove only files that they own; they cannot remove or force saves to files that other users own. |


- **`getfacl filename`**  
  Displays the Access Control List (ACL) of a file.

## Default File Permissions

- **`umask [numeric-value]`**  
  Sets default file permissions by masking specific bits. 

- **`umask`**  
  Displays the current `umask` value. Default `umask` values are located in `/etc/login.defs`.

## Process Management Commands

- **Process States:**
  - `Running` - Process is currently being executed.
  - `Sleeping` - Process is not currently being executed, waiting for a resource.
  - `Zombie` - Process has completed execution but still has an entry in the process table.

- **`man ps`**  
  Displays the manual for the `ps` command, which shows the status of processes.

- **`ps aux`**  
  Displays all processes currently running on the system.

- **`ps -ef`**  
  Displays a full-format listing of all processes.

- **`sleep 100 &`**  
  Puts the process into the background.

- **`jobs`**  
  Lists all jobs running in the background.

- **`fg %jobnumber`**  
  Brings a background job to the foreground.

- **`bg %jobnumber`**  
  Resumes a stopped job in the background.

- **`kill -l`**  
  Lists all possible signal names that can be sent to a process.

- **`kill process_id`**  
  Terminates the specified process. Best practice: terminate using `kill -9 process_id`.

- **`top`**  
  Displays ongoing processes and system resource usage, customizable with `c` and `f` options.

- **`killall process_name`**  
  Terminates all processes with the specified name.

- **`w`**  
  Displays the list of logged-in users and their activities.

- **`who`**  
  Shows who is logged in and their session details.

- **`top + K`**  
  Kill a process.

- **Key commands in `top`:**
  - `Shift + M` - Sort by memory usage.
  - `Shift + P` - Sort by CPU usage.
  - `Shift + R` - Reverse the sort order.
  - `Shift + B` - Switch off the use of bold.

## Service Management Commands

### **`systemctl`** Command Explained
**`systemctl`** is the primary tool for managing services and system states on systems that use the systemd init system, which is commonly found in modern Linux distributions such as Red Hat Enterprise Linux (RHEL), CentOS, Ubuntu, and others.

- **`systemctl list-units --type=service`**  
  Lists all active services.

- **`systemctl status service_name`**  
  Displays the status of the specified service (e.g., `sshd`, `crond`).

- **`systemctl is-active service_name`**  
  Checks if the service is active.

- **`systemctl is-enabled service_name`**  
  Checks if the service is enabled (i.e., will start on boot).

- **`systemctl stop service_name`**  
  Stops the specified service.

- **`systemctl start service_name`**  
  Starts the specified service.

- **`systemctl restart service_name`**  
  Restarts the specified service.

- **`systemctl reload service_name`**  
  Reloads the service without interrupting its operation.

- **`systemctl reload-or-restart service_name`**  
  Reloads the service if possible; otherwise, restarts it.

- **`systemctl enable service_name`**  
  Enables the service to start at boot.

- **`systemctl disable service_name`**  
  Disables the service from starting at boot.

- **`systemctl mask service_name`**  
  Prevents a service from being started, manually or automatically.

- **`systemctl unmask service_name`**  
  Reverses a masked service, allowing it to start.

- **`systemctl status service_name`**  
  Displays the current status of a service.

- **`systemctl is-enabled service_name`**  
  Checks if the service is set to start on boot.

### Use Cases
#### Service Management
The primary use of systemctl is to start, stop, and manage services on a Linux system.

#### System State Management 
You can also use systemctl to manage the overall state of the system, such as rebooting or shutting down the system:

- **Reboot**: `systemctl reboot`
- **Shutdown**: `systemctl poweroff`
#### Boot Target Management
`systemctl` can change the system's boot target (similar to runlevels in older systems):

- Switch to graphical target: `systemctl isolate graphical.target`
- Switch to multi-user (non-graphical) target: `systemctl isolate multi-user.target`


## SSH Commands

- **Create a new user**:  
  `sudo useradd sshuser`

- **Generate SSH keys**:  
  `ssh-keygen`

- **Copy SSH key to server**:  
  `ssh-copy-id serverb`

- **Edit SSH configuration**:  
  `vim /etc/ssh/sshd_config`

- **Start SSH agent**:  
  `eval $(ssh-agent)`

## Networking Commands

- **Show all IP addresses**:  
  `ip addr show`

- **Show IP address for a specific interface (e.g., eth0)**:  
  `ip addr show eth0`

- **Show link status for interfaces**:  
  `ip link show`

- **Show statistics**:  
  `ip -s`

- **View routing table**:  
  `ip route`

- **Trace route to a destination**:  
  `traceroute google.com`

- **Show socket statistics**:  
  `ss`

- **Show all TCP sockets**:  
  `ss -ta`

- **Show TCP sockets (outbound)**:  
  `ss -t`

- **Show UDP sockets**:  
  `ss -u`

- **Show listening sockets**:  
  `ss -l`

- **Show all sockets**:  
  `ss -a`

- **Show process information**:  
  `ss -p`

## Network Manager Commands

- **Show all connections**:  
  `nmcli con show`

- **Show all devices**:  
  `nmcli dev show`

- **Add a new connection**:  
  `nmcli con add con-name myconnection type ethernet ifname <interface_name> ipv4.addresses 192.168.1.1/24 ipv4.gateway 192.168.1.254/24`

- **Edit existing connection**:  
  `vim /etc/NetworkManager/system-connections/myconnection`

## DNS Configuration

- **Check DNS connectivity**:  
  `dig`

- **Edit hosts file**:  
  `vim /etc/hosts`

- **Edit DNS resolver configuration**:  
  `vim /etc/nsswitch.conf`

## Package Management Commands

- **Register system to Red Hat subscription**:  
  `subscription-manager register --auto-attach`

- **Show information about installed packages**:  
  `rpm -qa`

- **Show detailed information about a package**:  
  `dnf info <package_name>`

- **Install a package**:  
  `dnf install <package_name>`

- **Remove a package**:  
  `dnf remove <package_name>`

- **Update all packages**:  
  `dnf update`

- **List all installed packages**:  
  `dnf list installed`

- **Search for a package**:  
  `dnf search <package_name>`

- **Display group information**:  
  `dnf group info "<group_name>"`

- **Install a package group**:  
  `dnf group install "<group_name>"`

- **Undo a specific transaction**:  
  `dnf history undo <transaction_id>`

- **List all enabled repositories**:  
  `dnf repolist`

- **Edit YUM repository configuration**:  
  `vim /etc/yum.repos.d/`


## Mount and Unmount File Systems

- **List all block devices:**
  - `lsblk -f -p /dev/vdd`

- **Mount a device:**
  - `mount <source> <destination>`
  - `mount /dev/sdb1 /mnt/dir` - Example command to mount a device

- **View disk usage and mounted filesystems:**
  - `du -h /mnt/dir`
  - `df -h /mnt/dir`

- **Unmount a device:**
  - `umount /mnt/dir`

## Locate Files

- **Locate a file (case-sensitive):**
  - `locate <file>`

- **Locate a file (case-insensitive):**
  - `locate -i <file>`

- **Find a file (case-sensitive):**
  - `find / -name <file>`

- **Find a file (case-insensitive):**
  - `find / -iname <file>`

- **Find files based on user and criteria:**
  - `find /home/ -user student`
    - `-uid` - Specify user ID
    - `-gid` - Specify group ID
    - `-perm` - Specify permission
    - `-size` - Specify size
    - `-size +10M -size -40M` - Find files between 10MB and 40MB
    - `-mmin` - Specify file modification time
    - `-type` - Specify file type
      - `f` - Regular file
      - `d` - Directory

## Cockpit (Web-Based Administration Tool)

- **Start the Cockpit service:**
  - `systemctl start cockpit.socket`


## Usage

To use this cheatsheet, simply browse through the sections to find the commands and information relevant to your task. You can copy and paste commands directly into your terminal or adapt them to fit your specific needs. This document is designed to be a living resource, so feel free to bookmark it and refer back whenever you need a quick reference.
