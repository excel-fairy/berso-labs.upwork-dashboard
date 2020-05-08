function startAuthProcess() {
    UpworkOAuthService.startAuthProcess();
}

function resetAuthTokens() {
    UpworkOAuthService.resetToken();
}

function importReportsSinceLastImport() {
    Importer.importReportsSinceLastImport();
}

function importYearlyReports() {
    Importer.importYearlyReports();
}

function importAndReplaceReports() {
    Importer.importAndReplaceReports();
}

