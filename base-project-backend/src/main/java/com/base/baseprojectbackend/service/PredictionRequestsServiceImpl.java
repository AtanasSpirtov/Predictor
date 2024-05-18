package com.base.baseprojectbackend.service;

import com.base.baseprojectbackend.model.PredictionRequest;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PredictionRequestsServiceImpl extends BaseService implements PredictionRequestsService{
    @Override
    public List<PredictionRequest> getAllPredictionRequests() {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream()
                .anyMatch(x -> x.getAuthority().equals("ROLE_ROOT"));
        return em.createQuery("SELECT DISTINCT pr FROM PredictionRequest pr  ORDER BY pr.name", PredictionRequest.class)
                .getResultStream()
                .filter(predictionRequest -> isAdmin || Objects.equals(predictionRequest.getPrincipalUsername(), username))
                .toList();
    }

    @Override
    public PredictionRequest getSinglePredictionRequestById(Long id) {
        return em.find(PredictionRequest.class, id);
    }

    @Override
    @Transactional
    public String savePredictionRequest(PredictionRequest predictionRequest) {
        em.persist(predictionRequest);
        return predictionRequest.getName();
    }

    @Override
    @Transactional
    public PredictionRequest editPredictionRequestById(PredictionRequest newPredictionRequest) {
        PredictionRequest predictionRequest = em.find(PredictionRequest.class, newPredictionRequest.getId());
        predictionRequest.setName(newPredictionRequest.getName());
        predictionRequest.setDescription(newPredictionRequest.getDescription());
        predictionRequest.setTelephone(newPredictionRequest.getTelephone());
        predictionRequest.setStatus(newPredictionRequest.getStatus());
        em.persist(predictionRequest);
        return predictionRequest;
    }

    @Override
    @Transactional
    public String deletePredictionRequestById(Long id) {
        PredictionRequest currentPredictionRequest = getSinglePredictionRequestById(id);
        em.remove(currentPredictionRequest);
        return currentPredictionRequest.getName();
    }

    @Override
    @Transactional
    public String editStatus(Long id, String status) {
        PredictionRequest predictionRequest = em.find(PredictionRequest.class, id);
        predictionRequest.setStatus(PredictionRequest.Status.valueOf(status));
        em.persist(predictionRequest);
        return predictionRequest.getName();
    }
}
