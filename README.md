## Playwright_SwagLabs

Brief Playwright + Cucumber BDD test suite for the Swag Labs demo site.

---

## Prerequisites

- Node.js (v18+) and npm
- Git (optional)
- Recommended: Windows PowerShell (project tested on Windows)

Install project deps and Playwright browsers:
```powershell
cd D:\Automation\Palywright_SwagLabsFinal
npm install
npx playwright install

Environment
Create .env in repo root (example already present):

BASE_URL=https://www.saucedemo.com/
SWAG_USERNAME=standard_user
SWAG_PASSWORD=secret_sauce

The hooks load .env via dotenv.

Run Tests
Options:

1.Via project test runner (recommended)

npm test
# runs node [testRunner.js](http://_vscodecontentref_/0) -> executes:
# npx cucumber-js [checkOut.feature](http://_vscodecontentref_/1) --format html:cucumber-report.html --publish-quiet

2.Direct Cucumber command
npx cucumber-js [checkOut.feature](http://_vscodecontentref_/2) --format html:cucumber-report.html

After run, open the generated cucumber-report.html (project root).

Project Structure (important files)
features/
checkOut.feature
stepDefinations/CheckOutSteps.js
cucumber/cucumberTest.js (Before/After hooks)
pageobjectmanager/PageObjectManager.js
tests/
Pages/*.js (page object classes)
utils/UIActions.js (common UI helpers)
testRunner.js (calls cucumber-js and produces HTML report)
package.json (scripts & deps)
.env (environment variables)
cucumber-report.html (generated after test run)
failure-*.png (screenshots on failure)
Common Scripts (package.json)
npm test — run testRunner (recommended)
npm run cucumber — direct cucumber run (if defined)
npm run bddgen — if bddgen is used in this repo
Troubleshooting
MODULE_NOT_FOUND: verify require paths and file/folder casing (PowerShell Get-ChildItem).
Unexpected token export / ES module errors: convert ES exports to CommonJS (module.exports) or set "type": "module" in package.json and adapt requires/imports.
Cannot read properties of undefined (reading 'goToApplication'): ensure PageObjectManager is initialized in Before hook and assigned to this.HomePage.
X is not a constructor: inspect page module exports; PageObjectManager expects a constructor. Ensure page files export constructors (module.exports = ClassName).
Screenshots: failure screenshots saved as failure-<timestamp>.png in project root and attached to report.
Commands to inspect modules:

Notes & Recommendations
Keep all selectors inside page objects; steps should call page object methods.
Use this (Cucumber World) to share page and page objects across steps.
Run with headless: false in hooks while debugging to see browser actions.
Increase selector timeouts if the app is slow.
