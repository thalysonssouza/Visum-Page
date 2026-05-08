$path = "c:\Users\talis\OneDrive\Documentos\Visum Site Project"
$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server started on http://localhost:$port"
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ($localPath -eq "") { $localPath = "index.html" }
        $file = Join-Path $path $localPath
        if (Test-Path $file -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($file)
            $ext = [System.IO.Path]::GetExtension($file).ToLower()
            $mimeMap = @{
                ".html" = "text/html"; ".css" = "text/css"; ".js" = "application/javascript";
                ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg";
                ".svg" = "image/svg+xml"; ".woff2" = "font/woff2"; ".mp4" = "video/mp4"
            }
            if ($mimeMap.ContainsKey($ext)) { $response.ContentType = $mimeMap[$ext] }
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
