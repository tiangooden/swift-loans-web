<#macro registrationLayout displayInfo=false displayWide=false displayMessage=false>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${msg("loginTitle", realm.displayName)}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" type="image/x-icon">
    <link href="${url.resourcesPath}/css/styles.css" rel="stylesheet">
  <head>
    <#-- Add font imports -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
      :root {
        --font-geist-sans: 'Inter', sans-serif;
      }
    </style>
</head>
<body>
    <div id="kc-container">
        <div id="kc-content">
            <div id="kc-content-wrapper">
                <#if displayMessage && message?has_content>
                    <div class="alert alert-${message.type}">
                        <div class="alert-text">${message.summary}</div>
                    </div>
                </#if>
                <#nested>
            </div>
        </div>
    </div>
    <script src="${url.resourcesPath}/js/script.js"></script>
</body>
</html>
</#macro>