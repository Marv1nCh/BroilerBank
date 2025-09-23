package com.nemo.broilerbackend.purchase;

import com.nemo.broilerbackend.readmodel.purchaseView.BroilerPurchaseView;
import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseViewRepository;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final PurchaseViewRepository purchaseViewRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository, UserRepository userRepository, PurchaseViewRepository purchaseViewRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
        this.purchaseViewRepository = purchaseViewRepository;

    }

    public Optional<BroilerPurchaseView> addNewPurchase(BroilerPurchaseView broilerPurchaseView) {
        Optional<User> userId = userRepository.findByFirstNameAndName(broilerPurchaseView.getFirstName(), broilerPurchaseView.getName());

        if (userId.isPresent()) {
            Purchase purchase = Purchase.builder()
                    .userId(userId.get().getId())
                    .date(broilerPurchaseView.getDate())
                    .paid(broilerPurchaseView.isPaid())
                    .broiler(broilerPurchaseView.getBroiler())
                    .fries(broilerPurchaseView.getFries())
                    .coleslaw(broilerPurchaseView.getColeslaw()
                    ).build();

            purchaseRepository.save(purchase);

            return purchaseViewRepository.findById(purchase.getId());
        }
        return Optional.empty();
    }
}
