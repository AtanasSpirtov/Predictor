package com.base.baseprojectbackend.model;

import com.base.baseprojectbackend.dto.PredictionRequestDTO;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.io.Serializable;

@Entity
@Table(name = "prediction_request")
public class PredictionRequest implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    // You may need to adjust the data type for excelFile
    // For simplicity, assuming it's a byte array

    @Column(nullable = false)
    private String telephone;

    @Column(nullable = false)
    private byte[] excelFile;

    @Column(nullable = false)
    private String principalUsername;


    public PredictionRequest(Long id, String name, String description, Status status, String telephone, byte[] excelFile, String principalUsername) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.excelFile = excelFile;
        this.principalUsername = principalUsername;
        this.telephone = telephone;
    }

    public PredictionRequest() {

    }

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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
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

    public String getPrincipalUsername() {
        return principalUsername;
    }

    public void setPrincipalUsername(String principalUsername) {
        this.principalUsername = principalUsername;
    }

    // Enum for status

    public PredictionRequestDTO toDTO () {
        return new PredictionRequestDTO(
                getId(),
                getName(),
                getDescription(),
                getStatus(),
                getTelephone(),
                getExcelFile()
        );
    }
    public enum Status {
        PENDING,
        APPROVED,
        DECLINED,
        DONE
    }
}
