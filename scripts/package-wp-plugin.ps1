$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$pluginSlug = "mach10-interactive-menu"
$distDir = Join-Path $repoRoot "dist\wp-menu"
$pluginDir = Join-Path $repoRoot "wordpress-plugin\$pluginSlug"
$assetsDir = Join-Path $pluginDir "assets"
$zipPath = Join-Path $repoRoot "$pluginSlug.zip"

Push-Location $repoRoot
try {
  & npm.cmd run build:wp-menu
  if ($LASTEXITCODE -ne 0) {
    throw "npm run build:wp-menu failed with exit code $LASTEXITCODE"
  }

  if (-not (Test-Path $distDir)) {
    throw "Missing build output: $distDir"
  }

  if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir | Out-Null
  }

  Get-ChildItem -LiteralPath $assetsDir -Force |
    Where-Object { $_.Name -ne ".gitkeep" } |
    Remove-Item -Recurse -Force

  Copy-Item -Path (Join-Path $distDir "*") -Destination $assetsDir -Recurse -Force

  if (Test-Path $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
  }

  Add-Type -AssemblyName System.IO.Compression
  Add-Type -AssemblyName System.IO.Compression.FileSystem

  $archive = [System.IO.Compression.ZipFile]::Open(
    $zipPath,
    [System.IO.Compression.ZipArchiveMode]::Create
  )

  try {
    Get-ChildItem -LiteralPath $pluginDir -Recurse -File |
      Where-Object { $_.Name -ne ".gitkeep" } |
      ForEach-Object {
        $relativePath = $_.FullName.Substring($pluginDir.Length).TrimStart("\", "/")
        $entryName = "$pluginSlug/$($relativePath -replace "\\", "/")"

        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
          $archive,
          $_.FullName,
          $entryName,
          [System.IO.Compression.CompressionLevel]::Optimal
        ) | Out-Null
      }
  }
  finally {
    $archive.Dispose()
  }

  $requiredEntries = @(
    "$pluginSlug/mach10-interactive-menu.php",
    "$pluginSlug/assets/mach10-menu.js",
    "$pluginSlug/assets/mach10-menu.css"
  )
  $zipEntries = [System.IO.Compression.ZipFile]::OpenRead($zipPath)

  try {
    $entryNames = $zipEntries.Entries | ForEach-Object { $_.FullName }

    foreach ($requiredEntry in $requiredEntries) {
      if ($entryNames -notcontains $requiredEntry) {
        throw "ZIP structure validation failed. Missing entry: $requiredEntry"
      }
    }
  }
  finally {
    $zipEntries.Dispose()
  }

  Write-Host "Created $zipPath"
}
finally {
  Pop-Location
}
