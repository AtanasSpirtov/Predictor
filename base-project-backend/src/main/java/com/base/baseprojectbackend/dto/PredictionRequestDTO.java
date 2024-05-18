package com.base.baseprojectbackend.dto;

import com.base.baseprojectbackend.model.PredictionRequest;

public class PredictionRequestDTO {

    private Long id;
    private String name;
    private String description;
    private PredictionRequest.Status status;

    private String telephone;
    private byte[] excelFile;

    // Constructors

    public PredictionRequestDTO() {
    }

    public PredictionRequestDTO(Long id, String name, String description, PredictionRequest.Status status, String telephone, byte[] excelFile) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.excelFile = excelFile;
        this.telephone = telephone;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public PredictionRequest.Status getStatus() {
        return status;
    }

    public void setStatus(PredictionRequest.Status status) {
        this.status = status;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public byte[] getExcelFile() {
        return excelFile;
    }

    public void setExcelFile(byte[] excelFile) {
        this.excelFile = excelFile;
    }
}
