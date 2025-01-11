package com.base.baseprojectbackend.event;

import com.base.baseprojectbackend.model.PredictionRequest;
import com.base.baseprojectbackend.service.PredictionRequestsService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class PredictionRequestEventListener {

    private final PredictionRequestsService predictionRequestsService;

    public PredictionRequestEventListener(PredictionRequestsService predictionRequestsService) {
        this.predictionRequestsService = predictionRequestsService;
    }

    @EventListener
    public void handlePredictionRequestEvent(SavePredictionRequestEvent event) {
        PredictionRequest predictionRequest = event.getPredictionRequest();
        String response = predictionRequestsService.savePredictionRequest(predictionRequest);
        System.out.println("Prediction request processed: " + response);
    }
}