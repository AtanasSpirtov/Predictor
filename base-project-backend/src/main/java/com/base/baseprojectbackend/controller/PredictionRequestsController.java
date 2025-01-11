package com.base.baseprojectbackend.controller;

import com.base.baseprojectbackend.dto.PredictionRequestDTO;
import com.base.baseprojectbackend.event.SavePredictionRequestEvent;
import com.base.baseprojectbackend.model.PredictionRequest;
import com.base.baseprojectbackend.service.PredictionRequestsService;
import com.base.baseprojectbackend.service.PredictionResponseService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "requests")
@PreAuthorize(value = "hasRole('ROLE_USER')")
public class PredictionRequestsController extends BaseControllerClass {

    public PredictionRequestsController(PredictionRequestsService predictionRequestsService,
                                        PredictionResponseService predictionResponseService,
                                        ApplicationEventPublisher eventPublisher
                                        ) {
        super(predictionRequestsService, predictionResponseService, eventPublisher);
    }

    @GetMapping("/list")
    public ResponseEntity<List<PredictionRequestDTO>> listBusinesses() {
        return ResponseEntity.ok(predictionRequestsService.getAllPredictionRequests()
                .stream()
                .map(PredictionRequest::toDTO)
                .toList());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PredictionRequestDTO> getPredictionRequestById(@PathVariable("id") Long id) {
        logger.info(String.format("Getting business with id %s", id));
        return ResponseEntity.ok(predictionRequestsService.getSinglePredictionRequestById(id).toDTO());
    }

    @PostMapping("/edit")
    public ResponseEntity<PredictionRequestDTO> editPredictionRequest(@RequestBody PredictionRequestDTO predictionRequest) {
        logger.info(String.format("Editing business with id %d with name %s with decription %s with status %s",
                predictionRequest.getId(),
                predictionRequest.getName(),
                predictionRequest.getDescription(),
                predictionRequest.getStatus()
        ));
        String principalUsername = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return ResponseEntity.ok(
                predictionRequestsService.editPredictionRequestById(
                        new PredictionRequest(
                                predictionRequest.getId(),
                                predictionRequest.getName(),
                                predictionRequest.getDescription(),
                                predictionRequest.getStatus(),
                                predictionRequest.getTelephone(),
                                new byte[0],
                                principalUsername
                        )
                ).toDTO()
        );
    }

    @PutMapping("/save")
    public ResponseEntity<Message> savePredictionRequest(@RequestBody PredictionRequestDTO predictionRequest) {
        logger.info(String.format("Saving business with id %d with name %s with decription %s with status %s",
                predictionRequest.getId(),
                predictionRequest.getName(),
                predictionRequest.getDescription(),
                predictionRequest.getStatus()
        ));
        String principalUsername = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        PredictionRequest predictionRequestDb =  new PredictionRequest(
                predictionRequest.getId(),
                predictionRequest.getName(),
                predictionRequest.getDescription(),
                predictionRequest.getStatus(),
                predictionRequest.getTelephone(),
                predictionRequest.getExcelFile(),
                principalUsername
        );
        eventPublisher.publishEvent(new SavePredictionRequestEvent(this, predictionRequestDb));
        String savePredictionResponse = predictionRequestsService.savePredictionRequest(predictionRequestDb);
        return ResponseEntity.ok(new Message(savePredictionResponse));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deletePredictionRequest(@PathVariable("id") Long id) {
        logger.info(String.format("Deleting business with id %d ", id));
        return ResponseEntity.ok(Collections.singletonMap("message", predictionRequestsService.deletePredictionRequestById(id)));
    }

    @PostMapping("/edit/status/{id}")
    @PreAuthorize(value = "hasRole('ROLE_ROOT')")
    public ResponseEntity<Map<String, String>> editStatus(@PathVariable("id") Long id, @RequestBody String status) {
        return ResponseEntity.ok(Collections.singletonMap("message", predictionRequestsService.editStatus(id, status)));
    }
}
