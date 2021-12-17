Push-Location (Join-Path -Path $PSScriptRoot -ChildPath "..")
If (Test-Path "./dist" -PathType Container) {
    Remove-Item "./dist" -Recurse
}
If (Test-Path "./build-temp" -PathType Container) {
    Remove-Item "./build-temp" -Recurse
}
If (!(Test-Path "./build-temp" -PathType Container)) {
    New-Item "./build-temp" -ItemType Directory | Out-Null
}
If (!(Test-Path "./build-temp/govuk" -PathType Container)) {
    New-Item "./build-temp/govuk" -ItemType Directory | Out-Null
}
If (!(Test-Path "./build-temp/govuk/template" -PathType Container)) {
    New-Item "./build-temp/govuk/template" -ItemType Directory | Out-Null
}
Copy-Item "./src/govuk/index.js" "./build-temp/govuk"
Copy-Item "./src/govuk/template/index.js" "./build-temp/govuk/template"
Copy-Item "./src/govuk/components" "./build-temp/govuk" -Filter "index.js" -Recurse
Copy-Item "./src/utils" "./build-temp" -Recurse

npx babel --config-file ./scripts/babel.config.json build-temp -d dist
If (Test-Path "./build-temp" -PathType Container) {
    Remove-Item "./build-temp" -Recurse
}

$PACKAGE_VERSION = node -p "require('./package.json').version"
Copy-Item "./scripts/package.json" "./dist"
(Get-Content "./dist/package.json") -Replace "PACKAGE_VERSION", $PACKAGE_VERSION | Set-Content "./dist/package.json"

Copy-Item "./CHANGELOG.md" "./dist"
Copy-Item "./README.md" "./dist"
Pop-Location