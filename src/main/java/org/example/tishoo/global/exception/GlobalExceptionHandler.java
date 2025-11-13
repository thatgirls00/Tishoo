package org.example.tishoo.global.exception;

import org.example.tishoo.global.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ApiResponse<Void> handleBusinessException(BusinessException ex) {
        return ApiResponse.fail(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ApiResponse<Void> handleGenericException(Exception ex) {
        ex.printStackTrace();
        return ApiResponse.fail("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}