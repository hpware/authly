# Constants
$SERVER_URL = "http://localhost:3000"  # Replace with your actual server URL

# Function to generate a random string
function Generate-RandomString {
    param (
        [Parameter(Mandatory=$true)]
        [int] $Length
    )

    $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    $result = ""
    $random = New-Object System.Random

    for ($i = 0; $i -lt $Length; $i++) {
        $position = $random.Next(0, $chars.Length)
        $result += $chars[$position]
    }

    return $result
}

# Parse command line arguments
param(
    [string]$client = "100"
)

# Convert client parameter from --client=value format if necessary
if ($client -like "--client=*") {
    $client = $client.Split("=")[1]
}

# Set up file paths
$filePath = Join-Path $env:USERPROFILE ".authly\computerId"
$dirPath = Split-Path $filePath -Parent

# Create directory if it doesn't exist
if (-not (Test-Path $dirPath)) {
    New-Item -ItemType Directory -Path $dirPath -Force | Out-Null
}

# Function to get or create computer ID
function Get-ComputerId {
    try {
        if (Test-Path $filePath) {
            return Get-Content $filePath -Raw
        }
        else {
            Write-Host "File does not exist! Generating a new one!"
            $randomString = Generate-RandomString -Length 40
            Set-Content -Path $filePath -Value $randomString
            return $randomString
        }
    }
    catch {
        Write-Error $_.Exception.Message
        exit 1
    }
}

# Function to publish ID
function Publish-Id {
    try {
        $computerId = Get-ComputerId
        $body = @{
            computer = $computerId
            clientID = $client
        } | ConvertTo-Json

        $response = Invoke-RestMethod -Uri "$SERVER_URL/api/yourcompoter" `
            -Method Post `
            -ContentType "application/json" `
            -Body $body

        Write-Output $response
    }
    catch {
        Write-Error $_.Exception.Message
        exit 1
    }
}

# Run the main function
Publish-Id
