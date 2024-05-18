package com.base.baseprojectbackend.service;

import com.base.baseprojectbackend.model.PredictionResponse;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PredictionResponseServiceImpl extends BaseService implements PredictionResponseService{
    @Override
    public List<PredictionResponse> getPredictionResponseByRequestId(Long requestId) {
        return this.em.createQuery("Select p from PredictionResponse p where p.predictionRequest.id = :requestId",PredictionResponse.class)
                .setParameter("requestId", requestId)
                .getResultStream()
                .toList();
    }
}
