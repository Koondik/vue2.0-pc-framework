const commonConfig = {
    client_id:'lcsoft',
    client_secret:'123456',
    // $webroot: 'http://yc-pc:9002/',
    // tokenApi:'http://yc-pc:9001/',
    // imgApi:'http://yc-pc:8004/',
    // cloudHomepage:'http://192.168.0.106:85/cloud/#/',
    // userHomepage:'http://192.168.0.106:85/user/#/',
    // infoHomepage:'http://192.168.0.106:85/info/#/',
    // surveyHomepage:'http://192.168.0.106:85/survey/#',
    //演示地址
    $webroot: 'http://yun.szlcsoft.com:8090/eureka-zuul/',
    tokenApi:'http://yun.szlcsoft.com:8090/oauth-server/',
    imgApi:'http://yun.szlcsoft.com:8004/',
    cloudHomepage:'http://yun.szlcsoft.com:85/cloud/#/',
    userHomepage:'http://yun.szlcsoft.com:85/user/#/',
    infoHomepage:'http://yun.szlcsoft.com:85/info/#/',
    surveyHomepage:'http://yun.szlcsoft.com:85/survey/#',
    //数据端口
    cloudApi:'api-cloud/edu-cloud-api/',
    basisApi:'api-basis/edu-basis-api/',
    dictApi:'api-dict/edu-dict-api/',
    studentApi:'api-student/edu-student-api/',
    teacherApi:'api-teacher/edu-teacher-api/',
    courseApi:'api-course/edu-course-api/',
    userApi:'api-user/edu-user-api/',
    emailApi:'api-email/edu-email-api/',
    voteApi:'api-vote/edu-vote-api/',
    surveyApi:'api-survey/edu-survey-api/',
    smsApi:'api-sms/edu-sms-api/',
    infoApi:'api-info/edu-info-api/'
    // interfaceApi:'http://yun.szlcsoft.com:9002/'
};




export default commonConfig
