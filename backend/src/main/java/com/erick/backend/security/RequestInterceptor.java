package com.erick.backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * Interceptor for handling HTTP requests in the application.
 * This interceptor allows for pre-processing and post-processing of requests.
 */
@Component
@Log4j2
public class RequestInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull Object handler
    ) {
        return true;
    }

    @Override
    public void postHandle(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull Object handler,
        @Nullable ModelAndView modelAndView
    ) {}

    @Override
    public void afterCompletion(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull Object handler,
        @Nullable Exception exception
    ) {}
}
