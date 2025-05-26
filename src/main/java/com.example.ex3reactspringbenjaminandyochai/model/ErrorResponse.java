package com.example.ex3reactspringbenjaminandyochai.model;

/**
 * Represents an error response in the application.
 * Contains a status code and a message.
 */ 
public class ErrorResponse {
    private int status;
    private String message;

    /**
     * Constructs an ErrorResponse with the given status code and message.
     *
     * @param status The status code
     * @param message The error message
     */ 
    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    /**
     * Retrieves the status code of the error response.
     *
     * @return The status code
     */  
    public int getStatus() {
        return status;
    }

    /**
     * Sets the status code of the error response.
     *
     * @param status The status code to set
     */  
    public void setStatus(int status) {
        this.status = status;
    }

    /**
     * Retrieves the error message of the error response.
     *
     * @return The error message
     */  
    public String getMessage() {
        return message;
    }

    /**
     * Sets the error message of the error response.
     *
     * @param message The error message to set
     */   
    public void setMessage(String message) {
        this.message = message;
    }
}