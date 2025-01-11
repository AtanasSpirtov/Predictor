package com.base.baseprojectbackend.controller;

import com.base.baseprojectbackend.dto.PredictionResponseDTO;
import com.base.baseprojectbackend.service.PredictionRequestsService;
import com.base.baseprojectbackend.service.PredictionResponseService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(value = "responses")
@PreAuthorize(value = "hasRole('ROLE_USER')")
public class PredictionResponseController extends BaseControllerClass {
    public PredictionResponseController(PredictionRequestsService predictionRequestsService,
                                        PredictionResponseService predictionResponseService,
                                        ApplicationEventPublisher eventPublisher) {
        super(predictionRequestsService, predictionResponseService, eventPublisher);
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<List<PredictionResponseDTO>> getPredictionResponseByRequestId(@PathVariable("id") Long requestId) {
        logger.info(String.format("Listing prediction response for request with id %s", requestId));
        return ResponseEntity.ok(predictionResponseService.getPredictionResponseByRequestId(requestId)
                .stream()
                .map(predictionResponse -> new PredictionResponseDTO(
                                predictionResponse.getId(),
                                predictionResponse.getDate(),
                                predictionResponse.getPredictionRequest().toDTO(),
                                predictionResponse.getValue()
                        )
                )
                .toList()
        );
    }
}
