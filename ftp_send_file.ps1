param ($local)
$username = "customsh_ftp"
$pass = "szs0a108"
$password = $pass | ConvertTo-SecureString -asPlainText -Force
$credentials = New-Object System.Management.Automation.PSCredential($username, $password)
$PathToAdd = "/smarto.com.ua/o2"
Import-Module PSFTP 
Set-FTPConnection -Credentials $credentials -Server customsh.ftp.ukraine.com.ua -Session MyTestSession -UsePassive 
$Session = Get-FTPConnection -Session MyTestSession 
if (Add-FTPItem -Session $Session -Path  $PathToAdd -LocalPath $local)
{
    write-host $local file is succesfully added to $PathToAdd -back green;
}else {
    Write-Error 'NO'
}

