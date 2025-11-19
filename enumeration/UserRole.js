const UserRole = class USerRole {
    static getList () {
        return [
            UserRole.Admin,
            UserRole.User,
        ]
    }
}

UserRole.Admin = 1;
UserRole.User = 2;

module.exports = UserRole;