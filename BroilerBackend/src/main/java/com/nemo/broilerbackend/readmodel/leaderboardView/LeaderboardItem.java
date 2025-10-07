package com.nemo.broilerbackend.readmodel.leaderboardView;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.util.UUID;
@Getter
@Table(name="year_leaderboard")
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Immutable
public class LeaderboardItem {
    @Id
    UUID userId;
    String givenName;
    String surname;
    int numberOfPurchases;
    double completePrice;
}
