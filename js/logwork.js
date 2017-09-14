$(document).ready(function() {
    var opt = { dateFormat: 'dd/M/yy' };
    input('startDate').datepicker(opt);
    input('endDate').datepicker(opt);

    var today = formatDate();
    input('startDate').val(today);
    input('endDate').val(today);

    var user = localStorage.getItem('logwork-user');
    input('targetUser').val(user);
});

function input(id) {
    return $('#' + id);
}

function formatDate(date) {
    date = date || moment();
    return date.format("DD/MMM/YYYY");
}

function dateRange() {
    var startDate = input('startDate').val();
    var endDate = input('endDate').val();

    request(startDate, endDate);
}

function today() {
    request(formatDate());
}

function yesterday() {
    request(formatDate(moment().add(-1, 'days')));
}

function week() {
    var startDate = input('startDate').val();
    var endDate = input('endDate').val();

    request(startDate, endDate);
}

function request(startDate, endDate) {
    localStorage.setItem('logwork-user', input('targetUser').val());

    // Displays HTML report.
    var url = 'https://jira.elsevier.com/secure/ConfigureReport.jspa?targetGroup=&excludeTargetGroup=&projectRoleId=&projectid=13200&filterid=&priority=&sum=&groupByField=&moreFields=&selectedProjectId=13200&reportKey=jira-timesheet-plugin:report&Next=Next';

    // Generates Excel report.
    // var url = 'https://jira.elsevier.com/secure/ConfigureReport!excelView.jspa?endDate=&targetGroup=&excludeTargetGroup=&projectRoleId=&projectid=13200&filterid=&priority=&sum=&groupByField=&moreFields=&selectedProjectId=13200&reportKey=jira-timesheet-plugin:report&atl_token=A76R-9E6E-8SPH-5831|c2ad87b5daf46fce632374a6dd26da9c08dec7f0|lin&Next=Next';

    url += '&targetUser=' + input('targetUser').val();
    url += '&startDate=' + startDate;

    if (!endDate) {
        endDate = startDate;
    }

    url += '&endDate=' + endDate;

    window.location = url;
}
