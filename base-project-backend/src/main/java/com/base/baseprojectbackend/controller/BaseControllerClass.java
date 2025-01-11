package com.base.baseprojectbackend.controller;

import com.base.baseprojectbackend.service.PredictionRequestsService;
import com.base.baseprojectbackend.service.PredictionResponseService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Controller;

import java.util.logging.Logger;

@Controller
public class BaseControllerClass {

    public Logger logger = Logger.getLogger("Controller logger");


    protected final PredictionRequestsService predictionRequestsService;

    protected final PredictionResponseService predictionResponseService;

    protected final ApplicationEventPublisher eventPublisher;

    public BaseControllerClass(PredictionRequestsService predictionRequestsService,
                               PredictionResponseService predictionResponseService,
                               ApplicationEventPublisher eventPublisher
    ) {
        this.predictionRequestsService = predictionRequestsService;
        this.predictionResponseService = predictionResponseService;
        this.eventPublisher = eventPublisher;
    }
}
