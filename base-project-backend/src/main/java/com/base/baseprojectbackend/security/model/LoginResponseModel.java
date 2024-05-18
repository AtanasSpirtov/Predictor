package com.base.baseprojectbackend.security.model;

public class LoginResponseModel {
    String accessToken;
    String username;

    Boolean isAdmin;

    public LoginResponseModel(String accessToken, String username, Boolean isAdmin) {
        this.accessToken = accessToken;
        this.username = username;
        this.isAdmin = isAdmin;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }
}
