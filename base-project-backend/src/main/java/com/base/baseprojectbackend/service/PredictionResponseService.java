package com.base.baseprojectbackend.service;

import com.base.baseprojectbackend.model.PredictionResponse;

import java.util.List;

public interface PredictionResponseService {

    List<PredictionResponse> getPredictionResponseByRequestId(Long requestId);
}
