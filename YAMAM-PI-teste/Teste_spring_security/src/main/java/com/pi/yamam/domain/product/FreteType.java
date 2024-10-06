package com.pi.yamam.domain.product;

public enum FreteType {
   
    NORMAL{
        @Override
        public Double calculatingFrete(double valuePerKM, int km) {
            double price = valuePerKM * km;
            return price;
        }
    },
    EXPRESS{
        @Override
        public Double calculatingFrete(double valuePerKM, int km) {
            double price = valuePerKM * km;
            return price *= 1.2;
        }
    };
    public abstract Double calculatingFrete(double valuePerKM, int km);
}
