@IsTest
private class UserRecordAccessController_Test {

    @testSetup static void setup() {
        List<Profile> pf= [Select Id, Name from profile where Name in ('システム管理者', 'System Administrator')]; 
        String orgId=UserInfo.getOrganizationId(); 
        String dateString=String.valueof(Datetime.now()).replace(' ','').replace(':','').replace('-','') ;
        Integer RandomId=Integer.valueOf(Math.rint(Math.random()*1000000)); 
        String uniqueName=orgId+dateString+RandomId; 
        User testUser = new User(firstname = 'testfirstname', 
                         lastName = 'testlastname', 
                         email = uniqueName + '@test' + orgId + '.org', 
                         Username = uniqueName + '@test' + orgId + '.org', 
                         EmailEncodingKey = 'ISO-8859-1', 
                         Alias = uniqueName.substring(18, 23), 
                         TimeZoneSidKey = 'America/Los_Angeles', 
                         LocaleSidKey = 'en_US', 
                         LanguageLocaleKey = 'en_US', 
                         ProfileId = pf[0].Id
                        ); 
        insert testUser;
    }

    @IsTest
    private static void getDefaultUser() {
        User testUser = [Select Id, Name, lastName, firstName From User Limit 1];
        User u = UserRecordAccessController.getDefaultUser();
        System.AssertEquals(System.UserInfo.getUserId(), u.Id);
    }

    @IsTest
    private static void getUser() {
        User testUser = [Select Id, Name, lastName, firstName From User Limit 1];
        User u = UserRecordAccessController.getUser(testUser.Id);
        System.AssertEquals(testUser.Id, u.Id);
    }

    @IsTest
    private static void getUsers() {
        User testUser = [Select Id, Name, lastName, firstName From User Limit 1];
        List<User> uList = UserRecordAccessController.getUsers(testUser.lastName);
        Boolean isNotInclude = false;
        for (User u : uList) {
            if (0 > u.Name.indexOf(testUser.lastName)) {
                isNotInclude = true;
            }
        }
        System.AssertEquals(false, isNotInclude);
    }

    @IsTest
    private static void getUserRecordAccess() {
        User testUser = [Select Id, Name, lastName, firstName From User Limit 1];
        UserRecordAccess ua = UserRecordAccessController.getUserRecordAccess(testUser.Id, null);
    }

}