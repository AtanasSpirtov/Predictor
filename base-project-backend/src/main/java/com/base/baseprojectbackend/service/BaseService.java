package com.base.baseprojectbackend.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class BaseService {

    @PersistenceContext
    protected EntityManager em;

    public EntityManager getEntityManager() {
        return this.em;
    }

}
