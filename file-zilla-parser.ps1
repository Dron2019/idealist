param($account,$path,$localPath,[Switch]$Overwrite = $false)
function succesMessage(){
    Write-Host 'added' -back green -ForegroundColor black
}

[xml]$cn = Get-Content -Path "C:\Users\Dron\AppData\Roaming\FileZilla\sitemanager.xml" 

# echo $cn.SelectSingleNode('//Name[@encoding=base64]').Value
$account = $cn.SelectSingleNode("//Name[text()='" + $account + "']").ParentNode
$login  = $account.Host
$user = $account.User
$pass = $account.Pass.InnerText
$encodedPass = [Text.Encoding]::ASCII.GetString([System.Convert]::FromBase64String($pass)) | ConvertTo-SecureString -asPlainText -Force


Import-Module PSFTP 
$credentials = New-Object System.Management.Automation.PSCredential($user, $encodedPass)

Set-FTPConnection -Credentials $credentials -Server $login -Session MyTestSession -UsePassive 
$Session = Get-FTPConnection -Session MyTestSession


# Get-ChildItem $localPath  | Add-FTPItem -Session $Session -Path $path


if (((Get-FTPChildItem -Path $path$localPath -Session $Session).FullName -match $localPath) -eq "True") {
    Write-Output $localPath' is exist' 
    $confirmation = Read-Host "Are you Sure You Want To rewrite:"
        if ($confirmation -eq 'y') {
            Get-ChildItem $localPath  | Add-FTPItem -Session $Session -Path $path
            succesMessage
        }else {
            echo 'script is stopping'
        }
}else {
    Get-ChildItem $localPath  | Add-FTPItem -Session $Session -Path $path
    succesMessage
}





# Get-FTPItem -Session $Session -Path $path$localPath
# send-FTPItem -Session $Session -Path $path -LocalPath $localPath -Verbose

#  | Get-FTPItem -Session $Session  -RecreateFolders -Verbose
# echo $cn.FileZilla3.Servers.Server.$account
# Get-Content -Path "C:\Users\Dron\AppData\Roaming\FileZilla\sitemanager.xml" | Where-Object { $_.Contains("yi347678.ftp.tools") }