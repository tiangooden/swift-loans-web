<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo displayWide=(realm.password && social.providers??)>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <img src="${url.resourcesPath}/img/favicon.ico" alt="Swift Loans" class="login-logo">
                <h1>Swift Loans</h1>
                <p>Welcome back</p>
            </div>
            
            <form id="kc-form-login" action="${url.loginAction}" method="post">
                <div class="form-group">
                    <label for="username" class="form-label">Email or Username</label>
                    <input id="username" class="form-input" name="username" value="${(login.username!'')}" type="text" autofocus>
                </div>
                
                <div class="form-group">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" class="form-input" name="password" type="password">
                </div>
                
                <#if realm.rememberMe>
                    <div class="checkbox">
                        <label>
                            <input id="rememberMe" name="rememberMe" type="checkbox"> Remember me
                        </label>
                    </div>
                </#if>
                
                <div class="form-buttons">
                    <input class="btn btn-primary" name="login" type="submit" value="Sign In">
                </div>
                
                <#if realm.resetPasswordAllowed>
                    <div class="form-footer">
                        <a href="${url.loginResetCredentialsUrl}">Forgot password?</a>
                    </div>
                </#if>
            </form>
        </div>
    </div>
</@layout.registrationLayout>