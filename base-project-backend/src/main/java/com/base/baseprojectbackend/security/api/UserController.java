package com.base.baseprojectbackend.security.api;

import com.base.baseprojectbackend.security.model.HttpResponse;
import com.base.baseprojectbackend.security.model.LoginModel;
import com.base.baseprojectbackend.security.model.LoginResponseModel;
import com.base.baseprojectbackend.security.model.RegisterModel;
import com.base.baseprojectbackend.security.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<HttpResponse> register(@RequestBody RegisterModel registerModel) {
        this.userService.register(registerModel);
        return new ResponseEntity<>(new HttpResponse(new Date(),
                HttpStatus.OK.value(),
                HttpStatus.OK,
                "success_register"),
                HttpStatus.OK);
    }

}
