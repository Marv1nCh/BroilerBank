package com.nemo.broilerbackend.dto;

import com.nemo.broilerbackend.readmodel.leaderboardView.LeaderboardItem;
import lombok.*;
import org.hibernate.annotations.Immutable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Immutable
public class LeaderboardItemDTO {
    String givenName;
    String surname;
    int numberOfPurchases;
    double completePrice;

    public LeaderboardItemDTO(LeaderboardItem leaderboardItem) {
        this.givenName = leaderboardItem.getGivenName();
        this.surname = leaderboardItem.getSurname();
        this.numberOfPurchases = leaderboardItem.getNumberOfPurchases();
        this.completePrice = leaderboardItem.getCompletePrice();
    }
}
