#### Identifying Hashes
`wget https://gitlab.com/kalilinux/packages/hash-identifier/-/raw/kali/master/hash-id.py`.

Launch it with `python3 hash-id.py`

#### Format-Specific Cracking
list all of John's formats using `john --list=formats`
john --list=formats | grep -iF "md5"

**Example Usage:**
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash_to_crack.txt

#### Unshadowing
unshadow path_to_passwd path_to_shadow
**Example Usage:**
unshadow local_passwd local_shadow > unshadowed.txt

john --wordlist=/usr/share/wordlists/rockyou.txt --format=sha512crypt unshadowed.txt

#### Single Crack Mode
john --single --format=raw-sha256 hashes.txt

example:
Jocker:7bf6d9bb82bed1302f331fc6b816aada

Custom Rules
[John the Ripper - wordlist rules syntax](https://www.openwall.com/john/doc/RULES.shtml)

#### Cracking a Password Protected Zip File
#### Zip2John
**Example Usage**
zip2john zipfile.zip > zip_hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt

#### Cracking a Password Protected RAR Archive
**Example Usage**
rar2john rarfile.rar > rar_hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt rar_hash.txt

#### Cracking SSH Key Passwords
**Example Usage**
ssh2john id_rsa > id_rsa_hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt id_rsa_hash.txt
