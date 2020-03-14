public with sharing class UserRecordAccessController {

    @AuraEnabled
    public static User getDefaultUser() {
        return [
            SELECT Id, Name FROM User WHERE Id =:System.UserInfo.getUserId()
        ];
    }

    @AuraEnabled
    public static User getUser(String userId) {
        return [
            SELECT Id, Name FROM User WHERE Id =:userId
        ];
    }

    @AuraEnabled
    public static List<User> getUsers(String userText) {
        //Edna Frank
        String searchquery='FIND :userText IN NAME FIELDS RETURNING User(Id, Name) LIMIT 10';
        List<SObject[]> sResult = Search.query (searchquery);
        List<User> userList = sResult[0];

        return userList;
    }

	@AuraEnabled
    public static UserRecordAccess getUserRecordAccess(String recordId, String userId) {
        if (String.isEmpty(userId)) {
            userId = System.UserInfo.getUserId();
        }
        UserRecordAccess a = [
            SELECT 
            	RecordId,
            	HasReadAccess,
            	HasEditAccess,
            	HasDeleteAccess,
            	HasTransferAccess,
            	HasAllAccess
            FROM UserRecordAccess
            WHERE 
            	UserId = :userId
                AND RecordId = :recordId
                             ];
        return a;
    }
}