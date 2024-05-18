package com.base.baseprojectbackend.security.filter;

import com.base.baseprojectbackend.security.model.LoginResponseModel;
import com.base.baseprojectbackend.security.util.JWTTokenProvider;
import com.base.baseprojectbackend.security.model.LoginModel;
import com.base.baseprojectbackend.security.user.Principal;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTTokenProvider jwtTokenProvider;

    private final ObjectMapper mapper = new ObjectMapper();
    public static final String JWT_TOKEN_HEADER = "Jwt-Token";

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, JWTTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request,
            HttpServletResponse response
    ) {

        LoginModel loginModel;
        try {
            loginModel = mapper.readValue(request.getInputStream(), LoginModel.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginModel.getUsername(),
                loginModel.getPassword()
        );
        return authenticationManager.authenticate(authenticationToken);

    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authentication
    ) throws IOException {
        Principal principal = (Principal) authentication.getPrincipal();
        String accessToken = jwtTokenProvider.generateJWTToken(principal);
        LoginResponseModel model = new LoginResponseModel(
            jwtTokenProvider.generateJWTToken(principal),
            principal.getUsername(),
            principal.getAuthorities().size() == 2
        );
        response.setHeader(JWT_TOKEN_HEADER, accessToken);
        mapper.writeValue(response.getOutputStream(), model);
    }
}
