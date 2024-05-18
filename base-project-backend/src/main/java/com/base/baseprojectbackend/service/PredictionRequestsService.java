package com.base.baseprojectbackend.service;

import com.base.baseprojectbackend.model.PredictionRequest;

import java.util.List;

public interface PredictionRequestsService {

    List<PredictionRequest> getAllPredictionRequests();

    PredictionRequest getSinglePredictionRequestById(Long id);

    String savePredictionRequest(PredictionRequest predictionRequest);

    PredictionRequest editPredictionRequestById(PredictionRequest newPredictionRequest);

    String deletePredictionRequestById(Long id);

    String editStatus(Long id, String status);
}
