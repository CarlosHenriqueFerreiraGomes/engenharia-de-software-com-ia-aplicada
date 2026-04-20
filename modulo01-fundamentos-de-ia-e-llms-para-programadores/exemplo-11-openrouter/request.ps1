# Load environment variables from .env file
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $key = $matches[1]
            $value = $matches[2]
            Set-Variable -Name $key -Value $value -Scope Script
        }
    }
} else {
    Write-Host "Error: .env file not found"
    exit 1
}

$API_URL = "https://openrouter.ai/api/v1/chat/completions"
$OPENROUTER_SITE_URL = "http://localhost:3000"
$OPENROUTER_SITE_NAME = "My Example"
$NLP_MODEL = "google/gemma-3-27b-it:free"

$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $OPENROUTER_API_KEY"
    "HTTP-Referer" = $OPENROUTER_SITE_URL
    "X-Title" = $OPENROUTER_SITE_NAME
}

$body = @{
    "model" = $NLP_MODEL
    "messages" = @(
        @{
            "role" = "user"
            "content" = "Me conte uma curiosidade sobre LLMs"
        }
    )
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri $API_URL -Method Post -Headers $headers -Body $body
    Write-Host ($response | ConvertTo-Json -Depth 10)
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}