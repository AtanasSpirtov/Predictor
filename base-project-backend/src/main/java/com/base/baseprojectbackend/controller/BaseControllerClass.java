package com.base.baseprojectbackend.controller;

import com.base.baseprojectbackend.service.PredictionRequestsService;
import com.base.baseprojectbackend.service.PredictionResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.logging.Logger;

@Controller
public class BaseControllerClass {

    public Logger logger = Logger.getLogger("Controller logger");


    final
    PredictionRequestsService predictionRequestsService;

    final
    PredictionResponseService predictionResponseService;
    public BaseControllerClass(PredictionRequestsService predictionRequestsService, PredictionResponseService predictionResponseService) {
        this.predictionRequestsService = predictionRequestsService;
        this.predictionResponseService = predictionResponseService;
    }
}
