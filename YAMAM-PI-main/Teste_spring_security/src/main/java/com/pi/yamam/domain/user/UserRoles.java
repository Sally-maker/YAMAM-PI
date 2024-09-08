package com.pi.yamam.domain.user;

public enum UserRoles {
    ADMIN("admin"),
    STOCKIST("stockist");

    private String role;

    UserRoles(String role){
        this.role = role;
    }

    public String getRole(){
        return this.role;
    }
}
