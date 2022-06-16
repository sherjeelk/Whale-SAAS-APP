export class AppConstants {
  public  static SCHEDULER_BASE_URL = 'https://api.litcode.io';
  public  static COMPANY_KEY = 'whale';
  public static BASE_URL = 'https://api.ideatechnologies.io';
  public static API = {
    LOGIN: AppConstants.BASE_URL + '/auth',
    VERIFY_DOMAIN: AppConstants.BASE_URL + '/sites/verifyDomain',
    DEPLOY_SITE: AppConstants.BASE_URL + '/sites/deploy',
    CHECK_DOMAIN: AppConstants.BASE_URL + '/sites/checkVerification/',
    SERVICES: AppConstants.BASE_URL + '/services',
    SITE_SERVICES: AppConstants.BASE_URL + '/services/site',
    PRODUCT: AppConstants.BASE_URL + '/products',
    SITE_PRODUCT: AppConstants.BASE_URL + '/products/site',
    SIGNUP: AppConstants.BASE_URL + '//auth/local',
    CREATE_SITE: AppConstants.BASE_URL + '/sites',
    MY_SITE: AppConstants.BASE_URL + '/sites/my',
    UPLOAD: AppConstants.BASE_URL + '/files',
    CREATE_APP:AppConstants.BASE_URL+'/apps',
    USERS:AppConstants.BASE_URL+'/users',
    SLOTS: AppConstants.SCHEDULER_BASE_URL + '/slots/all/',
    PATCH_SITE: AppConstants.BASE_URL + '/sites'

  }
}
