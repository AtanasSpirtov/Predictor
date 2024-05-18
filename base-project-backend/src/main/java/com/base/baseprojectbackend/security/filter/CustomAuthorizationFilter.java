package com.base.baseprojectbackend.security.filter;

import com.base.baseprojectbackend.security.model.HttpResponse;
import com.base.baseprojectbackend.security.util.JWTTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class CustomAuthorizationFilter extends OncePerRequestFilter {

    private static final String OPTIONS_HTTP_METHOD = "OPTIONS";
    private static final String TOKEN_PREFIX = "Bearer ";
    private static final ObjectMapper mapper = new ObjectMapper();

    private final JWTTokenProvider jwtTokenProvider;

    @Autowired
    public CustomAuthorizationFilter(JWTTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getMethod().equalsIgnoreCase(OPTIONS_HTTP_METHOD)) {
            response.setStatus(OK.value());
        } else {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if (
                    authorizationHeader == null ||
                    !authorizationHeader.startsWith(TOKEN_PREFIX) ||
                    request.getServletPath().equals("/api/login") ||
                    request.getServletPath().equals("/api/register")
            ) {
                filterChain.doFilter(request, response);
                return;
            }
            try {
                String token = authorizationHeader.substring(TOKEN_PREFIX.length());
                String username = jwtTokenProvider.getSubject(token);
                if (jwtTokenProvider.isTokenValid(token)
                        && SecurityContextHolder.getContext().getAuthentication() == null) {
                    List<GrantedAuthority> authorities = jwtTokenProvider.getAuthority(token);
                    Authentication authentication = jwtTokenProvider.getAuthentication(username, authorities, request);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    SecurityContextHolder.clearContext();
                }

            } catch (Exception e) {
                SecurityContextHolder.clearContext();
                HttpResponse httpResponse = new HttpResponse(
                        new Date(),
                        UNAUTHORIZED.value(),
                        UNAUTHORIZED,
                        "Expired Access Token");

                response.setContentType(APPLICATION_JSON_VALUE);
                response.setStatus(UNAUTHORIZED.value());

                mapper.writeValue(response.getOutputStream(), httpResponse);
            }

            filterChain.doFilter(request, response);
        }
    }
}
