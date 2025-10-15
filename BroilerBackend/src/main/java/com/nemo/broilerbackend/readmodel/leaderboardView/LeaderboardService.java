package com.nemo.broilerbackend.readmodel.leaderboardView;

import com.nemo.broilerbackend.dto.LeaderboardItemDTO;
import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseView;
import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

record NameKey(String givenName, String surname) {
}

@Component
public class LeaderboardService {
    private final LeaderboardRepository leaderboardRepository;

    private final PurchaseViewRepository purchaseViewRepository;

    @Autowired
    public LeaderboardService(LeaderboardRepository leaderboardRepository, PurchaseViewRepository purchaseViewRepository) {
        this.leaderboardRepository = leaderboardRepository;
        this.purchaseViewRepository = purchaseViewRepository;
    }

    public List<LeaderboardItemDTO> findAllLeaderboardItems() {
        return leaderboardRepository.findAll().stream().map(LeaderboardItemDTO::new).toList();
    }

    public List<LeaderboardItemDTO> findAllLeaderboardItemsBetween(LocalDate startDate, LocalDate endDate) {
        return purchaseViewRepository.findAll().stream()
                // Filter by date range
                .filter(pv -> {
                    LocalDate date = pv.getDate();
                    if (date.isAfter(startDate)) return date.isBefore(endDate);
                    return false;
                })
                // Group by complete name
                .collect(Collectors.groupingBy(pv -> new NameKey(pv.getGivenName(), pv.getSurname())))
                .entrySet().stream()
                // Map each group to a DTO
                .map(entry -> {
                    NameKey nameKey = entry.getKey();
                    List<PurchaseView> purchases = entry.getValue();

                    double totalPrice = purchases.stream()
                            .mapToDouble(PurchaseView::getPrice)
                            .sum();

                    return LeaderboardItemDTO.builder()
                            .givenName(nameKey.givenName())
                            .surname(nameKey.surname())
                            .completePrice(totalPrice)
                            .numberOfPurchases(purchases.size())
                            .build();
                })
                .toList();
    }
}
