### Grep'in the PowerShell way

```
kubectl get -n foobar | Select-String <pattern>
```

### Hide files

```PowerShell
# Add Hidden attribute
(get-item test.txt).Attributes += 'Hidden'

# Remove "Hidden" attribute
(get-item test.txt -force).Attributes -= 'Hidden'
```

### List installed PowerShell modules

```powershell
# Get PowerShell modules installed using PowerShellGet
Get-InstalledModule

# See all modules installed 
Get-Module -ListAvailable
```

### Base64 Encode String

```powershell
$input = "Foobar🤪"
$byteString = [System.Text.Encoding]::UTF8.GetBytes($input)
$base64String = [System.Convert]::ToBase64String($byteString)
```

### Base64 Decode String

```powershell
$input = "Rm9vYmFy8J+kqg=="
$byteString = [System.Convert]::FromBase64String($input)
$text = [System.Text.Encoding]::UTF8.GetString($byteString)
```