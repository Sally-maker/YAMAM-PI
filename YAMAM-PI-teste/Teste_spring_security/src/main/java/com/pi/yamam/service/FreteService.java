package com.pi.yamam.service;

import org.springframework.stereotype.Service;

import com.pi.yamam.domain.product.FreteType;

@Service
public class FreteService {

    public double calculatingFrete(String type, int km) {
        double valuePerKM = 0.50;
        double priceFrete;
        if (type.equalsIgnoreCase("EXPRESS")) {
            priceFrete = FreteType.EXPRESS.calculatingFrete(valuePerKM, km);

        } else {
            priceFrete = FreteType.NORMAL.calculatingFrete(valuePerKM, km);
        }
        return priceFrete;

    }
}
