package com.zsassociates.utils;

import com.google.inject.AbstractModule;
import com.google.inject.TypeLiteral;
import com.zsassociates.aws.runtime.proxy.JWTRequestFilter;
import com.zsassociates.dataaccess.Dao.SalesRepDao;
import com.zsassociates.dataaccess.Dao.RepMonthDao;
import com.zsassociates.services.SalesRepDaoService;
import com.zsassociates.services.SalesRepService;
import com.zsassociates.services.RepMonthDaoService;
import com.zsassociates.services.RepMonthService;

public class InjectorModule extends AbstractModule {

    @Override
    protected void configure() {
        bind(JWTRequestFilter.IExclusionListRetriever.class).to(TutorialExclusionListRetriever.class);
        registerDao();
        registerServices();
    }

    private void registerDao() {
        bind(SalesRepDao.class);
        bind(SalesRepDao.SalesRepRowMapper.class);

        bind(RepMonthDao.class);
        bind(RepMonthDao.RepMonthRowMapper.class);
    }

    private void registerServices() {
        bind(new TypeLiteral<SalesRepDaoService>() {
        }).to(SalesRepService.class);
        bind(SalesRepService.class);

        bind(new TypeLiteral<RepMonthDaoService>() {}).to(RepMonthService.class);
        bind(RepMonthService.class);
    }
}
