// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import iconPngUrl from './assets/icon.png'

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass")
    });

    useState(()=> { document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName); });

    if (!isReady) {
        return null;
    }

    return (
      <div className="auth">
          <div>
              <div className="video h-screen">
                  <video loop playsInline autoPlay>
                      <source src="https://d2vkoy1na2a6o6.cloudfront.net/videos/fsg-bg-wide-1d7a662b187e51758a166d75380b8e7bcb62ce97ddfd50f0eb0aefef32b27f478fbe293ea6cfff31f8b5e6b1ed2b5fbe1c0e0ca48bbf0408ddf6d4bc0172073b.mp4" type="video/mp4" />
                  </video>
              </div>
              <div id="kc-body">
                  <div id="kc-header">
                      <div
                        id="kc-header-wrapper"
                        style={{ "fontFamily": '"Work Sans"' }}
                      >
                          <div id="logo--container">
                              <img src={iconPngUrl} alt="Keycloakify logo" id="logo" width={120} />
                          </div>
                      </div>
                  </div>
                  <div id="form">
                      <div className="border-box" />
                      <div id="box" className={""}>
                          <header className={getClassName("kcFormHeaderClass")}>
                              {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
                                <div id="kc-locale">
                                    <div id="kc-locale-wrapper" className={getClassName("kcLocaleWrapperClass")}>
                                        <div className="kc-dropdown" id="kc-locale-dropdown">
                                            <a href="#" id="kc-current-locale-link">
                                                {labelBySupportedLanguageTag[currentLanguageTag]}
                                            </a>
                                            <ul>
                                                {locale.supported.map(({ languageTag }) => (
                                                  <li key={languageTag} className="kc-dropdown-item">
                                                      <a href="#" onClick={() => changeLocale(languageTag)}>
                                                          {labelBySupportedLanguageTag[languageTag]}
                                                      </a>
                                                  </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                              )}
                              {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                displayRequiredFields ? (
                                  <div className={getClassName("kcContentWrapperClass")}>
                                      <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                    <span className="subtitle">
                                        <span className="required">*</span>
                                        {msg("requiredFields")}
                                    </span>
                                      </div>
                                      <div className="col-md-10">
                                          <h1 id="kc-page-title">{headerNode}</h1>
                                      </div>
                                  </div>
                                ) : (
                                  <h1 id="kc-page-title">{headerNode}</h1>
                                )
                              ) : displayRequiredFields ? (
                                <div className={getClassName("kcContentWrapperClass")}>
                                    <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">*</span> {msg("requiredFields")}
                                </span>
                                    </div>
                                    <div className="col-md-10">
                                        {showUsernameNode}
                                        <div className={getClassName("kcFormGroupClass")}>
                                            <div id="kc-username">
                                                <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                                <a id="reset-login" href={url.loginRestartFlowUrl}>
                                                    <div className="kc-login-tooltip">
                                                        <i className={getClassName("kcResetFlowIcon")}></i>
                                                        <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              ) : (
                                <>
                                    {showUsernameNode}
                                    <div className={getClassName("kcFormGroupClass")}>
                                        <div id="kc-username">
                                            <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                            <a id="reset-login" href={url.loginRestartFlowUrl}>
                                                <div className="kc-login-tooltip">
                                                    <i className={getClassName("kcResetFlowIcon")}></i>
                                                    <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </>
                              )}
                          </header>
                          <div id="kc-content">
                              <div id="kc-content-wrapper">
                                  {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                                  {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                    <div className={clsx("alert", `alert-${message.type}`)}>
                                        {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                        {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                        {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                        {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                        <span
                                          className="kc-feedback-text"
                                          dangerouslySetInnerHTML={{
                                              "__html": message.summary
                                          }}
                                        />
                                    </div>
                                  )}
                                  {children}
                                  {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                                    <form
                                      id="kc-select-try-another-way-form"
                                      action={url.loginAction}
                                      method="post"
                                      className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                                    >
                                        <div
                                          className={clsx(
                                            displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                          )}
                                        >
                                            <div className={getClassName("kcFormGroupClass")}>
                                                <input type="hidden" name="tryAnotherWay" value="on" />
                                                <a
                                                  href="#"
                                                  id="try-another-way"
                                                  onClick={() => {
                                                      document.forms["kc-select-try-another-way-form" as never].submit();
                                                      return false;
                                                  }}
                                                >
                                                    {msg("doTryAnotherWay")}
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                  )}
                                  {displayInfo && (
                                    <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                        <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                            {infoNode}
                                        </div>
                                    </div>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>

              </div>



          </div>
      </div>

    );
}
