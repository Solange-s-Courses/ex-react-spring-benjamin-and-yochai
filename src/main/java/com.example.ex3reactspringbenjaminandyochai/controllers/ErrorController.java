package com.example.ex3reactspringbenjaminandyochai.controllers;
import com.example.ex3reactspringbenjaminandyochai.model.ErrorResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

/**
 * Global exception handler for the application that provides centralized error handling.
 * This controller advice intercepts exceptions thrown across the application and
 * converts them into appropriate HTTP responses with meaningful error messages.
 */
@ControllerAdvice
public class ErrorController {
    /**
     * Handles type mismatch exceptions that occur when method arguments cannot be converted
     * to the required type.
     *
     * @param ex The MethodArgumentTypeMismatchException that was thrown
     * @return ResponseEntity containing a string with the error message and BAD_REQUEST status
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }

    /**
     * Handles ResponseStatusException exceptions that occur when a resource is not found or
     * when an operation fails due to a specific status code.
     *
     * @param ex The ResponseStatusException that was thrown
     * @return ResponseEntity containing an ErrorResponse object with the status code and message
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatusException(ResponseStatusException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                ex.getStatusCode().value(),
                ex.getReason()
        );
        return new ResponseEntity<>(errorResponse, ex.getStatusCode());
    }

    /**
     * Handles all uncaught exceptions that occur in the application.
     *
     * @param ex The Exception that was thrown
     * @return ResponseEntity containing an ErrorResponse object with the status code and message
     */ 
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAllUncaughtExceptions(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                500,
                ex.getMessage()
        );
        return ResponseEntity.internalServerError().body(errorResponse);
    }
}
