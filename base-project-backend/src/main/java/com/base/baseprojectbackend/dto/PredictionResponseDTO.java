package com.base.baseprojectbackend.dto;

import com.base.baseprojectbackend.model.PredictionRequest;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PredictionResponseDTO {
    private Long id;

    private LocalDate date;

    private PredictionRequestDTO predictionRequest;

    private BigDecimal value;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public PredictionRequestDTO getPredictionRequest() {
        return predictionRequest;
    }

    public void setPredictionRequest(PredictionRequestDTO predictionRequest) {
        this.predictionRequest = predictionRequest;
    }
    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public PredictionResponseDTO(Long id, LocalDate date, PredictionRequestDTO predictionRequest, BigDecimal value) {
        this.id = id;
        this.date = date;
        this.predictionRequest = predictionRequest;
        this.value = value;
    }
}
