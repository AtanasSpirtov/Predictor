package com.base.baseprojectbackend.event;

import com.base.baseprojectbackend.model.PredictionRequest;
import org.springframework.context.ApplicationEvent;

public class SavePredictionRequestEvent extends ApplicationEvent {
    private final PredictionRequest predictionRequest;

    public SavePredictionRequestEvent(Object source, PredictionRequest predictionRequest) {
        super(source);
        this.predictionRequest = predictionRequest;
    }

    public PredictionRequest getPredictionRequest() {
        return predictionRequest;
    }

}
